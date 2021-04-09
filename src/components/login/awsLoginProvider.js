import React, { Component } from "react";
import PropTypes from "prop-types";

import Auth from "../../contexts/auth";
import { getConfig } from "./api";
import { cognitoLogin, cognitoLogout, cognitoCheckIsAuthenticated, cognitoCompletePassword, cognitoRefreshAccessToken } from "../../services/cognitoService";


class AWSLoginProvider extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isAuthenticated: false,         // true if user is authenticated
            isNewPasswordRequired: false,   // true if user logs in for the first time with his temp password and has to set a new one
            isLoading: false,               // true if user is in process of logging in
            userData: {},                   // contains user information such as user privileges and customerId
            appConfig: {},                  // contains app config data (such as gmaps API-Key)
            userAttributes: {},             // user attributes retrieved from cognito necessary for the completePassword workflow
            loginError: {}
        }
        this.isAuthenticated = this.isAuthenticated.bind(this);
        this.login = this.login.bind(this);
        this.logout = this.logout.bind(this);
        this.completePassword = this.completePassword.bind(this);
        this.setCustomerName = this.setCustomerName.bind(this);
        this.refreshSession = this.refreshSession.bind(this);
        this.processSuccessfulAuth = this.processSuccessfulAuth.bind(this);
    }

    componentDidUpdate() {
        cognitoCheckIsAuthenticated().then(result => (
            this.processSuccessfulAuth(result)
        )).catch(() => {
            this.setState({
                userData: {},
                isAuthenticated: false
            });
        })
    }

    isAuthenticated() {
        return this.state.isAuthenticated;
    }

    login(credentials) {
        cognitoLogin(credentials).then(result => {
            if (result.jwtToken) {
                this.processSuccessfulAuth(result);
            } else {
                this.setState({
                    isAuthenticated: false,
                    userData: result.userAttributes,
                    isNewPasswordRequired: true
                })
            }
        }).catch(err => (
            this.setState({
                isAuthenticated: false,
                userData: {},
                loginError: err
            })
        ));
    }

    logout() {
        cognitoLogout();
        this.setState({
            isAuthenticated: false,
            userData: {},
            loginError: {}
        });
        console.log("logged out")
    }

    completePassword(newPassword) {
        cognitoCompletePassword(this.state.userAttributes, newPassword).then(result => (
            this.processSuccessfulAuth(result)
        )).catch(err => (
            this.setState({
                isAuthenticated: false,
                userData: {},
                loginError: err
            })
        ))
    }

    setCustomerName(customerName) {
        this.setState(prevState => ({
            userData: {
                ...prevState.userData,
                customerName: customerName
            }
        }))
    }

    refreshSession() {
        cognitoRefreshAccessToken().then(result => {
            if (result.idToken.jwtToken) {
                this.setState(prevState => ({
                    userData: {
                        ...prevState.userData,
                        jwtToken: result.idToken.jwtToken
                    }
                }))
            }
        }).catch(err => {
            cognitoLogout();
            console.log("Failed to refresh sessio. User got logged out.")
        })
    }

    processSuccessfulAuth() {
        this.setState({
            isAuthenticated: true,
            isNewPasswordRequired: false,
            userData: {},
            loginError: {}
        });
        if (!this.state.appConfig) {
            console.log("Requesting app config");
            getConfig(this.state.userData.jwtToken).then(config => (        // getConfig missing
                this.setState({
                    appConfig: config.config
                })
            )).catch(err => {
                console.log("Failed to retrieve app config. Printing error:");
                console.log(err);
            })
        }
    }

    render() {
        return (
            <Auth.Provider value={{
                ...this.state, login: this.login, completePassword: this.completePassword, logout: this.logout,
                refreshSession: this.refreshSession, customerName: this.setCustomerName, isAuthenticated: this.isAuthenticated
            }}>
                {this.props.children}
            </Auth.Provider>
        )
    }
}

AWSLoginProvider.propTypes = {
    rootURL: PropTypes.string.isRequired
}

export default AWSLoginProvider;
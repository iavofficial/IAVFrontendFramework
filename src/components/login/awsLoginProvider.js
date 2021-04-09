import React, { Component } from "react";

import Auth from "../../contexts/auth";
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

    // setCustomerName missing

    refreshSession() {
        cognitoRefreshAccessToken().then(result => {
            // missing
        })
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
                ...this.state, login: this.login, completePassword: this.completePassword,
                logout: this.logout, refreshSession: this.refreshSession /* missing setCustomerName */
            }}>
                {this.props.children}
            </Auth.Provider>
        )
    }
}

export default AWSLoginProvider;
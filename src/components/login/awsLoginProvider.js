import React, { Component } from "react";
import PropTypes from "prop-types";

import AuthContext from "../../contexts/auth";
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
        this.componentDidRender = this.componentDidRender.bind(this);
        this.isAuthenticated = this.isAuthenticated.bind(this);
        this.login = this.login.bind(this);
        this.logout = this.logout.bind(this);
        this.getUsername = this.getUsername.bind(this);
        this.completePassword = this.completePassword.bind(this);
        this.setCustomerName = this.setCustomerName.bind(this);
        this.refreshSession = this.refreshSession.bind(this);
        this.processSuccessfulAuth = this.processSuccessfulAuth.bind(this);
    }

    componentDidMount() {
        this.componentDidRender();
    }

    componentDidUpdate() {
        this.componentDidRender();
    }

    // This function is not a react hook. This function was introduced to avoid code duplication.
    componentDidRender() {
        cognitoCheckIsAuthenticated().then(result => (
            this.processSuccessfulAuth(result)
        )).catch(() => {
            if (Object.entries(this.state.userData).length !== 0 || this.state.isAuthenticated !== false) {
                this.setState({
                    userData: {},
                    isAuthenticated: false
                });
            }
        });
    }

    isAuthenticated() {
        return this.state.isAuthenticated;
    }

    getUsername() {
        return this.state.userData.user;
    }

    login(credentials) {
        this.setState({
            isLoading: true
        });
        cognitoLogin(credentials).then(result => {
            if (result.jwtToken) {
                this.processSuccessfulAuth(result);
            } else {
                this.setState({
                    isAuthenticated: false,
                    userData: result.userAttributes,
                    isNewPasswordRequired: true
                });
            }
        }).catch(err => (
            this.setState({
                isAuthenticated: false,
                userData: {},
                loginError: err
            })
        )).then(() => {
            this.setState({
                isLoading: false
            });
        });
    }

    logout() {
        this.setState({
            isLoading: true
        });
        cognitoLogout().then(() => {
            this.setState({
                isLoading: false,
                isAuthenticated: false,
                userData: {},
                loginError: {}
            });
        });
        console.log("logged out")
    }

    completePassword(newPassword) {
        this.setState({
            isLoading: true
        });
        cognitoCompletePassword(this.state.userAttributes, newPassword).then(result => (
            this.processSuccessfulAuth(result)
        )).catch(err => (
            this.setState({
                isAuthenticated: false,
                userData: {},
                loginError: err
            })
        )).then(() => {
            this.setState({
                isLoading: false
            });
        });
    }

    setCustomerName(customerName) {
        this.setState(prevState => ({
            userData: {
                ...prevState.userData,
                customerName: customerName
            }
        }));
    }

    refreshSession() {
        this.setState({
            isLoading: true
        });
        cognitoRefreshAccessToken().then(result => {
            if (result.idToken.jwtToken) {
                this.setState(prevState => ({
                    userData: {
                        ...prevState.userData,
                        jwtToken: result.idToken.jwtToken
                    }
                }));
            }
        }).catch(() => {
            cognitoLogout();
            console.log("Failed to refresh session. User got logged out.");
        }).then(() => {
            this.setState({
                isLoading: false
            });
        });
    }

    processSuccessfulAuth(userData) {
        if (this.state.isAuthenticated !== true || this.state.isNewPasswordRequired !== false ||
            Object.entries(this.state.userData).length === 0 || Object.entries(this.state.loginError).length !== 0) {
            this.setState({
                isAuthenticated: true,
                isNewPasswordRequired: false,
                userData: userData,
                loginError: {}
            });
        }
        if (!this.state.appConfig) {
            console.log("Requesting app config");
            getConfig(userData.jwtToken, this.props.apiRoot).then(config => (
                this.setState({
                    appConfig: config.config
                })
            )).catch(err => {
                console.log("Failed to retrieve app config. Printing error:");
                console.log(err);
            });
        }
    }

    render() {
        return (
            <AuthContext.Provider value={{
                ...this.state, login: this.login, completePassword: this.completePassword, logout: this.logout, getUsername: this.getUsername,
                refreshSession: this.refreshSession, customerName: this.setCustomerName, isAuthenticated: this.isAuthenticated
            }}>
                {this.props.children}
            </AuthContext.Provider>
        )
    }
}

AWSLoginProvider.propTypes = {
    apiRoot: PropTypes.string.isRequired
};

export default AWSLoginProvider;
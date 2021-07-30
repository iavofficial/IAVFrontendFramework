import React, { Component } from "react";

import { AuthContext } from "../../../contexts/auth";
import {
    ValidUserInformation, cognitoLogin, cognitoLogout, cognitoCheckIsAuthenticated,
    cognitoCompletePassword, cognitoRefreshAccessToken
} from "../../../services/cognitoService";
import { LoginProvider, Credentials, securableFunctionType } from "../../../contexts/auth";

export interface Props {
    apiRoot: string;
    configureAmplify: () => void;
    failOnNoLegalGroup?: boolean;
    legalGroups?: string[];
}

export interface State {
    hasAuthenticated: boolean;
    isNewPasswordRequired: boolean;
    isLoading: boolean;
    userData: any;
    userAttributes: any;
    loginError: any;
    didRender: boolean;
}

export class AWSLoginProvider extends Component<React.PropsWithChildren<Props>, State> implements LoginProvider {
    constructor(props: Props) {
        super(props);
        this.state = {
            hasAuthenticated: false,        // true if user is authenticated
            isNewPasswordRequired: false,   // true if user logs in for the first time with his temp password and has to set a new one
            isLoading: false,               // true if user is in process of logging in
            userData: {},                   // contains user information
            userAttributes: {},             // user attributes retrieved from cognito necessary for the completePassword workflow
            loginError: {},
            didRender: false
        }
    }

    static defaultProps = {
        failOnNoLegalGroup: false,
        legalGroups: []
    }

    componentDidMount() {
        this.props.configureAmplify();
        this.checkIsAuthenticated();
    }

    componentDidUpdate() {
        this.checkIsAuthenticated();
    }

    checkIsAuthenticated = () => {
        return cognitoCheckIsAuthenticated(this.props.failOnNoLegalGroup!, this.props.legalGroups!).then((result) => {
            return this.processSuccessfulAuth(result);
        }
        ).catch((err) => {
            if (Object.entries(this.state.userData).length !== 0 || this.state.hasAuthenticated) {
                this.setState({
                    userData: {},
                    hasAuthenticated: false
                });
            }
        });
    }

    // Executes func. If it fails and throws NotAuthedError the session will be refreshed and the execution retried.
    // If it fails again the error will not be catched.
    execIfAuthed(func: securableFunctionType) {
        return func().then(response => {
            if (response.status === 401) {
                return this.refreshSession()
                    .then(func)
            } else {
                return response;
            }
        });
    }

    hasAuthenticated = () => {
        return this.state.hasAuthenticated;
    }

    getUsername = () => {
        return this.state.userData.username;
    }

    getUserGroups = () => {
        return this.state.userData.groups ? this.state.userData.groups : [];
    }

    login = (credentials: Credentials) => {
        this.setState({
            isLoading: true,
            loginError: {}
        });
        cognitoLogin(credentials, this.props.failOnNoLegalGroup!, this.props.legalGroups!).then(result => {
            if (result instanceof ValidUserInformation) {
                this.processSuccessfulAuth(result);
            } else {
                this.setState({
                    hasAuthenticated: false,
                    userData: result.userAttributes,
                    isNewPasswordRequired: true
                });
            }
        }).catch(err => (
            this.setState({
                hasAuthenticated: false,
                userData: {},
                loginError: err
            })
        )).then(() => {
            this.setState({
                isLoading: false
            });
        });
    }

    logout = () => {
        this.setState({
            isLoading: true
        });
        cognitoLogout().then(() => {
            this.setState({
                isLoading: false,
                hasAuthenticated: false,
                userData: {},
                loginError: {}
            });
        });
        console.log("logged out")
    }

    completePassword = (newPassword: String) => {
        this.setState({
            isLoading: true
        });
        cognitoCompletePassword(this.state.userAttributes, newPassword, this.props.failOnNoLegalGroup!, this.props.legalGroups!).then(result => (
            this.processSuccessfulAuth(result)
        )).catch(err => (
            this.setState({
                hasAuthenticated: false,
                userData: {},
                loginError: err
            })
        )).then(() => {
            this.setState({
                isLoading: false
            });
        });
    }

    refreshSession = () => {
        this.setState({
            isLoading: true
        });
        return cognitoRefreshAccessToken().then(result => {
            if (result.getIdToken().getJwtToken()) {
                this.setState(prevState => ({
                    isLoading: false,
                    userData: {
                        ...prevState.userData,
                        jwtToken: result.getIdToken().getJwtToken()
                    }
                }));
            }
        })
    }

    processSuccessfulAuth = (userData: ValidUserInformation) => {
        if (!this.state.hasAuthenticated|| this.state.isNewPasswordRequired ||
            Object.entries(this.state.userData).length === 0 || Object.entries(this.state.loginError).length !== 0) {
            this.setState({
                hasAuthenticated: true,
                isNewPasswordRequired: false,
                userData: userData,
                loginError: {}
            });
        }
    }

    render() {
        return (
            <AuthContext.Provider value={{
                ...this.state, login: this.login, completePassword: this.completePassword, logout: this.logout, getUsername: this.getUsername,
                getUserGroups: this.getUserGroups, refreshSession: this.refreshSession, hasAuthenticated: this.hasAuthenticated, execIfAuthed: this.execIfAuthed
            }}>
                {this.props.children}
            </AuthContext.Provider>
        )
    }
}
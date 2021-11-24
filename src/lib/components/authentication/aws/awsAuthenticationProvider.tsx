import React, { Component } from "react";

import { AuthContext, SecurableFunctionType } from "../../../contexts/auth";
import {
    ValidUserInformation, cognitoLogin, cognitoLogout, cognitoCheckIsAuthenticated,
    cognitoCompletePassword, cognitoRefreshAccessToken
} from "../../../services/cognitoService";
import { AuthenticationProvider, Credentials } from "../../../contexts/auth";

export interface Props {
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
    loginError: undefined | { [key: string]: any } | string;
    didRender: boolean;
}

export class AWSAuthenticationProvider extends Component<React.PropsWithChildren<Props>, State> implements AuthenticationProvider {
    constructor(props: Props) {
        super(props);
        this.state = {
            hasAuthenticated: false,        // true if user is authenticated
            isNewPasswordRequired: false,   // true if user logs in for the first time with his temp password and has to set a new one
            isLoading: false,               // true if user is in process of logging in
            userData: {},                   // contains user information
            userAttributes: {},             // user attributes retrieved from cognito necessary for the completePassword workflow
            loginError: undefined,
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
        console.log(this.state.hasAuthenticated);
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

    // This function tries to fetch the data from the given url and pass it to func. If the response status is 401, this function will try to renew the session.
    // If the second try to fetch the data fails, this function will throw the response as an error.
    execIfAuthed = (url: string, func: SecurableFunctionType, settings?: Object) => {
        return fetch(url, settings)
            .then((response) => {
                if (response.status === 401) {
                    return this.refreshSession()
                        .then(() => fetch(url, settings))
                        .then((responseAfterAuth) => {
                            if (response.status === 401) {
                                throw response;
                            } else {
                                return func(responseAfterAuth);
                            }
                        });
                } else {
                    return func(response);
                }
            })
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
            loginError: undefined
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
        }).catch(err => {
            this.setState({
                hasAuthenticated: false,
                userData: {},
                loginError: err
            })
        }).then(() => {
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
                loginError: undefined
            });
        });
        console.log("logged out");
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
        if (!this.state.hasAuthenticated || this.state.isNewPasswordRequired ||
            Object.entries(this.state.userData).length === 0) {
            this.setState({
                hasAuthenticated: true,
                isNewPasswordRequired: false,
                userData: userData,
                loginError: undefined
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
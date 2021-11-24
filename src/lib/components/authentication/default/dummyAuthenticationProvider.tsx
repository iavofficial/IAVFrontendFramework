import React, { Component } from "react";

import { AuthContext, SecurableFunctionType } from "../../../contexts/auth";
import { AuthenticationProvider, Credentials } from "../../../contexts/auth";

export interface State {
    hasAuthenticated: boolean;
    username: string;
}

export class DummyAuthenticationProvider extends Component<React.PropsWithChildren<any>, State> implements AuthenticationProvider {
    constructor(props: React.PropsWithChildren<any>) {
        super(props);
        this.state = {
            hasAuthenticated: false,
            username: ""
        }
    }

    execIfAuthed = (url: string, func: SecurableFunctionType, settings?: Object) => {
        return fetch(url, settings)
            .then((response) => {
                if (response.status === 401) {
                    throw response;
                } else {
                    return func(response);
                }
            });
    }

    login = (credentials: Credentials) => {
        this.setState({
            hasAuthenticated: true,
            username: credentials.email
        });
    }

    logout = () => {
        this.setState({
            hasAuthenticated: false,
            username: ""
        });
    }

    hasAuthenticated = () => {
        return this.state.hasAuthenticated;
    }

    getUsername = () => {
        return this.state.username;
    }

    render() {
        return (
            <AuthContext.Provider value={{
                ...this.state, hasAuthenticated: this.hasAuthenticated,
                login: this.login, logout: this.logout, getUsername: this.getUsername, execIfAuthed: this.execIfAuthed
            }}>
                {this.props.children}
            </AuthContext.Provider>
        );
    }
}
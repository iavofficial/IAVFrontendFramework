import React, { Component } from "react";

import { AuthContext } from "../../../contexts/auth";
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

    fetchAuthed = (url: string, settings?: Object) => {
        return fetch(url, settings);
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
                login: this.login, logout: this.logout, getUsername: this.getUsername, fetchAuthed: this.fetchAuthed
            }}>
                {this.props.children}
            </AuthContext.Provider>
        );
    }
}
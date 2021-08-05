import React, { Component } from "react";

import { AuthContext } from "../../../contexts/auth";
import { LoginProvider, Credentials, securableFunctionType } from "../../../contexts/auth";

export interface State {
    hasAuthenticated: boolean;
    username: string;
}

export class DummyLoginProvider extends Component<React.PropsWithChildren<any>, State> implements LoginProvider {
    constructor(props: React.PropsWithChildren<any>) {
        super(props);
        this.state = {
            hasAuthenticated: false,
            username: ""
        }
    }

    execIfAuthed(func: securableFunctionType) {
        return func();
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
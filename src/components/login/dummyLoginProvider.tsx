import React, { Component } from "react";

import { AuthContext } from "../../contexts/auth";
import { Credentials } from "./loginProvider";

export interface State {
    isAuthenticated: boolean;
    username: string;
}

export class DummyLoginProvider extends Component<React.PropsWithChildren<any>, State> {
    constructor(props: React.PropsWithChildren<any>) {
        super(props);
        this.state = {
            isAuthenticated: false,
            username: ""
        }
    }

    isAuthenticated = () => {
        return this.state.isAuthenticated;
    }

    login = (credentials: Credentials) => {
        this.setState({
            isAuthenticated: true,
            username: credentials.email
        });
    }

    logout = () => {
        this.setState({
            isAuthenticated: false,
            username: ""
        });
    }

    getUsername = () => {
        return this.state.username;
    }

    render() {
        return (
            <AuthContext.Provider value={{ ...this.state, isAuthenticated: this.isAuthenticated, login: this.login, logout: this.logout, getUsername: this.getUsername }}>
                {this.props.children}
            </AuthContext.Provider>
        );
    }
}
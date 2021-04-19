import React, { Component } from "react";

import Auth from "../../contexts/auth";
import { Credentials } from "./loginProvider";

interface State {
    isAuthenticated: boolean;
    username: String;
}

class DummyLoginProvider extends Component<React.PropsWithChildren<any>, State> {
    constructor(props: React.PropsWithChildren<any>) {
        super(props);
        this.state = {
            isAuthenticated: false,
            username: ""
        }
        this.isAuthenticated = this.isAuthenticated.bind(this);
        this.login = this.login.bind(this);
        this.logout = this.logout.bind(this);
        this.getUsername = this.getUsername.bind(this);
    }

    isAuthenticated() {
        return this.state.isAuthenticated;
    }

    login(credentials: Credentials) {
        this.setState({
            isAuthenticated: true,
            username: credentials.email
        });
    }

    logout() {
        this.setState({
            isAuthenticated: false,
            username: ""
        });
    }

    getUsername() {
        return this.state.username;
    }

    render() {
        return (
            <Auth.Provider value={{ ...this.state, isAuthenticated: this.isAuthenticated, login: this.login, logout: this.logout, getUsername: this.getUsername }}>
                {this.props.children}
            </Auth.Provider>
        );
    }
}

export default DummyLoginProvider;
import React, { Component } from "react";

import Auth from "../../contexts/auth";

class DummyLoginProvider extends Component {
    constructor(props) {
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

    login(credentials) {
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
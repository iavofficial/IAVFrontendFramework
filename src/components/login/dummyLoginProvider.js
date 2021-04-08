import React, { Component } from 'react';

import Auth from '../../contexts/auth.js';

class DummyLoginProvider extends Component {
    constructor(props) {
        super(props);
        this.state = {
            authenticated: false
        }
        this.isAuthenticated = this.isAuthenticated.bind(this);
        this.login = this.login.bind(this);
        this.logout = this.logout.bind(this);
    }

    isAuthenticated() {
        console.log(this.state.authenticated);
        return this.state.authenticated;
    }

    login() {
        this.setState({
            authenticated: true
        });
    }

    logout() {
        this.setState({
            authenticated: false
        });
    }

    render() {
        return (
            <Auth.Provider value={{ ...this.state, isAuthenticated: this.isAuthenticated, login: this.login, logout: this.logout, changePassword: this.changePassword }}>
                {this.props.children}
            </Auth.Provider>
        );
    }
}

export default DummyLoginProvider;
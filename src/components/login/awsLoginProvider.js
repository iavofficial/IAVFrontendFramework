import React, { Component } from 'react';

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
    }

    render() {
        return <div></div>;
    }
}

export default AWSLoginProvider;

// test().then(val => console.log(val)).catch(err => console.log(err));
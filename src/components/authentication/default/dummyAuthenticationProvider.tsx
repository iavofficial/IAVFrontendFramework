import React, { Component } from "react";
import { AuthContext, UserDataBasic } from "../../../contexts/auth";
import { AuthenticationProvider, Credentials } from "../../../contexts/auth";

export interface Props {
  additionalContextValues?: { [key: string]: any };
}

export interface State {
  hasAuthenticated: boolean;
  userData: UserDataBasic | undefined;
}

export class DummyAuthenticationProvider
  extends Component<React.PropsWithChildren<Props>, State>
  implements AuthenticationProvider
{
  constructor(props: React.PropsWithChildren<Props>) {
    super(props);
    this.state = {
      hasAuthenticated: false,
      userData: undefined,
    };
  }

  fetchAuthed = (url: string, settings?: Object) => {
    return fetch(url, settings);
  };

  login = (credentials: Credentials) => {
    this.setState({
      hasAuthenticated: true,
      userData: { username: credentials.email },
    });
  };

  logout = () => {
    this.setState({
      hasAuthenticated: false,
      userData: undefined,
    });
  };

  hasAuthenticated = () => {
    return this.state.hasAuthenticated;
  };

  getUserData = () => {
    return this.state.userData?.groups;
  };

  render() {
    return (
      <AuthContext.Provider
        value={Object.assign(
          {
            ...this.state,
            hasAuthenticated: this.hasAuthenticated,
            login: this.login,
            logout: this.logout,
            getUserData: this.getUserData,
            fetchAuthed: this.fetchAuthed,
          },
          this.props.additionalContextValues
        )}
      >
        {this.props.children}
      </AuthContext.Provider>
    );
  }
}

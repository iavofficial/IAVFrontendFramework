import React, {Component} from "react";
import {AuthContext, AuthenticationProvider, Credentials, UserDataBasic} from "../../../contexts/auth";

export interface Props {
  additionalContextValues?: { [key: string]: any };
}

export interface State {
  hasAuthenticated: boolean;
  userData: UserDataBasic | undefined;
  isRefreshing: boolean
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
      isRefreshing: false,
    };
  }

  fetchAuthed = (url: string, settings?: Object) => {
    return fetch(url, settings);
  };

  login = (credentials: Credentials) => {
      this.setState({
          isRefreshing: true,
          hasAuthenticated: true,
          userData: { username: credentials.email },
      });
  };

  logout = () => {
    this.setState({
      isRefreshing: false,
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

  isRefreshing = () => {
      return this.state.isRefreshing;
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
                  isRefreshing: this.isRefreshing,
                },
                this.props.additionalContextValues
            )}
        >
          {this.props.children}
        </AuthContext.Provider>
    );
  }
}
/**
 * Copyright © 2024 IAV GmbH Ingenieurgesellschaft Auto und Verkehr, All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import React, {Component} from "react";
import {
  AuthContext,
  AWSAuthenticationProviderType,
  AWSUserData,
  Credentials,
} from "../../../contexts/auth";
import {
  cognitoCheckIsAuthenticated,
  cognitoCompletePassword,
  cognitoLogin,
  cognitoLogout,
  cognitoRefreshToken,
  ValidUserInformation,
} from "../../../utils/cognitoService";
import {JWT} from "aws-amplify/auth";

export interface Props {
  configureAmplify: () => void;
  failOnNoLegalGroup?: boolean;
  legalGroups?: string[];
}

export interface State {
  hasAuthenticated: boolean;
  isNewPasswordRequired: boolean;
  isLoading: boolean;
  userData: AWSUserData | undefined;
  loginError: undefined | {[key: string]: any} | string;
}

interface FetchSettings {
  headers?: Headers;

  [key: string]: any;
}

export class AWSAuthenticationProvider
  extends Component<React.PropsWithChildren<Props>, State>
  implements AWSAuthenticationProviderType
{
  static defaultProps = {
    failOnNoLegalGroup: false,
    legalGroups: [],
  };

  constructor(props: Props) {
    super(props);

    this.state = {
      hasAuthenticated: false, // true if user is authenticated
      isNewPasswordRequired: false, // true if user logs in for the first time with his temp password and has to set a new one
      isLoading: false, // true if user is in process of logging in
      userData: undefined, // contains user information; undefined if no user is logged in
      loginError: undefined,
    };
  }

  componentDidMount() {
    this.props.configureAmplify();
    this.checkIsAuthenticated();
  }

  componentDidUpdate() {
    if (this.state.hasAuthenticated) {
      this.checkIsAuthenticated();
    }
  }

  checkIsAuthenticated = async () => {
    try {
      const result: ValidUserInformation | undefined =
        await cognitoCheckIsAuthenticated(
          this.props.failOnNoLegalGroup,
          this.props.legalGroups,
        );

      this.processSuccessfulAuth(result!);
      //eslint-disable-next-line
    } catch (error: any) {
      this.logout();
    }
  };

  generateSettingsWithAuthFrom = (token?: JWT, settings?: FetchSettings) => {
    if (settings !== undefined) {
      if ("headers" in settings) {
        if (!settings.headers?.has("Authorization")) {
          const settingsWithAuth = Object.assign({}, settings);
          settingsWithAuth.headers?.set(
            "Authorization",
            "Bearer " +
              (token ? token : this.state.userData?.idToken.toString()),
          );
          return settingsWithAuth;
        }
      } else {
        return Object.assign(settings, {
          headers: new Headers({
            Authorization:
              "Bearer " + (token ? token : this.state.userData?.idToken),
          }),
        });
      }
    } else {
      return {
        headers: new Headers({
          Authorization:
            "Bearer " + (token ? token : this.state.userData?.idToken),
        }),
      };
    }
  };

  //In Amplify 6 the fetchAuthedSession Function handles the renewing of sessions
  fetchAuthed = (url: string, token?: JWT, settings?: FetchSettings) => {
    try {
      this.checkIsAuthenticated();

      return fetch(
        url,
        this.generateSettingsWithAuthFrom(token, settings),
      ).then((response) => {
        return response;
      });
      //eslint-disable-next-line
    } catch (error) {
      this.logout();
      return new Promise<Response>((resolve) => {
        resolve(new Response(null, {status: 401, statusText: "Unauthorized"}));
      });
    }
  };

  hasAuthenticated = () => {
    return this.state.hasAuthenticated;
  };

  getUserData = () => {
    return this.state.userData;
  };

  getUserGroups = () => {
    return this.state.userData ? this.state.userData.groups : [];
  };

  login = async (credentials: Credentials) => {
    this.setState({
      isLoading: true,
      loginError: undefined,
    });
    try {
      const result: ValidUserInformation | object = await cognitoLogin(
        credentials,
        this.props.failOnNoLegalGroup,
        this.props.legalGroups,
      );
      if (result instanceof ValidUserInformation) {
        this.processSuccessfulAuth(result);
      } else {
        this.setState({
          hasAuthenticated: false,
          isNewPasswordRequired: true,
        });
      }
    } catch (error: any) {
      await this.logout(error);
    } finally {
      this.setState({
        isLoading: false,
      });
    }
  };

  processSuccessfulAuth = (userData: ValidUserInformation) => {
    if (!this.state.hasAuthenticated || this.state.isNewPasswordRequired) {
      this.setState({
        hasAuthenticated: true,
        isNewPasswordRequired: false,
        userData: userData,
        loginError: undefined,
      });
    }
  };

  logout = async (error?: any) => {
    this.setState({
      isLoading: true,
    });

    cognitoLogout()
      .catch((err: any) => {
        console.log("error signing out: ", err);
      })
      .finally(() => {
        this.setState({
          isLoading: false,
          hasAuthenticated: false,
          userData: undefined,
          loginError: error ? error : undefined,
        });
      });
  };

  completePassword = (newPassword: string) => {
    this.setState({
      isLoading: true,
    });
    cognitoCompletePassword(
      newPassword,
      this.props.failOnNoLegalGroup as boolean,
      this.props.legalGroups as string[],
    )
      .then((result: any) => this.processSuccessfulAuth(result))
      .catch((error: any) => this.logout(error))
      .then(() => {
        this.setState({
          isLoading: false,
        });
      });
  };

  refreshSession = async () => {
    try {
      const response = await cognitoRefreshToken(
        this.props.failOnNoLegalGroup,
        this.props.legalGroups,
      );

      if (response instanceof ValidUserInformation) {
        this.processSuccessfulAuth(response);
      }
    } catch (error) {
      this.logout(error);
    }
  };

  render() {
    return (
      <AuthContext.Provider
        value={{
          ...this.state,
          login: this.login,
          completePassword: this.completePassword,
          logout: this.logout,
          getUserData: this.getUserData,
          getUserGroups: this.getUserGroups,
          refreshSession: this.refreshSession,
          hasAuthenticated: this.hasAuthenticated,
          fetchAuthed: this.fetchAuthed,
        }}
      >
        {this.props.children}
      </AuthContext.Provider>
    );
  }
}

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
import {AuthContext, AuthenticationProvider, Credentials, UserDataBasic} from "../../../contexts/auth";

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

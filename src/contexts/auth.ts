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

import {JWT} from "aws-amplify/auth";
import React from "react";

export interface Credentials {
  email: string;
  password: string;
}

export type FetchAuthedFunction = (
  url: string,
  token: JWT,
  //eslint-disable-next-line
  settings?: Object,
) => Promise<Response>;

export interface UserDataBasic {
  username: string;
  [attribute: string]: any;
}

export interface AWSUserData extends UserDataBasic {
  idToken: JWT;
  accessToken: JWT;
  groups: string[];
}

export interface AuthenticationProvider {
  login(credentials: Credentials, ...rest: any): any;
  logout(): any;
  hasAuthenticated(): boolean;
  getUserData(): UserDataBasic | undefined;
  fetchAuthed: FetchAuthedFunction;
  isRefreshing?(): boolean;
}

export interface AWSAuthenticationProviderType extends AuthenticationProvider {
  getUserData(): AWSUserData | undefined;
}

export interface AuthContextType extends AuthenticationProvider {
  [attribute: string]: any;
}

export const AuthContext = React.createContext<AuthContextType | undefined>(
  undefined,
);

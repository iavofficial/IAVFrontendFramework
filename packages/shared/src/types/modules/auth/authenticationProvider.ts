/**
 * Copyright © 2025 IAV GmbH Ingenieurgesellschaft Auto und Verkehr, All Rights Reserved.
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

import {Slice} from "@reduxjs/toolkit";
import {FFStoreModule} from "../module";
import {AsyncThunk} from "@reduxjs/toolkit";

export type UserData = {
  username: string;
  userGroups?: string[];
  extras?: object;
};

export type AuthSlice<TState extends AuthState> = Slice<TState>;

export type FetchAuthedFunctionArgs = {
  url: string;
};

export type Credentials = {
  email: string;
  password: string;
};

export type AuthState = {
  hasAuthenticated: boolean; // true if user is authenticated
  isLoading: boolean; // true if user is in process of logging in
  userData: UserData | undefined; // contains user information; undefined if no user is logged in
  extras?: object;
};

export type AuthModule<TAuthState extends AuthState> = {
  slice: Slice<TAuthState>;
  fetchAuthed: AsyncThunk<Response, FetchAuthedFunctionArgs, any>;
  login: AsyncThunk<void, {credentials: Credentials}, any>;
  logout: AsyncThunk<void, {error?: unknown} | undefined, any>;
} & FFStoreModule;

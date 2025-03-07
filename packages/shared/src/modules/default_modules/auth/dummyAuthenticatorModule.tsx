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

import { createAsyncThunk, createSlice, PayloadAction, Slice, ThunkDispatch } from "@reduxjs/toolkit";
import { AuthModule, Credentials, UserData } from "../../../types/modules/auth/authenticatorModule";
import { MandatoryModuleNames } from "../../../constants/mandatoryModuleNames";

export interface Props {
  additionalContextValues?: {[key: string]: any};
}

export interface DummyAuthenticatorState {
  hasAuthenticated: boolean;
  userData: UserData | undefined;
  isLoading: boolean;
}

const initialState: DummyAuthenticatorState= {
  hasAuthenticated: false,
  isLoading: false,
  userData: undefined
}

export class DummyAuthenticator implements AuthModule<DummyAuthenticatorState>{
  public slice: Slice<DummyAuthenticatorState>;

  public fetchAuthed;
  public login;
  public logout;

  constructor() {
    this.slice = createSlice({
      name: MandatoryModuleNames.Authentication,
      initialState,
      reducers: {
        login: (state, action: PayloadAction<string>) => {
          // TODO: Check whether this works.
          state.isLoading = true;
          state.hasAuthenticated = true;
          state.userData = {username: action.payload}
        },
        logout: (state) => {
          state.isLoading = false;
          state.hasAuthenticated = false;
          state.userData = undefined;
        }
      }
    });

    const {
      login,
      logout
    } = this.slice.actions;

    this.fetchAuthed = createAsyncThunk<
    Response,
    {url: string; settings?: object},
    {state: {[MandatoryModuleNames.Authentication]: DummyAuthenticatorState}}
    >(
      MandatoryModuleNames.Authentication + "/fetchAuthed",
      async ({url, settings}) => {
        return fetch(url, settings);
      }
    );

    this.login = createAsyncThunk(
      MandatoryModuleNames.Authentication + "/login",
      async ({credentials} : {credentials: Credentials}, {dispatch}) => {
        dispatch(login(credentials.email));
      }
    );

    this.logout = createAsyncThunk<void, {error?: unknown} | undefined, {}>(
      MandatoryModuleNames.Authentication + "/logout",
      async ({error}: {error?: unknown} = {}, {dispatch}) => {
        dispatch(logout({}));
      }
    )
  }
}
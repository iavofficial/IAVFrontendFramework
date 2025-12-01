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

import {useEffect, useState} from "react";
import {
  Action,
  createAsyncThunk,
  createSlice,
  PayloadAction,
  ThunkDispatch,
} from "@reduxjs/toolkit";
import {
  cognitoCheckIsAuthenticated,
  cognitoCompletePassword,
  cognitoLogin,
  cognitoLogout,
  cognitoRefreshToken,
  ValidUserInformation,
} from "./cognitoService";
import {useDispatch, useSelector} from "react-redux";
import {AwsAuthenticatorExtras, AwsUserData} from "./awsAuthenticatorTypes";
import type {
  AuthModule,
  AuthState,
  Credentials,
} from "@iavofficial/frontend-framework-shared/authenticatorModule";
import {decodeJWT, JWT} from "aws-amplify/auth";
import {MandatoryModuleNames} from "@iavofficial/frontend-framework-shared/moduleNames";

export interface FetchSettings {
  headers?: Headers;
  [key: string]: any;
}

interface AwsAuthenticatorStateExtras {
  loginError: string | undefined;
  isNewPasswordRequired: boolean;
}

export interface AwsAuthenticatorState extends AuthState {
  userData: AwsUserData | undefined;
  extras: AwsAuthenticatorStateExtras;
}

export interface AwsAuthenticatorStoreState {
  [MandatoryModuleNames.Authenticator]: AwsAuthenticatorState;
}

export interface AwsAuthenticatorParameters {
  configureAmplify: () => void;
  failOnNoLegalGroup?: boolean;
  legalGroups?: string[];
}

export type AwsAuthenticatorAuthDispatch = ThunkDispatch<
  AwsAuthenticatorStoreState,
  unknown,
  Action<string>
>;

const initialState: AwsAuthenticatorState = {
  hasAuthenticated: false,
  isLoading: false,
  userData: undefined,
  extras: {
    isNewPasswordRequired: false,
    loginError: undefined,
  },
};

export class AwsAuthenticator implements AuthModule<AwsAuthenticatorState> {
  private config;

  public slice;
  public fetchAuthed;
  public login;
  public logout;
  public useModuleLifecycle;
  public extras: AwsAuthenticatorExtras;

  constructor({
    configureAmplify,
    failOnNoLegalGroup,
    legalGroups = [],
  }: AwsAuthenticatorParameters) {
    this.config = {
      failOnNoLegalGroup,
      legalGroups,
      configureAmplify,
    };

    this.slice = createSlice({
      name: MandatoryModuleNames.Authenticator,
      initialState,
      reducers: {
        processSuccessfulAuth: (
          state,
          action: PayloadAction<ValidUserInformation>,
        ) => {
          if (!state.hasAuthenticated || state.extras.isNewPasswordRequired) {
            state.hasAuthenticated = true;
            state.extras.isNewPasswordRequired = false;
            state.userData = action.payload;
            state.extras.loginError = undefined;
          }
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
          state.isLoading = action.payload;
        },
        setLoadingForLogin: (state, action: PayloadAction<boolean>) => {
          state.isLoading = action.payload;
          if (action.payload == true) {
            state.extras.loginError = undefined;
          }
        },
        setNewPasswordRequired: (state) => {
          state.extras.isNewPasswordRequired = true;
          state.hasAuthenticated = false;
        },
        logout: (state, action: PayloadAction<string>) => {
          state.isLoading = false;
          state.hasAuthenticated = false;
          state.userData = undefined;
          state.extras.loginError = action.payload;
        },
      },
    });

    const {
      processSuccessfulAuth,
      setLoadingForLogin,
      setNewPasswordRequired,
      setLoading,
      logout,
    } = this.slice.actions;

    this.fetchAuthed = createAsyncThunk<
      Response,
      {url: string; token?: JWT; settings?: FetchSettings},
      {state: {[MandatoryModuleNames.Authenticator]: AwsAuthenticatorState}}
    >(
      MandatoryModuleNames.Authenticator + "/thunkFetchAuthed",
      async ({url, token, settings}, {dispatch, getState}) => {
        await dispatch(this.extras.checkIsAuthenticated()).unwrap();
        return await fetch(
          url,
          generateSettingsWithAuthFrom(
            getState()[MandatoryModuleNames.Authenticator],
            token,
            settings,
          ),
        ).catch(() => {
          dispatch(this.logout());
          return new Promise<Response>((resolve) => {
            resolve(
              new Response(null, {status: 401, statusText: "Unauthorized"}),
            );
          });
        });
      },
    );

    this.login = createAsyncThunk(
      MandatoryModuleNames.Authenticator + "/thunkLogin",
      async ({credentials}: {credentials: Credentials}, {dispatch}) => {
        dispatch(setLoadingForLogin(true));
        return await cognitoLogin(
          credentials,
          this.config.failOnNoLegalGroup,
          this.config.legalGroups,
        )
          .then((result: ValidUserInformation | object) => {
            if (result instanceof ValidUserInformation) {
              dispatch(processSuccessfulAuth({...result}));
            } else {
              dispatch(setNewPasswordRequired());
            }
          })
          .catch((error: Error) => {
            console.log("Error signing in: ", error);
            dispatch(this.logout({error}));
          })
          .finally(() => {
            dispatch(setLoadingForLogin(false));
          });
      },
    );

    this.logout = createAsyncThunk<void, {error?: unknown} | undefined, {}>(
      MandatoryModuleNames.Authenticator + "/thunkLogout",
      async ({error}: {error?: unknown} = {}, {dispatch}) => {
        dispatch(setLoading(true));
        return await cognitoLogout()
          .catch((error: Error) => {
            console.log("Error signing out: ", error);
          })
          .finally(() => {
            dispatch(logout(extractMessageFromError(error)));
          });
      },
    );

    this.extras = {
      checkIsAuthenticated: createAsyncThunk(
        MandatoryModuleNames.Authenticator + "/thunkCheckIsAuthenticated",
        async (_, {dispatch}) => {
          return await cognitoCheckIsAuthenticated(
            this.config.failOnNoLegalGroup,
            this.config.legalGroups,
          )
            .then((result: ValidUserInformation | undefined) => {
              if (result !== undefined) {
                dispatch(processSuccessfulAuth({...result}));
              }
            })
            .catch((error: Error) => {
              dispatch(this.logout({}));
            });
        },
      ),
      completePassword: createAsyncThunk(
        MandatoryModuleNames.Authenticator + "/thunkCompletePassword",
        async ({newPassword}: {newPassword: string}, {dispatch}) => {
          dispatch(setLoading(true));
          return await cognitoCompletePassword(
            newPassword,
            this.config.failOnNoLegalGroup,
            this.config.legalGroups,
          )
            .then((result) => {
              if (result !== undefined) {
                dispatch(processSuccessfulAuth({...result}));
              }
            })
            .catch((error: Error) => {
              dispatch(this.logout({error}));
            })
            .finally(() => {
              dispatch(setLoading(false));
            });
        },
      ),
      refreshSession: createAsyncThunk(
        MandatoryModuleNames.Authenticator + "/thunkRefreshSession",
        async (_, {dispatch}) => {
          return await cognitoRefreshToken(
            this.config.failOnNoLegalGroup,
            this.config.legalGroups,
          )
            .then((response) => {
              if (response instanceof ValidUserInformation) {
                dispatch(processSuccessfulAuth({...response}));
              }
            })
            .catch((error: Error) => {
              dispatch(this.logout({error}));
            });
        },
      ),
    };

    this.useModuleLifecycle = () => {
      const [isInitialized, setIsInitialized] = useState(false);

      const dispatch = useDispatch<AwsAuthenticatorAuthDispatch>();
      const hasAuthenticated = useSelector(
        (state: AwsAuthenticatorStoreState) =>
          state[MandatoryModuleNames.Authenticator].hasAuthenticated,
      );

      useEffect(() => {
        if (!isInitialized) {
          this.config.configureAmplify();
          dispatch(this.extras.checkIsAuthenticated()).then(() =>
            setIsInitialized(true),
          );
        }
      }, [dispatch, isInitialized]);

      useEffect(() => {
        if (hasAuthenticated) {
          dispatch(this.extras.checkIsAuthenticated());
        }
      }, [hasAuthenticated, dispatch]);

      return {
        renderChildren: isInitialized,
      };
    };
  }
}

const generateSettingsWithAuthFrom = (
  state: AwsAuthenticatorState,
  token?: JWT,
  settings?: FetchSettings,
) => {
  if (settings !== undefined) {
    if ("headers" in settings) {
      if (!settings.headers?.has("Authorization")) {
        const settingsWithAuth = Object.assign({}, settings);
        settingsWithAuth.headers?.set(
          "Authorization",
          "Bearer " + (token ? token : state.userData?.idToken),
        );
        return settingsWithAuth;
      }
    } else {
      return Object.assign({}, settings, {
        headers: new Headers({
          Authorization: "Bearer " + (token ? token : state.userData?.idToken),
        }),
      });
    }
  } else {
    return {
      headers: new Headers({
        Authorization: "Bearer " + (token ? token : state.userData?.idToken),
      }),
    };
  }
};

function extractMessageFromError(error: unknown) {
  const errorObj = error as {
    code?: string;
    message?: string;
  };
  if (error) {
    if (typeof error === "object") {
      if (errorObj.code) {
        if (errorObj.code === "UserGroupError") {
          return "invalid_access_configuration";
        } else if (errorObj.code === "NotAuthorizedException") {
          return "invalid_username_or_password";
        } else if (errorObj.code === "InvalidPasswordException") {
          return "password_requirements_not_met";
        } else {
          return "server_error";
        }
      } else if (errorObj.message) {
        if (errorObj.message === "UserGroupError") {
          return "invalid_access_configuration";
        }
        return errorObj.message;
      }
    } else {
      return "server_error";
    }
  }
  return "";
}

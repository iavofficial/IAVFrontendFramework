import {useEffect, useState} from "react";
import {
  Action,
  createAsyncThunk,
  createSlice,
  PayloadAction,
  Slice,
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
import {JWT} from "@aws-amplify/auth";
import {
  AuthState,
  Credentials,
} from "@iavofficial/frontend-framework-shared/authenticationProvider";
import {AWSAuthenticatorExtras, AWSUserData} from "./awsAuthenticatorTypes";
import {MandatoryModuleNames} from "@iavofficial/frontend-framework-shared/mandatoryModuleNames";

export interface FetchSettings {
  headers?: Headers;
  [key: string]: any;
}

interface AWSAuthenticatorStateExtras {
  loginError: string | undefined;
  isNewPasswordRequired: boolean; // true if user logs in for the first time with his temp password and has to set a new one
}

export interface AWSAuthenticatorState extends AuthState {
  userData: AWSUserData | undefined; // contains user information; undefined if no user is logged in
  extras: AWSAuthenticatorStateExtras;
}

export interface AWSAuthenticatorStoreState {
  [MandatoryModuleNames.Authentication]: AWSAuthenticatorState;
}

export interface AWSAuthenticatorParameters {
  configureAmplify: () => void;
  failOnNoLegalGroup?: boolean;
  legalGroups?: string[];
}

export type AWSAuthenticatorAuthDispatch = ThunkDispatch<
  AWSAuthenticatorStoreState,
  unknown,
  Action<string>
>;

const initialState: AWSAuthenticatorState = {
  hasAuthenticated: false,
  isLoading: false,
  userData: undefined,
  extras: {
    isNewPasswordRequired: false,
    loginError: undefined,
  },
};

export class AWSAuthenticator {
  private config;

  public slice: Slice<AWSAuthenticatorState>;
  public fetchAuthed;
  public login;
  public logout;
  public useModuleLifecycle;
  public extras: AWSAuthenticatorExtras;

  constructor({
    configureAmplify,
    failOnNoLegalGroup,
    legalGroups = [],
  }: AWSAuthenticatorParameters) {
    this.config = {
      failOnNoLegalGroup,
      legalGroups,
      configureAmplify,
    };

    this.slice = createSlice({
      name: MandatoryModuleNames.Authentication,
      initialState,
      reducers: {
        // The Redux store demands that objects in action payloads are POJOs
        // (for example they cannot have functions).
        processSuccessfulAuth: (
          state,
          action: PayloadAction<ValidUserInformation>,
        ) => {
          if (!state.hasAuthenticated || state.extras.isNewPasswordRequired) {
            state.hasAuthenticated = true;
            state.extras.isNewPasswordRequired = false;
            // @ts-ignore
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

    // Side effect functions
    //In Amplify 6 the fetchAuthedSession Function handles the renewing of sessions
    this.fetchAuthed = createAsyncThunk<
      Response,
      {url: string; token?: JWT; settings?: FetchSettings},
      {state: {[MandatoryModuleNames.Authentication]: AWSAuthenticatorState}}
    >(
      MandatoryModuleNames.Authentication + "/thunkFetchAuthed",
      async ({url, token, settings}, {dispatch, getState}) => {
        dispatch(this.extras.checkIsAuthenticated()).unwrap();
        return await fetch(
          url,
          generateSettingsWithAuthFrom(getState().auth, token, settings),
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
      MandatoryModuleNames.Authentication + "/thunkLogin",
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
              dispatch(setNewPasswordRequired({}));
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
      MandatoryModuleNames.Authentication + "/thunkLogout",
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
        MandatoryModuleNames.Authentication + "/thunkCheckIsAuthenticated",
        async (_, {dispatch}) => {
          return await cognitoCheckIsAuthenticated(
            this.config.failOnNoLegalGroup,
            this.config.legalGroups,
          )
            .then((result: ValidUserInformation | undefined) => {
              dispatch(processSuccessfulAuth({...result}));
            })
            .catch((error: Error) => {
              dispatch(this.logout({}));
            });
        },
      ),
      completePassword: createAsyncThunk(
        MandatoryModuleNames.Authentication + "/thunkCompletePassword",
        async ({newPassword}: {newPassword: string}, {dispatch}) => {
          dispatch(setLoading(true));
          return await cognitoCompletePassword(
            newPassword,
            this.config.failOnNoLegalGroup,
            this.config.legalGroups,
          )
            .then((result) => {
              dispatch(processSuccessfulAuth({...result}));
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
        MandatoryModuleNames.Authentication + "/thunkRefreshSession",
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

      const dispatch = useDispatch<AWSAuthenticatorAuthDispatch>();
      const hasAuthenticated = useSelector<AWSAuthenticatorStoreState>(
        (state) => state.auth.hasAuthenticated,
      );

      useEffect(() => {
        if (!isInitialized) {
          this.config.configureAmplify();
          dispatch(this.extras.checkIsAuthenticated());
          setIsInitialized(true);
        }
      }, [dispatch, isInitialized]);

      // Equivalent to ComponentDidUpdate
      useEffect(() => {
        if (hasAuthenticated) {
          ("running");
          dispatch(this.extras.checkIsAuthenticated());
        }
      }, [hasAuthenticated, dispatch]);

      return {
        renderChildren: isInitialized,
      };
    };
  }
}

// Utility functions
const generateSettingsWithAuthFrom = (
  state: AWSAuthenticatorState,
  token?: JWT,
  settings?: FetchSettings,
) => {
  if (settings !== undefined) {
    if ("headers" in settings) {
      if (!settings.headers?.has("Authorization")) {
        const settingsWithAuth = Object.assign({}, settings);
        settingsWithAuth.headers?.set(
          "Authorization",
          "Bearer " +
            (token ? token : state.userData?.extras.idToken.toString()),
        );
        return settingsWithAuth;
      }
    } else {
      return Object.assign(settings, {
        headers: new Headers({
          Authorization:
            "Bearer " + (token ? token : state.userData?.extras.idToken),
        }),
      });
    }
  } else {
    return {
      headers: new Headers({
        Authorization:
          "Bearer " + (token ? token : state.userData?.extras.idToken),
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
          return "invalid_access_configuration"; // user was not added to a group
        } else if (errorObj.code === "NotAuthorizedException") {
          return "invalid_username_or_password"; // invalid user credentials
        } else if (errorObj.code === "InvalidPasswordException") {
          return "password_requirements_not_met"; // set password does not conform to password policy
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

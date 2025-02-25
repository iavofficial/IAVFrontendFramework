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
import {AuthState, Credentials} from "@iavofficial/frontend-framework-shared-types/authenticationProvider";
import {
  AWSAuthenticatorModule,
  AWSUserData,
} from "./awsAuthenticatorTypes";
import { AUTHENTICATION_SLICE_NAME } from "@iavofficial/frontend-framework/constants";

export interface FetchSettings {
  headers?: Headers;
  [key: string]: any;
}

export interface AWSAuthenticatorState extends AuthState{
  isNewPasswordRequired: boolean; // true if user logs in for the first time with his temp password and has to set a new one
  userData: AWSUserData | undefined; // contains user information; undefined if no user is logged in
  loginError: string | undefined;
}

export interface AWSAuthenticatorStoreState {
  [AUTHENTICATION_SLICE_NAME]: AWSAuthenticatorState
}

export interface AWSAuthenticatorParameters {
  configureAmplify: () => void;
  failOnNoLegalGroup?: boolean;
  legalGroups?: string[];
}

export type AWSAuthenticatorAuthDispatch = ThunkDispatch<AWSAuthenticatorStoreState, unknown, Action<string>>;

const initialState: AWSAuthenticatorState = {
  hasAuthenticated: false,
  isNewPasswordRequired: false,
  isLoading: false,
  userData: undefined,
  loginError: undefined,
};

export class AWSAuthenticator implements AWSAuthenticatorModule<AWSAuthenticatorState> {
  private failOnNoLegalGroup: boolean;
  private legalGroups: string[];
  private configureAmplify: () => void;

  public slice: Slice<AWSAuthenticatorState>;
  public fetchAuthed;
  public login;
  public logout;
  public completePassword;
  public refreshSession;
  public useModuleLifecycle;

  private checkIsAuthenticated;

  constructor({
    configureAmplify,
    failOnNoLegalGroup = false,
    legalGroups = [],
  }: AWSAuthenticatorParameters) {
    this.failOnNoLegalGroup = failOnNoLegalGroup;
    this.legalGroups = legalGroups;
    this.configureAmplify = configureAmplify;

    this.slice = createSlice({
      name: AUTHENTICATION_SLICE_NAME,
      initialState,
      reducers: {
        // The Redux store demands that objects in action payloads are POJOs
        // (for example they cannot have functions).
        processSuccessfulAuth: (
          state,
          action: PayloadAction<ValidUserInformation>,
        ) => {
          if (!state.hasAuthenticated || state.isNewPasswordRequired) {
            state.hasAuthenticated = true;
            state.isNewPasswordRequired = false;
            // @ts-ignore
            state.userData = action.payload;
            state.loginError = undefined;
          }
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
          state.isLoading = action.payload;
        },
        setLoadingForLogin: (state, action: PayloadAction<boolean>) => {
          state.isLoading = action.payload;
          if (action.payload == true) {
            state.loginError = undefined;
          }
        },
        setNewPasswordRequired: (state) => {
          state.isNewPasswordRequired = true;
          state.hasAuthenticated = false;
        },
        logout: (state, action: PayloadAction<string>) => {
          state.isLoading = false;
          state.hasAuthenticated = false;
          state.userData = undefined;
          state.loginError = action.payload;
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
    this.checkIsAuthenticated = createAsyncThunk(
      AUTHENTICATION_SLICE_NAME + "/thunkCheckIsAuthenticated",
      async (_, {dispatch}) => {
        try {
          const result: ValidUserInformation | undefined =
            await cognitoCheckIsAuthenticated(
              this.failOnNoLegalGroup,
              this.legalGroups,
            );
          dispatch(processSuccessfulAuth({...result}));
          //eslint-disable-next-line
        } catch (error: unknown) {
          dispatch(this.logout({error}));
        }
      },
    );

    //In Amplify 6 the fetchAuthedSession Function handles the renewing of sessions
    this.fetchAuthed = createAsyncThunk<
      Response,
      {url: string; token?: JWT; settings?: FetchSettings},
      {state: {[AUTHENTICATION_SLICE_NAME]: AWSAuthenticatorState}}
    >(
      AUTHENTICATION_SLICE_NAME + "/thunkFetchAuthed",
      async (
        {
          url,
          token,
          settings,
        },
        {dispatch, getState},
      ) => {
        try {
          dispatch(this.checkIsAuthenticated()).unwrap();
          const response = await fetch(
            url,
            generateSettingsWithAuthFrom(getState().auth, token, settings),
          );

          return response;
        } catch (error: unknown) {
          dispatch(this.logout());
          return new Promise<Response>((resolve) => {
            resolve(
              new Response(null, {status: 401, statusText: "Unauthorized"}),
            );
          });
        }
      },
    );

    this.login = createAsyncThunk(
      AUTHENTICATION_SLICE_NAME + "/thunkLogin",
      async ({credentials}: {credentials: Credentials}, {dispatch}) => {
        dispatch(setLoadingForLogin(true));
        try {
          const result: ValidUserInformation | object = await cognitoLogin(
            credentials,
            this.failOnNoLegalGroup,
            this.legalGroups,
          );
          if (result instanceof ValidUserInformation) {
            dispatch(processSuccessfulAuth({...result}));
          } else {
            dispatch(setNewPasswordRequired({}));
          }
        } catch (error: unknown) {
          await this.logout({error});
        } finally {
          dispatch(setLoadingForLogin(false));
        }
      },
    );

    this.logout = createAsyncThunk<void, {error?: unknown} | undefined, {}>(
      AUTHENTICATION_SLICE_NAME + "/thunkLogout",
      async ({error}: {error?: unknown} = {}, {dispatch}) => {
        dispatch(setLoading(true));
        try {
          await cognitoLogout();
        } catch (err: unknown) {
        } finally {          
          dispatch(logout(extractMessageFromError(error)));
        }
      },
    );

    this.completePassword = createAsyncThunk(
      AUTHENTICATION_SLICE_NAME + "/thunkCompletePassword",
      async ({newPassword}: {newPassword: string}, {dispatch}) => {
        dispatch(setLoading(true));
        try {
          const result = await cognitoCompletePassword(
            newPassword,
            this.failOnNoLegalGroup,
            this.legalGroups,
          );
          dispatch(processSuccessfulAuth({...result}));
        } catch (error: unknown) {
          // Dispatch the logout thunk with the error
          dispatch(this.logout({error}));
        } finally {
          dispatch(setLoading(false));
        }
      },
    );

    this.refreshSession = createAsyncThunk(
      AUTHENTICATION_SLICE_NAME + "/thunkRefreshSession",
      async (_, {dispatch}) => {
        try {
          const response = await cognitoRefreshToken(
            this.failOnNoLegalGroup,
            this.legalGroups,
          );

          if (response instanceof ValidUserInformation) {
            dispatch(processSuccessfulAuth({...response}));
          }
        } catch (error: unknown) {
          dispatch(this.logout({error}));
        }
      },
    );

    this.useModuleLifecycle = () => {
      const [isInitialized, setIsInitialized]  = useState(false);

      const dispatch = useDispatch<AWSAuthenticatorAuthDispatch>();
      const hasAuthenticated = useSelector<AWSAuthenticatorStoreState>(
        (state) => state.auth.hasAuthenticated,
      );
  
      useEffect(() => {
        this.configureAmplify();
        dispatch(this.checkIsAuthenticated());
        setIsInitialized(true);
      }, [dispatch]);
  
      // Equivalent to ComponentDidUpdate
      useEffect(() => {
        if (hasAuthenticated) {
          dispatch(this.checkIsAuthenticated());
        }
      }, [hasAuthenticated, dispatch]);
  
      return {
        renderChildren: isInitialized,
      };
    }
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
          "Bearer " + (token ? token : state.userData?.idToken.toString()),
        );
        return settingsWithAuth;
      }
    } else {
      return Object.assign(settings, {
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
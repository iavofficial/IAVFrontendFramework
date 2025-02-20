import {useEffect} from "react";
import {AWSAuthenticationView} from "./components/awsAuthenticationView";
import {
  createAsyncThunk,
  createSlice,
  PayloadAction,
  Slice,
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
import {Credentials} from "@iavofficial/frontend-framework-shared-types/authenticationProvider";
import {
  AWSAuthenticatorModule,
  AWSUserData,
} from "./awsAuthenticationProviderTypes";

export {AWSAuthenticationView};

const AUTHENTICATION_SLICE_NAME = "auth";

interface FetchSettings {
  headers?: Headers;
  [key: string]: any;
}

interface State {
  hasAuthenticated: boolean; // true if user is authenticated
  isNewPasswordRequired: boolean; // true if user logs in for the first time with his temp password and has to set a new one
  isLoading: boolean; // true if user is in process of logging in
  userData: AWSUserData | undefined; // contains user information; undefined if no user is logged in
  loginError: {[key: string]: any} | string | undefined;
}

interface Parameters {
  failOnNoLegalGroup: boolean;
  legalGroups: string[];
  configureAmplify: () => void;
}

const initialState: State = {
  hasAuthenticated: false,
  isNewPasswordRequired: false,
  isLoading: false,
  userData: undefined,
  loginError: undefined,
};

export class AWSAuthenticator implements AWSAuthenticatorModule<State> {
  private failOnNoLegalGroup: boolean;
  private legalGroups: string[];
  private configureAmplify: any;

  public slice: Slice<State>;
  public fetchAuthed;
  public login;
  public logout;
  public completePassword;
  public refreshSession;

  private checkIsAuthenticated;

  constructor({
    configureAmplify,
    failOnNoLegalGroup = false,
    legalGroups = [],
  }: Parameters) {
    this.failOnNoLegalGroup = failOnNoLegalGroup;
    this.legalGroups = legalGroups;
    this.configureAmplify = configureAmplify;

    this.slice = createSlice({
      name: AUTHENTICATION_SLICE_NAME,
      initialState,
      reducers: {
        processSuccessfulAuth: (
          state,
          action: PayloadAction<ValidUserInformation>,
        ) => {
          if (!state.hasAuthenticated || state.isNewPasswordRequired) {
            state.hasAuthenticated = true;
            state.isNewPasswordRequired = false;
            // @ts-ignore The types from the immer library in combination with the JWT
            // type cause problems.
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
        logout: (state, action: PayloadAction<string | undefined>) => {
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
      AUTHENTICATION_SLICE_NAME + "/checkIsAuthenticated",
      async (_, {dispatch}) => {
        try {
          const result: ValidUserInformation | undefined =
            await cognitoCheckIsAuthenticated(
              this.failOnNoLegalGroup,
              this.legalGroups,
            );
          dispatch(processSuccessfulAuth(result!));
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
      {state: {[AUTHENTICATION_SLICE_NAME]: State}}
    >(
      AUTHENTICATION_SLICE_NAME + "/fetchAuthed",
      async (
        {
          url,
          token,
          settings,
        }: {url: string; token?: JWT; settings?: FetchSettings},
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
      AUTHENTICATION_SLICE_NAME + "/login",
      async ({credentials}: {credentials: Credentials}, {dispatch}) => {
        dispatch(setLoadingForLogin(true));
        try {
          const result: ValidUserInformation | object = await cognitoLogin(
            credentials,
            this.failOnNoLegalGroup,
            this.legalGroups,
          );
          if (result instanceof ValidUserInformation) {
            dispatch(processSuccessfulAuth(result));
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
      AUTHENTICATION_SLICE_NAME + "/logout",
      async ({error}: {error?: unknown} = {}, {dispatch}) => {
        dispatch(setLoading(true));
        try {
          await cognitoLogout();
        } catch (err: unknown) {
          console.log("error signing out: ", err);
        } finally {
          dispatch(logout(error));
        }
      },
    );

    this.completePassword = createAsyncThunk(
      AUTHENTICATION_SLICE_NAME + "/completePassword",
      async ({newPassword}: {newPassword: string}, {dispatch}) => {
        dispatch(setLoading(true));
        try {
          const result = await cognitoCompletePassword(
            newPassword,
            this.failOnNoLegalGroup,
            this.legalGroups,
          );
          dispatch(processSuccessfulAuth(result));
        } catch (error: unknown) {
          // Dispatch the logout thunk with the error
          dispatch(this.logout({error}));
        } finally {
          dispatch(setLoading(false));
        }
      },
    );

    this.refreshSession = createAsyncThunk(
      AUTHENTICATION_SLICE_NAME + "/refreshSession",
      async (_, {dispatch}) => {
        try {
          const response = await cognitoRefreshToken(
            this.failOnNoLegalGroup,
            this.legalGroups,
          );

          if (response instanceof ValidUserInformation) {
            dispatch(processSuccessfulAuth(response));
          }
        } catch (error: unknown) {
          dispatch(this.logout({error}));
        }
      },
    );
  }

  public useModuleLifecycle() {
    const dispatch = useDispatch();
    const hasAuthenticated = useSelector<{[AUTHENTICATION_SLICE_NAME]: State}>(
      (state) => state.auth.hasAuthenticated,
    );

    useEffect(() => {
      this.configureAmplify();
      dispatch(this.checkIsAuthenticated());
    }, [dispatch]);

    // Equivalent to ComponentDidUpdate
    useEffect(() => {
      if (hasAuthenticated) {
        dispatch(this.checkIsAuthenticated());
      }
    }, [hasAuthenticated, dispatch]);

    return {
      renderChildren: true,
    };
  }
}

// Utility functions
const generateSettingsWithAuthFrom = (
  state: State,
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

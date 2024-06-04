import React, { Component } from "react";
import {
  AuthContext,
  AuthenticationProvider,
  Credentials,
} from "../../../contexts/auth";
import {
  ValidUserInfo,
  cognitoLogin,
  cognitoLogout,
  cognitoCheckIsAuthenticated,
  cognitoCompletePassword,
  cognitoRefreshToken,
} from "../../../utils/cognitoService";
import { Amplify } from "aws-amplify";
import { JWT } from "aws-amplify/auth";

export interface Props {
  configureAmplify: () => void;
  failOnNoLegalGroup?: boolean;
  legalGroups?: string[];
}

export interface State {
  hasAuthenticated: boolean;
  isNewPasswordRequired: boolean;
  isLoading: boolean;
  userData: any;
  loginError: undefined | { [key: string]: any } | string;
  didRender: boolean;
}

interface FetchSettings {
  headers?: Headers;
  [key: string]: any;
}

export class AWSAuthenticationProvider
  extends Component<React.PropsWithChildren<Props>, State>
  implements AuthenticationProvider
{
  constructor(props: Props) {
    super(props);
    //TODO: add Typing for userdata
    this.state = {
      hasAuthenticated: false, // true if user is authenticated
      isNewPasswordRequired: false, // true if user logs in for the first time with his temp password and has to set a new one
      isLoading: false, // true if user is in process of logging in
      userData: {}, // contains user information
      loginError: undefined,
      didRender: false,
    };
  }

  static defaultProps = {
    failOnNoLegalGroup: false,
    legalGroups: [],
  };

  componentDidMount() {
    Amplify.configure({
      Auth: {
        Cognito: {
          userPoolClientId: "3nh3h9av47ki8rif689ju5p9qm",
          userPoolId: "eu-central-1_W3WR4Ef6Q",
        },
      },
    });
    //TODO uncomment this line of code
    //this.props.configureAmplify();
    this.checkIsAuthenticated();
  }

  componentDidUpdate() {
    if (this.state.hasAuthenticated) this.checkIsAuthenticated();
  }

  checkIsAuthenticated = async () => {
    try {
      let result: ValidUserInfo | undefined = await cognitoCheckIsAuthenticated(
        this.props.failOnNoLegalGroup!,
        this.props.legalGroups!
      );

      this.processSuccessfulAuth(result as ValidUserInfo);
    } catch (error: any) {
      this.logout();
    }
  };

  generateSettingsWithAuthFrom = (
    token: JWT,
    settings: FetchSettings | undefined
  ) => {
    if (settings !== undefined) {
      if ("headers" in settings) {
        if (!settings.headers?.has("Authorization")) {
          const settingsWithAuth = Object.assign({}, settings);
          settingsWithAuth.headers?.set("Authorization", "Bearer " + token);
          return settingsWithAuth;
        }
      } else {
        return Object.assign(settings, {
          headers: new Headers({
            Authorization: "Bearer " + token,
          }),
        });
      }
    } else {
      return {
        headers: new Headers({
          Authorization: "Bearer " + token.toString(),
        }),
      };
    }
  };

  // This function tries to fetch the data from the given url. If the response status is 401, this function will try to renew the session.
  fetchAuthed = (url: string, token: JWT, settings?: FetchSettings) => {
    return fetch(url, this.generateSettingsWithAuthFrom(token, settings)).then(
      (response) => {
        if (response.status === 401) {
          return this.refreshSession()
            .then(() =>
              fetch(url, this.generateSettingsWithAuthFrom(token, settings))
            )
            .then((responseAfterAuth) => {
              return responseAfterAuth;
            });
        } else {
          return response;
        }
      }
    );
  };

  hasAuthenticated = () => {
    return this.state.hasAuthenticated;
  };

  getUserData = () => {
    return this.state.userData;
  };

  getUserGroups = () => {
    return this.state.userData.groups ? this.state.userData.groups : [];
  };

  login = async (credentials: Credentials) => {
    this.setState({
      isLoading: true,
      loginError: undefined,
    });
    try {
      let result: ValidUserInfo | {} = await cognitoLogin(
        credentials,
        this.props.failOnNoLegalGroup!,
        this.props.legalGroups!
      );
      if ("accessToken" in result && "idToken" in result) {
        this.processSuccessfulAuth(result as ValidUserInfo);
      } else {
        this.setState({
          hasAuthenticated: false,
          isNewPasswordRequired: true,
        });
      }
    } catch (error: any) {
      this.logout(error);
    } finally {
      this.setState({
        isLoading: false,
      });
    }
  };

  processSuccessfulAuth = (userData: ValidUserInfo) => {
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
      .then(() => {
        this.setState({
          isLoading: false,
          hasAuthenticated: false,
          userData: {},
          loginError: undefined,
        });
      })
      .catch((err: any) => {
        console.log("error signing out: ", err);
      })
      .finally(() => {
        this.setState({
          isLoading: false,
          hasAuthenticated: false,
          userData: {},
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
      this.props.legalGroups as string[]
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
      let response = await cognitoRefreshToken();

      if (response.tokens) {
        this.setState((prevState) => ({
          userData: {
            ...prevState.userData,
            accessToken: response.tokens?.accessToken,
            idToken: response.tokens?.idToken,
          },
        }));
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

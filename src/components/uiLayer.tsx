import 'primeflex/primeflex.css';
import 'primereact/resources/themes/nova/theme.css';
import 'primereact/resources/primereact.css';
import 'primeicons/primeicons.css';
import React, { useContext, useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Route,
  useLocation,
  Routes,
  useNavigate,
} from "react-router-dom";
import "./css/constants.css";
import "./css/globalChangesOnPrimeReactComponents.css";
import "./css/globalSettings.css";
import { BasicAuthenticationView } from "./authentication/default/basicAuthenticationView";
import { SettingsMenuOptions } from "./header/settingsMenu";
import { CookieBanner } from "./cookie/cookieBanner";
import { AuthContext } from "../contexts/auth";
import { AuthenticationViewProps } from "./authentication/authenticationView";
import { MainView } from "./mainView";
import { DefaultImprint } from "./imprint/defaultImprint";
import { TabAndContentWrapper } from "./navbar/wrapper/typesTabAndContentWrapper";
import { NavbarSettingsProvider } from "../providers/navbarSettingsProvider";
import { StaticCollapsedState } from "../types/navbarSettingsTypes";

import "./uiLayer.css";
import "./css/darkModeInputsWorkAround.css";
import { HeaderOptions } from "./header/header";
import { UserMenuOptions } from "./header/userMenu";
import { setAcceptCookies } from "../utils/setAcceptCookies";
import { useCookies } from "react-cookie";
import { ACCEPTED_COOKIES_NAME } from "../constants";

export interface AuthOptions {
  backgroundImage?: string;
  companyText?: string;
  preventDarkmode?: boolean;
}

export interface NavbarOptions {
  staticCollapsedState?: StaticCollapsedState;
}

export interface Props {
  tabAndContentWrappers: TabAndContentWrapper[];
  startingPoint: string;
  disableLogin?: boolean;
  disableCookieBanner?: boolean;
  authenticationView?: React.ComponentType<AuthenticationViewProps & any>;
  documentsComponent?: React.ComponentType<any>;
  documentsLabelKey?: string;
  settingsMenuOptions?: SettingsMenuOptions;
  userMenuOptions?: UserMenuOptions;
  headerOptions?: HeaderOptions;
  authOptions?: AuthOptions;
  hideLegalDocuments?: boolean;
  navbarOptions?: NavbarOptions;
}

export const UILayer = (props: Props) => {
  const authContext = useContext(AuthContext);

  const [, setCookie,] = useCookies([
    ACCEPTED_COOKIES_NAME,
  ]);

  const AuthenticationView = props.authenticationView
    ? props.authenticationView
    : BasicAuthenticationView;
  
  // If the login is disabled, the user should not be able to log out.
  const userMenuOptions = {...props.userMenuOptions};
  if(props.disableLogin) {
    userMenuOptions.hideLogoutButton = true;
  }

  useEffect(() => {
    if(props.disableCookieBanner) {
      setAcceptCookies(setCookie);
    }
  }, [props.disableCookieBanner]);

  return (
    <NavbarSettingsProvider
      staticCollapsedState={props.navbarOptions?.staticCollapsedState}
    >
      {
        !props.disableCookieBanner &&
        <CookieBanner />
      }
      <Router>
        <Redirector startingPoint={props.startingPoint} disableLogin={props.disableLogin}/>
        <Routes>
          {!props.disableLogin && (
            <Route
              path="/login"
              element={
                <AuthenticationView
                  authOptions={props.authOptions}
                  hideLanguageSelection={
                    props.settingsMenuOptions?.hideLanguageSelection
                  }
                  headerOptions={props.headerOptions}
                  hideLegalDocuments={props.hideLegalDocuments}
                />
              }
            />
          )}
          {!props.disableLogin && !authContext?.hasAuthenticated() && (
            <Route
              path="/documents"
              element={
                props.documentsComponent ? (
                  <props.documentsComponent />
                ) : (
                  <DefaultImprint />
                )
              }
            />
          )}
          <Route
            path="/*"
            element={
              <MainView
                headerOptions={props.headerOptions}
                settingsMenuOptions={props.settingsMenuOptions}
                userMenuOptions={userMenuOptions}
                documentsLabelKey={props.documentsLabelKey}
                documentsComponent={props.documentsComponent}
                tabAndContentWrappers={props.tabAndContentWrappers}
                hideLegalDocuments={props.hideLegalDocuments}
              />
            }
          />
        </Routes>
      </Router>
    </NavbarSettingsProvider>
  );
};

interface RedirectorProps {
  startingPoint: string;
  disableLogin?: boolean;
}

/**
 * This component is needed because the useLocation hook can only be used inside a Router-component
 * environment.
 * @param props
 * @constructor
 */
const Redirector = (props: RedirectorProps) => {
  const disableLogin = props.disableLogin;

  const [, setIntialNavigationDone] = useState(false);

  const authContext = useContext(AuthContext);
  const userIsAuthenticated = authContext!.hasAuthenticated();

  const currentPath = useLocation().pathname;
  const navigate = useNavigate();

  useEffect(() => {
    // Case: Login is disabled.
    if(disableLogin) {
      setIntialNavigationDone((prevState) => {
        if(!prevState) {
          navigate(props.startingPoint.valueOf());
        }
        // At this point the state should always be true.
        return true;
      })
      return;
    };

    // Case: Login is enabled.
    if (!userIsAuthenticated) {
      if (currentPath !== "/documents") {
        navigate("/login");
      }
    } else {
      if (currentPath === "/login") {
        navigate(props.startingPoint.valueOf());
      }
    }
  }, [disableLogin, currentPath, userIsAuthenticated, navigate]);

  return <React.Fragment />;
};

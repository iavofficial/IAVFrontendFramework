import 'primeflex/primeflex.css';
import 'primereact/resources/themes/nova/theme.css';
import 'primereact/resources/primereact.css';
import 'primeicons/primeicons.css';
import React, { useContext, ReactElement, useEffect, useRef } from 'react';
import {
  BrowserRouter as Router,
  Route,
  useLocation,
  Routes,
  useNavigate,
} from 'react-router-dom';
import './css/constants.css';
import './css/disaPage.css';
import './css/disaFramework.css';
import './css/error.css';
import { BasicAuthenticationView } from './authentication/default/basicAuthenticationView';
import { CookieBanner } from './cookie/cookieBanner';
import { AuthContext } from '../contexts/auth';
import { MenuOptions } from './navbar/menu';
import { AuthenticationViewProps } from './authentication/aws/authenticationView';
import { MainView } from './mainView';
import { DefaultImprint } from './imprint/defaultImprint';
import {
  groupPropsBasicFirstLayer,
  navbarTabProps,
} from './navbar/tabs/navbarTabTypes';

export interface HeaderOptions {
  reactElementRight?: ReactElement;
  reactElementLeft?: ReactElement;
  reactElementFull?: ReactElement;
  reactElementFullAuthenticationHeader?: ReactElement;
  letteringElementLeft?: string;
  hideLeft?: boolean;
  hideRight?: boolean;
}

export interface Coloroptions {
  headerBackground?: string;
  navbarColorSettings?: {
    menuSettingsBackground?: string;
    menuSettingsTextColor?: string;
    clockColor?: string;
    documentsColor?: string;
    dateTextColor?: string;
    navbarBackground?: string;
  };
  authViewColorSettings?: {
    headerBackground?: string;
    fullBackground?: string;
    loginBackground?: string;
    loginBtnBackground?: string;
    letteringElementLeftColor?: string;
    letteringElementRightColor?: string;
    companyTextColor?: string;
    legalDocumentsColor?: string;
  };
}

export interface Props {
  // tabAndContentWrappers: TabAndContentWrapper[];
  startingPoint: string;
  tabsAndContent: (groupPropsBasicFirstLayer | navbarTabProps)[];
  menuOptions?: MenuOptions;
  authenticationView?: React.ComponentType<AuthenticationViewProps & any>;
  documentsComponent?: React.ComponentType<any>;
  documentsLabelKey?: string;
  headerOptions?: HeaderOptions;
  colorOptions?: Coloroptions;
  collabsible?: boolean;
}

export const UILayer = (props: Props) => {
  const authContext = useContext(AuthContext);
  const AuthenticationView = props.authenticationView
    ? props.authenticationView
    : BasicAuthenticationView;

  return (
    <>
      <CookieBanner />
      <Router>
        <Redirector startingPoint={props.startingPoint} />
        <Routes>
          <Route
            path="/login"
            element={
              <AuthenticationView
                documentsLabelKey={props.documentsLabelKey}
                headerOptions={props.headerOptions}
                colorOptions={props.colorOptions}
              />
            }
          />
          {!authContext?.hasAuthenticated() && (
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
                colorOptions={props.colorOptions}
                collabsible={props.collabsible}
                menuOptions={props.menuOptions}
                documentsLabelKey={props.documentsLabelKey}
                documentsComponent={props.documentsComponent}
                tabsAndContent={props.tabsAndContent}
              />
            }
          />
        </Routes>
      </Router>
    </>
  );
};

interface RedirectorProps {
  startingPoint: string;
}

/**
 * This component is needed because the useLocation hook can only be used inside a Router-component
 * environment.
 * @param props
 * @constructor
 */
const Redirector = (props: RedirectorProps) => {
  const authContext = useContext(AuthContext);
  const userIsAuthenticated = authContext!.hasAuthenticated();

  const currentPath = useLocation().pathname;
  const navigate = useNavigate();

  useEffect(() => {
    if (!userIsAuthenticated) {
      if (currentPath !== '/documents') {
        console.log('triggerd');

        navigate('/login');
      }
    } else {
      if (currentPath === '/login') {
        navigate(props.startingPoint.valueOf());
      }
    }
  }, [currentPath, userIsAuthenticated, navigate]);

  return <React.Fragment />;
};

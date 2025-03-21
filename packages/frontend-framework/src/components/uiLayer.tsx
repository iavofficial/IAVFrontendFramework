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

import "primeflex/primeflex.css";
import "primereact/resources/themes/nova/theme.css";
import "primereact/resources/primereact.css";
import "primeicons/primeicons.css";
import React, {useEffect} from "react";
import {BasicAuthenticationView} from "./authentication/default/basicAuthenticationView";
import {SettingsMenuOptions} from "./header/settingsMenu";
import {CookieBanner} from "./cookie/cookieBanner";
import {MainView} from "./mainView";
import {DefaultLegalDocument} from "./imprint/defaultLegalDocument";
import {TabAndContentWrapper} from "./navbar/wrappers/typesWrappers";
import {NavbarSettingsProvider} from "../contexts/providers/navbarSettingsProvider";
import {StaticCollapsedState} from "../types/navbarSettingsTypes";
import {HeaderOptions} from "./header/header";
import {UserMenuOptions} from "./header/userMenu";
import {setAcceptCookies} from "../utils/setAcceptCookies";
import {useCookies} from "react-cookie";
import {ACCEPTED_COOKIES_NAME} from "@iavofficial/frontend-framework-shared/constants";
import {AuthenticationViewProps} from "@iavofficial/frontend-framework-shared/authenticationViewProps";
import "./uiLayer.css";
import "../css/fonts.css";
import "../css/darkModeInputsWorkAround.css";
import "../css/constants.css";
import "../css/globalChangesOnPrimeReactComponents.css";
import "../css/globalSettings.css";
import "../css/globalColors.css";
import "../css/authenticationView.css";
import {useDefaultSelector} from "@iavofficial/frontend-framework-shared/moduleDefaults";
import {useModule} from "@iavofficial/frontend-framework-shared/moduleContext";
import {MandatoryModuleNames} from "@iavofficial/frontend-framework-shared/moduleNames";
import {ImprintText} from "./imprint/imprintText";
import {PrivacyPolicyText} from "./imprint/privacyPolicyText";

export interface AuthOptions {
  backgroundImage?: string;
  companyText?: string;
  preventDarkmode?: boolean;
  errorMessages?: {
    passwordErrorMessage?: string;
  };
}

export interface NavbarOptions {
  staticCollapsedState?: StaticCollapsedState;
}

export interface Props {
  // This indicates that the passed objects should have the type's properties at least.
  tabAndContentWrappers: TabAndContentWrapper[];
  initialPath: string;
  disableLogin?: boolean;
  disableCookieBanner?: boolean;
  authenticationView?: React.ComponentType<AuthenticationViewProps & any>;
  imprintComponent?: React.ComponentType<any>;
  privacyPolicyComponent?: React.ComponentType<any>;
  documentsLabelKey?: string;
  settingsMenuOptions?: SettingsMenuOptions;
  userMenuOptions?: UserMenuOptions;
  headerOptions?: HeaderOptions;
  authOptions?: AuthOptions;
  hideImprint?: boolean;
  hidePrivacyPolicy?: boolean;
  navbarOptions?: NavbarOptions;
  hideNavbar?: boolean;
}

export const UILayer = (props: Props) => {
  const {hasAuthenticated} = useDefaultSelector((state) => state.auth);
  const routerModule = useModule(MandatoryModuleNames.Router);

  const [, setCookie] = useCookies([ACCEPTED_COOKIES_NAME]);

  const disableLogin = !!props.disableLogin;

  const AuthenticationView = props.authenticationView
    ? props.authenticationView
    : BasicAuthenticationView;

  // If the login is disabled, the user should not be able to log out.
  const userMenuOptions = {...props.userMenuOptions};
  if (props.disableLogin) {
    userMenuOptions.hideLogoutButton = true;
  }

  useEffect(() => {
    if (props.disableCookieBanner) {
      setAcceptCookies(setCookie);
    }
  }, [props.disableCookieBanner, setCookie]);

  const routes = [
    {
      path: "/login",
      disabled: disableLogin,
      element: (
        <AuthenticationView
          authOptions={props.authOptions}
          hideLanguageSelection={
            props.settingsMenuOptions?.hideLanguageSelection
          }
          headerOptions={props.headerOptions}
          hideImprint={props.hideImprint}
          hidePrivacyPolicy={props.hidePrivacyPolicy}
        />
      ),
    },
    {
      path: "/imprint",
      disabled: false,
      element: props.imprintComponent ? (
        <props.imprintComponent />
      ) : (
        <DefaultLegalDocument legalTextComponent={ImprintText} />
      ),
    },
    {
      path: "/privacy-policy",
      disabled: false,
      element: props.privacyPolicyComponent ? (
        <props.privacyPolicyComponent />
      ) : (
        <DefaultLegalDocument legalTextComponent={PrivacyPolicyText} />
      ),
    },
    // Maybe include !props.disableLogin && !hasAuthenticated with <Route path="/*" element={<></>} />
    {
      path: "/*",
      disabled: !disableLogin && !hasAuthenticated,
      element: (
        <MainView
          headerOptions={props.headerOptions}
          settingsMenuOptions={props.settingsMenuOptions}
          userMenuOptions={userMenuOptions}
          documentsLabelKey={props.documentsLabelKey}
          imprintComponent={props.imprintComponent}
          privacyPolicyComponent={props.privacyPolicyComponent}
          tabAndContentWrappers={props.tabAndContentWrappers}
          hideImprint={props.hideImprint}
          hidePrivacyPolicy={props.hidePrivacyPolicy}
          hideNavbar={props.hideNavbar}
        />
      ),
    },
  ];

  const UILayerRouter = routerModule.UiLayerRouter;

  return (
    <NavbarSettingsProvider
      staticCollapsedState={props.navbarOptions?.staticCollapsedState}
    >
      {!props.disableCookieBanner && <CookieBanner />}

      {
        <UILayerRouter
          routes={routes}
          disableLogin={disableLogin}
          initialPath={props.initialPath}
        />
      }
    </NavbarSettingsProvider>
  );
};

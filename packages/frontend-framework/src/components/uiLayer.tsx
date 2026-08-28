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
import {useDefaultSelector} from "@iavofficial/frontend-framework-shared/moduleDefaults";
import {useModule} from "@iavofficial/frontend-framework-shared/moduleContext";
import {MandatoryModuleNames} from "@iavofficial/frontend-framework-shared/moduleNames";
import {AuthenticationViewProps} from "@iavofficial/frontend-framework-shared/authenticationViewProps";
import {NavbarOptions} from "../types/navbarSettingsTypes";
import {SettingsMenuOptions} from "@iavofficial/frontend-framework-shared/settingsMenu";
import {HeaderOptions} from "@iavofficial/frontend-framework-shared/headerModuleInterfaces";
import {UserMenuOptions} from "./header/userMenu";
import {LegalDocument} from "./imprint/legalDocument";
import {BasicAuthenticationView} from "./authentication/default/basicAuthenticationView";
import {MainView} from "./mainView";
import "./uiLayer.css";
import "../css/fonts.css";
import "../css/darkModeInputsWorkAround.css";
import "../css/constants.css";
import "../css/globalChangesOnPrimeReactComponents.css";
import "../css/globalSettings.css";
import "../css/globalColors.css";
import "@iavofficial/frontend-framework-shared/css/authenticationView.css";
import {TabAndContentWrapper} from "@iavofficial/frontend-framework-shared/typesWrappers";
import {useRemoveKnownCookies} from "@iavofficial/frontend-framework-shared/cookieHooks";

export interface AuthOptions {
  backgroundImage?: string;
  companyText?: string;
  preventDarkmode?: boolean;
  errorMessages?: {passwordErrorMessage?: string};
}

export interface Props {
  // This indicates that the passed objects should have the type's properties at least.
  tabAndContentWrappers: TabAndContentWrapper[];
  initialPath: string;
  disableLogin?: boolean;
  disableCookieBanner?: boolean;
  authenticationView?: React.ComponentType<AuthenticationViewProps & any>;
  legalDocuments?: LegalDocument[];
  settingsMenuOptions?: SettingsMenuOptions;
  userMenuOptions?: UserMenuOptions;
  headerOptions?: HeaderOptions;
  authOptions?: AuthOptions;
  hideNavbar?: boolean;
  navbarOptions?: NavbarOptions;
}

export const UILayer: React.FC<Props> = (props) => {
  const {hasAuthenticated} = useDefaultSelector((s) => s.auth);
  const routerModule = useModule(MandatoryModuleNames.Router);
  const uiModule = useModule(MandatoryModuleNames.UI);

  const UILayerRouter = routerModule.UiLayerRouter;
  const UILayerCookieBanner = uiModule.UILayerCookieBanner;

  const removeKnownCookies = useRemoveKnownCookies();

  const disableLogin = !!props.disableLogin;
  const AuthenticationView =
    props.authenticationView ?? BasicAuthenticationView;

  const userMenuOptions = {...props.userMenuOptions};
  if (props.disableLogin) userMenuOptions.hideLogoutButton = true;

  useEffect(() => {
    if (props.disableCookieBanner) {
      removeKnownCookies({path: "/"});
    }
  }, [props.disableCookieBanner, removeKnownCookies]);

  const dynamicRoutes =
    props.legalDocuments?.map((doc) => ({
      path: doc.path,
      disabled: doc.isHidden ?? false,
      element: <doc.component />,
    })) || [];

  const fixedRoutes = [
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
          legalDocuments={props.legalDocuments}
        />
      ),
    },
    {
      path: "/*",
      disabled: !disableLogin && !hasAuthenticated,
      element: (
        <MainView
          headerOptions={props.headerOptions}
          settingsMenuOptions={props.settingsMenuOptions}
          userMenuOptions={userMenuOptions}
          legalDocuments={props.legalDocuments}
          tabAndContentWrappers={props.tabAndContentWrappers}
          hideNavbar={props.hideNavbar}
          navbarOptions={props.navbarOptions}
        />
      ),
    },
  ];

  const routes = [...dynamicRoutes, ...fixedRoutes];
  const legalDocumentsPaths = (props.legalDocuments ?? []).map((d) => d.path);

  return (
    <>
      {!props.disableCookieBanner && UILayerCookieBanner && (
        <UILayerCookieBanner />
      )}

      {UILayerRouter ? (
        <UILayerRouter
          routes={routes}
          disableLogin={disableLogin}
          initialPath={props.initialPath}
          legalDocumentsPaths={legalDocumentsPaths}
        />
      ) : (
        <MainView
          headerOptions={props.headerOptions}
          settingsMenuOptions={props.settingsMenuOptions}
          userMenuOptions={userMenuOptions}
          legalDocuments={props.legalDocuments}
          tabAndContentWrappers={props.tabAndContentWrappers}
          hideNavbar={props.hideNavbar}
          navbarOptions={props.navbarOptions}
        />
      )}
    </>
  );
};

/**
 * Copyright © 2025 IAV GmbH Ingenieurgesellschaft Auto und Verkehr,
 * All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */

import "primeflex/primeflex.css";
import "primereact/resources/themes/nova/theme.css";
import "primereact/resources/primereact.css";
import "primeicons/primeicons.css";
import React, {useEffect} from "react";
import {useCookies} from "react-cookie";
import {setAcceptCookies} from "@iavofficial/frontend-framework-shared/setAcceptCookies";
import {ACCEPTED_COOKIES_NAME} from "@iavofficial/frontend-framework-shared/constants";
import {useDefaultSelector} from "@iavofficial/frontend-framework-shared/moduleDefaults";
import {useModule} from "@iavofficial/frontend-framework-shared/moduleContext";
import {MandatoryModuleNames} from "@iavofficial/frontend-framework-shared/moduleNames";
import {NavbarSettingsProvider} from "../contexts/providers/navbarSettingsProvider";
import {AuthenticationViewProps} from "@iavofficial/frontend-framework-shared/authenticationViewProps";
import {StaticCollapsedState} from "../types/navbarSettingsTypes";
import {SettingsMenuOptions} from "./header/settingsMenu";
import {HeaderOptions} from "./header/header";
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
import {TabAndContentWrapper} from "./navbar/wrappers/typesWrappers";
import {UIModule} from "@iavofficial/frontend-framework-shared/dist/types/modules/ui/uiModuleInterfaces";

export interface AuthOptions {
  backgroundImage?: string;
  companyText?: string;
  preventDarkmode?: boolean;
  errorMessages?: {passwordErrorMessage?: string};
}

export interface NavbarOptions {
  staticCollapsedState?: StaticCollapsedState;
}

export interface Props {
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
  navbarOptions?: NavbarOptions;
  hideNavbar?: boolean;
  uiComponents?: UIModule;
}

export const UILayer: React.FC<Props> = (props) => {
  const {hasAuthenticated} = useDefaultSelector((s) => s.auth);
  const routerModule = useModule(MandatoryModuleNames.Router);
  const uiModule = useModule(MandatoryModuleNames.UI);

  const UILayerRouter = routerModule.UiLayerRouter;

  const UILayerCookieBanner = uiModule.UILayerCookieBanner;

  const [, setCookie] = useCookies([ACCEPTED_COOKIES_NAME]);

  const disableLogin = !!props.disableLogin;
  const AuthenticationView =
    props.authenticationView ?? BasicAuthenticationView;

  const userMenuOptions = {...props.userMenuOptions};
  if (props.disableLogin) userMenuOptions.hideLogoutButton = true;

  useEffect(() => {
    if (props.disableCookieBanner) setAcceptCookies(setCookie);
  }, [props.disableCookieBanner, setCookie]);

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
          uiComponents={props.uiComponents}
        />
      ),
    },
  ];

  const routes = [...dynamicRoutes, ...fixedRoutes];
  const legalDocumentsPaths = (props.legalDocuments ?? []).map((d) => d.path);

  return (
    <NavbarSettingsProvider
      staticCollapsedState={props.navbarOptions?.staticCollapsedState}
    >
      {!props.disableCookieBanner && UILayerCookieBanner && (
        <UILayerCookieBanner
          uiComponent={props.uiComponents?.UILayerCookieBanner}
        />
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
          uiComponents={props.uiComponents}
        />
      )}
    </NavbarSettingsProvider>
  );
};

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
 **/

import { Route, Routes } from "react-router-dom";
import React from "react";
import PageNavigation from "../../common/drawer/pageNavigation.tsx";
import Overview from "./pages/overview.tsx";
import Information from "./pages/information.tsx";
import InstallationGuide from "./pages/installationGuide.tsx";
import Interface from "./pages/interface.tsx";
import GlobalDataLayer from "./pages/globalDataLayer.tsx";
import UILayer from "./pages/uiLayer.tsx";
import ContentArea from "./pages/contentArea.tsx";
import ColorSettings from "./pages/colorSettings.tsx";
import DevProject from "./pages/devProject.tsx";
import FAQ from "./pages/faq.tsx";
import { DummyAuthenticator } from "./pages/dummyAuthenticator.tsx";
import { AwsAuthenticator } from "./pages/awsAuthenticator.tsx";
import { ReactRouterRouter } from "./pages/reactRouterRouter.tsx";
import { GroupRoute, PathRoute } from "../../common/page/pathRoute.ts";
import NavigationRoute from "../../common/drawer/navigationRoute.tsx";
import { ModulesInDepth } from "./pages/modulesInDepth.tsx";
import GeneralAuthModule from "./pages/generalAuthModule.tsx";
import { GeneralRouterModule } from "./pages/generalRouterModule.tsx";
import NavGroupRoute from "../../common/drawer/navGroupRoute.tsx";

const routes: PathRoute[] = [
  { path: "overview", label: "Quick Overview", element: <Overview /> },
  {
    path: "information",
    label: "01 - Important Information",
    element: <Information />,
  },
  {
    path: "installation-guide",
    label: "02 - Installation",
    element: <InstallationGuide />,
  },
  { path: "interface", label: "03 - Interface", element: <Interface /> },
  {
    path: "globaldatalayer",
    label: "04 - GlobalDataLayer",
    element: <GlobalDataLayer />,
  },
  { path: "uilayer", label: "05 - UILayer", element: <UILayer /> },
  {
    path: "content-area",
    label: "06 - Content Area",
    element: <ContentArea />,
  },
  {
    path: "color-settings-and-dark-mode",
    label: "07 - Color Settings and Dark Mode",
    element: <ColorSettings />,
  },
  {
    path: "modules-in-depth",
    label: "08 - Modules in depth",
    element: <ModulesInDepth />,
  },
  {
    path: "dev-project",
    label: "09 - Development Project",
    element: <DevProject />,
  },
];

const modulesRoutes: GroupRoute[] = [
  {
    title: "Auth",
    routes: [
      {
        path: "general-auth-module",
        label: "General authentication module",
        element: <GeneralAuthModule />,
      },
      {
        path: "dummy-authenticator",
        label: "DummyAuthenticator",
        element: <DummyAuthenticator />,
      },
      {
        path: "aws-authenticator",
        label: "AwsAuthenticator",
        element: <AwsAuthenticator />,
      },
    ],
  },
  {
    title: "router",
    routes: [
      {
        path: "general-router-module",
        label: "General router module",
        element: <GeneralRouterModule />,
      },
      {
        path: "react-router-router",
        label: "ReactRouterRouter",
        element: <ReactRouterRouter />,
      },
    ],
  },
];

const helpRoutes: PathRoute[] = [
  { path: "faq", label: "FAQ", element: <FAQ /> },
];

const Version2_0_0 = () => {
  const allModuleRoutes: PathRoute[] = [];
  modulesRoutes.forEach((moduleType: GroupRoute) => {
    moduleType.routes.forEach((route) => allModuleRoutes.push(route));
  });

  return (
    <>
      <PageNavigation>
        <NavigationRoute routes={routes} />
        <h3>Need help?</h3>
        <NavigationRoute routes={helpRoutes} />
        <h3 style={{ marginTop: "30px" }}>Modules</h3>
        <NavGroupRoute groups={modulesRoutes} />
      </PageNavigation>
      <Routes>
        {[...routes, ...allModuleRoutes].map(({ path, element }) => (
          <Route key={path} path={path} element={element} />
        ))}
        {helpRoutes.map(({ path, element }) => (
          <Route key={path} path={path} element={element} />
        ))}
      </Routes>
    </>
  );
};

export default Version2_0_0;

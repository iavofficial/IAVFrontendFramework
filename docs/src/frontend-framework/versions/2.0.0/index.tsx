import { Route, Routes } from "react-router-dom";
import React, { ReactElement } from "react";
import Overview from "./pages/overview.tsx";
import Information from "./pages/information.tsx";
import InstallationGuide from "./pages/installationGuide.tsx";
import Interface from "./pages/interface.tsx";
import GlobalDataLayer from "./pages/globalDataLayer.tsx";
import UILayer from "./pages/uiLayer.tsx";
import ContentArea from "./pages/contentArea.tsx";
import ColorSettings from "./pages/colorSettings.tsx";
import DevProject from "./pages/devProject.tsx";
import Playground from "./pages/playground.tsx";
import FAQ from "./pages/faq.tsx";
import PageNavigation from "../../common/drawer/pageNavigation.tsx";
import NavLinkItem from "../../common/drawer/drawerLink.tsx";
import { ModulesInDepth } from "./pages/modulesInDepth.tsx";
import { DummyAuthenticator } from "./pages/dummyAuthenticator.tsx";
import { RouteDefinition } from "../../common/page/routeDefinition.ts";
import { GeneralAuthModule } from "./pages/generalAuthModule.tsx";
import { AwsAuthenticator } from "./pages/awsAuthenticator.tsx";

const routes : RouteDefinition[] = [
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
  }
];

const modulesRoutes = {
  auth: {
    title: "auth",
    modules: [
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
};

const helpRoutes = [{ path: "faq", label: "FAQ", element: <FAQ /> }];

const Version2_0_0 = () => {
  let allModuleRoutes: RouteDefinition[] = [];
  Object.values(modulesRoutes).forEach((entry) => {
    console.log(entry.modules);
    allModuleRoutes = [...allModuleRoutes, ...entry.modules];
  });

  return (
    <>
      <PageNavigation>
        <ul>
          {routes.map(({ path, label }) => (
            <NavLinkItem to={path} label={label} key={path} />
          ))}
        </ul>
        <h3>Need help?</h3>
        <ul>
          {helpRoutes.map(({ path, label }) => (
            <NavLinkItem to={path} label={label} key={path} />
          ))}
        </ul>
        <h3 style={{ marginTop: "30px" }}>Modules</h3>
        <ul>
          {Object.entries(modulesRoutes).map(([key, moduleType]) => {
            let elements: ReactElement[] = [];
            elements.push(<h4 key={key}>{moduleType.title}</h4>);
            moduleType.modules.forEach((module) => {
              elements.push(
                <NavLinkItem
                  to={module.path}
                  label={module.label}
                  key={module.path}
                />
              );
            });
            return elements;
          })}
        </ul>
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

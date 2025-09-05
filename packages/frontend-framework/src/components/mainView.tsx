/**
 * Copyright © 2025 IAV GmbH Ingenieurgesellschaft Auto und Verkehr, All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */

import React, {useContext, useMemo} from "react";
import {ColorSettingsContext} from "@iavofficial/frontend-framework-shared/colorSettingsContext";
import {useModule} from "@iavofficial/frontend-framework-shared/moduleContext";
import {MandatoryModuleNames} from "@iavofficial/frontend-framework-shared/moduleNames";
import {BasicRoute} from "@iavofficial/frontend-framework-shared/routerModule";
import {HeaderOptions} from "./header/header";
import {SettingsMenuOptions} from "./header/settingsMenu";
import {UserMenuOptions} from "./header/userMenu";
import {TabAndContentWrapper} from "./navbar/wrappers/typesWrappers";
import {LegalDocument} from "./imprint/legalDocument";
import If from "./helper/If";
import {UIComponentOverrides} from "./uiLayer";

interface MainViewProps {
  tabAndContentWrappers: TabAndContentWrapper[];
  legalDocuments?: LegalDocument[];
  headerOptions?: HeaderOptions;
  settingsMenuOptions?: SettingsMenuOptions;
  userMenuOptions?: UserMenuOptions;
  hideNavbar?: boolean;
  uiComponents?: UIComponentOverrides;
}

export const MainView: React.FC<MainViewProps> = (props) => {
  const colorSettingsContext = useContext(ColorSettingsContext);
  const routerModule = useModule(MandatoryModuleNames.Router);
  const ui = useModule(MandatoryModuleNames.UI);

  const DefaultHeader = (ui as any)?.UILayerHeader;
  const DefaultNavbar = (ui as any)?.UILayerNavbar;

  const Header = props.uiComponents?.Header ?? DefaultHeader;
  const Navbar = props.uiComponents?.Navbar ?? DefaultNavbar;

  const contentAreaBackground =
    colorSettingsContext.currentColors.contentArea.backgroundColor;

  const staticRoutes: BasicRoute[] = useMemo(
    () =>
      props.legalDocuments?.map((doc) => ({
        path: doc.path,
        element: <doc.component />,
      })) || [],
    [props.legalDocuments],
  );

  const tabRoutes = useMemo(() => {
    let routes: BasicRoute[] = [];
    props.tabAndContentWrappers.forEach((w) => {
      routes = [...routes, ...w.getRoutes()];
    });
    return routes;
  }, [props.tabAndContentWrappers]);

  const MainViewRouter =
    (routerModule as any)?.MainViewRouter ??
    (routerModule as any)?.ContentRouter;

  return (
    <div style={{display: "flex", flexDirection: "column", height: "100%"}}>
      <div style={{flex: "0 0 auto"}}>
        {Header && (
          <Header
            headerOptions={props.headerOptions}
            settingsMenuOptions={props.settingsMenuOptions}
            userMenuOptions={props.userMenuOptions}
          />
        )}
      </div>

      <div
        style={{
          display: "flex",
          flex: "1 1 auto",
          overflow: "auto",
          backgroundColor: contentAreaBackground,
        }}
      >
        <If condition={!props.hideNavbar && !!Navbar}>
          {Navbar && (
            <Navbar
              tabAndContentWrappers={props.tabAndContentWrappers}
              legalDocuments={props.legalDocuments}
            />
          )}
        </If>

        {MainViewRouter && (
          <MainViewRouter routes={[...staticRoutes, ...tabRoutes]} />
        )}
      </div>
    </div>
  );
};

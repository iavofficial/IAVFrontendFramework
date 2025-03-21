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

import React, {useContext, useMemo} from "react";
import {Header, HeaderOptions} from "./header/header";
import {Navbar} from "./navbar/navbar";
import {DefaultLegalDocument} from "./imprint/defaultLegalDocument";
import {ImprintText} from "./imprint/imprintText";
import {PrivacyPolicyText} from "./imprint/privacyPolicyText";
import {SettingsMenuOptions} from "./header/settingsMenu";
import {TabAndContentWrapper} from "./navbar/wrappers/typesWrappers";
import {UserMenuOptions} from "./header/userMenu";
import If from "./helper/If";
import {ColorSettingsContext} from "@iavofficial/frontend-framework-shared/colorSettingsContext";
import {useModule} from "@iavofficial/frontend-framework-shared/moduleContext";
import {MandatoryModuleNames} from "@iavofficial/frontend-framework-shared/moduleNames";
import {BasicRoute} from "@iavofficial/frontend-framework-shared/routerModule";

interface MainViewProps {
  tabAndContentWrappers: TabAndContentWrapper[];
  imprintComponent?: React.ComponentType<any>;
  privacyPolicyComponent?: React.ComponentType<any>;
  documentsLabelKey?: string;
  hideImprint?: boolean;
  hidePrivacyPolicy?: boolean;
  headerOptions?: HeaderOptions;
  settingsMenuOptions?: SettingsMenuOptions;
  userMenuOptions?: UserMenuOptions;
  hideNavbar?: boolean;
}

export const MainView = (props: MainViewProps) => {
  const colorSettingsContext = useContext(ColorSettingsContext);
  const routerModule = useModule(MandatoryModuleNames.Router);

  const contentAreaBackground =
    colorSettingsContext.currentColors.contentArea.backgroundColor;

  const staticRoutes: BasicRoute[] = useMemo(
    () => [
      {
        path: "/imprint",
        element: props.imprintComponent ? (
          <props.imprintComponent />
        ) : (
          <DefaultLegalDocument legalTextComponent={ImprintText} />
        ),
      },
      {
        path: "/privacy-policy",
        element: props.privacyPolicyComponent ? (
          <props.privacyPolicyComponent />
        ) : (
          <DefaultLegalDocument legalTextComponent={PrivacyPolicyText} />
        ),
      },
    ],
    [],
  );

  const tabRoutes = useMemo(() => {
    let tabRoutes: BasicRoute[] = [];
    props.tabAndContentWrappers.forEach((wrapper) => {
      tabRoutes = [...tabRoutes, ...wrapper.getRoutes()];
    });
    return tabRoutes;
  }, [props.tabAndContentWrappers]);

  const MainViewRouter = routerModule.MainViewRouter;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        bottom: "0",
      }}
    >
      <div style={{flex: "0 0 auto"}}>
        <Header
          headerOptions={props.headerOptions}
          settingsMenuOptions={props.settingsMenuOptions}
          userMenuOptions={props.userMenuOptions}
        />
      </div>
      <div
        style={{
          display: "flex",
          flex: "1 1 auto",
          overflow: "auto",
          backgroundColor: contentAreaBackground,
        }}
      >
        <If condition={!props.hideNavbar}>
          <Navbar
            tabAndContentWrappers={props.tabAndContentWrappers}
            documentsLabelKey={props.documentsLabelKey}
            hideImprint={props.hideImprint}
            hidePrivacyPolicy={props.hidePrivacyPolicy}
          />
        </If>
        {<MainViewRouter routes={[...staticRoutes, ...tabRoutes]} />}
      </div>
    </div>
  );
};

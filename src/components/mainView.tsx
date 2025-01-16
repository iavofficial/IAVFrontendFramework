/**
 * Copyright © 2024 IAV GmbH Ingenieurgesellschaft Auto und Verkehr, All Rights Reserved.
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

import React from "react";
import {Header, HeaderOptions} from "./header/header";
import {Navbar} from "./navbar/navbar";
import {DefaultImprint} from "./imprint/defaultImprint";
import {SettingsMenuOptions} from "./header/settingsMenu";
import {Outlet, Route, Routes} from "react-router-dom";
import {TabAndContentWrapper} from "./navbar/wrappers/typesWrappers";
import {UserMenuOptions} from "./header/userMenu";

interface MainViewProps {
  tabAndContentWrappers: TabAndContentWrapper[];
  documentsComponent?: React.ComponentType<any>;
  documentsLabelKey?: string;
  hideLegalDocuments?: boolean;
  headerOptions?: HeaderOptions;
  settingsMenuOptions?: SettingsMenuOptions;
  userMenuOptions?: UserMenuOptions;
}

export const MainView = (props: MainViewProps) => {
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
      <div style={{display: "flex", flex: "1 1 auto", overflow: "auto"}}>
        <Navbar
          tabAndContentWrappers={props.tabAndContentWrappers}
          documentsLabelKey={props.documentsLabelKey}
          hideLegalDocuments={props.hideLegalDocuments}
        />
        <Outlet />
        <Routes>
          {props.tabAndContentWrappers.map((wrapper) => wrapper.getRoutes())}

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
        </Routes>
      </div>
    </div>
  );
};

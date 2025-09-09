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

import {FFStoreModule} from "../generalModule";
import React from "react";
import {MandatoryModuleNames} from "../../../constants/moduleNames";

import {UIHeaderProps} from "./header/headerModuleInterfaces";
import {UINavbarProps} from "./navbar/navbarModuleInterfaces";
import {UICookieBannerProps} from "./cookieBanner/cookieBannerModuleInterfaces";
import {UIContentWithBarProps} from "./contentWithBar/contentWIthBarModuleInterfaces";
import {NavbarOrchestratorProps} from "../../../modules/default_modules/ui/navbar/navbarOrchestrator";
import {ContentWithBarOrchestratorProps} from "../../../modules/default_modules/ui/contentWithBar/contentWithBarOrchestrator";

export type UIState = {
  navbarCollapsed: boolean;
  collapsible: boolean;
};

export type UIStoreState = {
  [MandatoryModuleNames.UI]: UIState;
};

export type UIExtras = {
  setNavbarCollapsed: (payload: boolean) => {type: string; payload: boolean};
  toggleNavbar: () => {type: string};
  setCollapsible: (payload: boolean) => {type: string; payload: boolean};
};

export type UIModule<TState extends UIState = UIState> = {
  UILayerHeader: React.ComponentType<
    UIHeaderProps & {uiComponent?: React.ComponentType<UIHeaderProps>}
  >;
  UILayerContentWithBar: React.ComponentType<
    ContentWithBarOrchestratorProps & {
      uiComponent?: React.ComponentType<UIContentWithBarProps>;
    }
  >;
  UILayerCookieBanner: React.ComponentType<{
    uiComponent?: React.ComponentType<UICookieBannerProps>;
  }>;
  UILayerNavbar: React.ComponentType<
    NavbarOrchestratorProps & {uiComponent?: React.ComponentType<UINavbarProps>}
  >;
  extras: UIExtras;
} & FFStoreModule<TState>;

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
import {NavbarOrchestratorProps} from "../../../modules/default_modules/ui/navbar/navbarOrchestrator";
import {ContentBarOrchestratorProps} from "../../../modules/default_modules/ui/contentBar/contentBarOrchestrator";
import {UIContentBarProps} from "./contentBar/contentBarModuleInterfaces";
import { CaseReducer, PayloadAction, Slice } from "@reduxjs/toolkit";

export type UIState = {
  navbarCollapsed: boolean;
  collapsible: boolean;
};

export type UIStoreState = {
  [MandatoryModuleNames.UI]: UIState;
};

export type UIReducers<TState extends UIState = UIState> = {
  toggleNavbar: CaseReducer<TState>;
  setNavbarCollapsed: CaseReducer<TState, PayloadAction<boolean>>;
  setCollapsible: CaseReducer<TState, PayloadAction<boolean>>;
};

export type UIModuleType<TState extends UIState = UIState> = {
  UILayerHeader: React.ComponentType<
    UIHeaderProps & {uiComponent?: React.ComponentType<UIHeaderProps>}
  >;
  UILayerContentBar: React.ComponentType<
    ContentBarOrchestratorProps & {
      uiComponent?: React.ComponentType<UIContentBarProps>;
    }
  >;
  UILayerCookieBanner: React.ComponentType<{
    uiComponent?: React.ComponentType<UICookieBannerProps>;
  }>;
  UILayerNavbar: React.ComponentType<
    NavbarOrchestratorProps & {uiComponent?: React.ComponentType<UINavbarProps>}
  >;
} &
FFStoreModule<TState, UIReducers<TState>>;
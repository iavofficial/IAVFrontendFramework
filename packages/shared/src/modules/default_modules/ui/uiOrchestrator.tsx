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

import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {UIHeaderProps} from "../../../types/modules/ui/header/headerModuleInterfaces";
import {
  ContentWithBarOrchestrator,
  ContentWithBarOrchestratorProps,
} from "./contentWithBar/contentWithBarOrchestrator";
import {HeaderOrchestrator} from "./header/headerOrchestrator";
import {CookieBannerOrchestrator} from "./cookiebanner/cookieBannerOrchestrator";
import {
  NavbarOrchestrator,
  NavbarOrchestratorProps,
} from "./navbar/navbarOrchestrator";
import {
  UIExtras,
  UIModule,
  UIState,
} from "../../../types/modules/ui/uiModuleInterfaces";
import {MandatoryModuleNames} from "../../../constants/moduleNames";
import {UINavbarProps} from "../../../types/modules/ui/navbar/navbarModuleInterfaces";
import {UICookieBannerProps} from "../../../types/modules/ui/cookieBanner/cookieBannerModuleInterfaces";
import {UIContentWithBarProps} from "../../../types/modules/ui/contentWithBar/contentWIthBarModuleInterfaces";
import React from "react";

export type UIOverrides = {
  Header?: React.ComponentType<UIHeaderProps>;
  ContentWithBar?: React.ComponentType<UIContentWithBarProps>;
  CookieBanner?: React.ComponentType<UICookieBannerProps>;
  Navbar?: React.ComponentType<UINavbarProps>;
};

const LOCALSTORAGE_KEY = "navbarCollapsed";

const getInitialNavbarCollapsed = (): boolean => {
  try {
    const value = localStorage.getItem(LOCALSTORAGE_KEY);
    return value ? JSON.parse(value) : false;
  } catch {
    return false;
  }
};

const initialState: UIState = {
  navbarCollapsed: getInitialNavbarCollapsed(),
  collapsible: true,
};

export class UIOrchestrator implements UIModule<UIState> {
  public id = "ui-orchestrator";
  public name = "UI Orchestrator";

  public slice;
  public middleware = [];
  public enhancers = [];
  public useModuleLifecycle;

  public UILayerHeader: React.ComponentType<
    UIHeaderProps & {uiComponent?: React.ComponentType<UIHeaderProps>}
  >;
  public UILayerContentWithBar: React.ComponentType<
    ContentWithBarOrchestratorProps & {
      uiComponent?: React.ComponentType<UIContentWithBarProps>;
    }
  >;
  public UILayerCookieBanner: React.ComponentType<{
    uiComponent?: React.ComponentType<UICookieBannerProps>;
  }>;
  public UILayerNavbar: React.ComponentType<
    NavbarOrchestratorProps & {uiComponent?: React.ComponentType<UINavbarProps>}
  >;

  public extras: UIExtras;

  constructor(overrides?: UIOverrides) {
    this.slice = createSlice({
      name: MandatoryModuleNames.UI,
      initialState,
      reducers: {
        setNavbarCollapsed: (state, action: PayloadAction<boolean>) => {
          state.navbarCollapsed = action.payload;
          localStorage.setItem(
            LOCALSTORAGE_KEY,
            JSON.stringify(state.navbarCollapsed),
          );
        },
        toggleNavbar: (state) => {
          if (state.collapsible) {
            state.navbarCollapsed = !state.navbarCollapsed;
            localStorage.setItem(
              LOCALSTORAGE_KEY,
              JSON.stringify(state.navbarCollapsed),
            );
          }
        },
        setCollapsible: (state, action: PayloadAction<boolean>) => {
          state.collapsible = action.payload;
        },
      },
    });

    const {setNavbarCollapsed, toggleNavbar, setCollapsible} =
      this.slice.actions;
    this.extras = {setNavbarCollapsed, toggleNavbar, setCollapsible};

    this.UILayerHeader = (p) => (
      <HeaderOrchestrator
        uiComponent={p.uiComponent ?? overrides?.Header}
        {...p}
      />
    );

    this.UILayerContentWithBar = (p) => (
      <ContentWithBarOrchestrator
        uiComponent={p.uiComponent ?? overrides?.ContentWithBar}
        {...p}
      />
    );

    this.UILayerCookieBanner = (p) => (
      <CookieBannerOrchestrator
        uiComponent={p.uiComponent ?? overrides?.CookieBanner}
      />
    );

    this.UILayerNavbar = (p) => (
      <NavbarOrchestrator
        uiComponent={p.uiComponent ?? overrides?.Navbar}
        {...p}
      />
    );

    this.useModuleLifecycle = () => ({renderChildren: true});
  }
}

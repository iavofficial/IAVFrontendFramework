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

import React from "react";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {MandatoryModuleNames} from "../../../constants/moduleNames";
import {UIHeaderProps} from "../../../types/modules/ui/header/headerModuleInterfaces";
import {UICookieBannerProps} from "../../../types/modules/ui/cookieBanner/cookieBannerModuleInterfaces";
import {UINavbarProps} from "../../../types/modules/ui/navbar/navbarModuleInterfaces";
import type {
  UIModuleType,
  UIState,
} from "../../../types/modules/ui/uiModuleInterfaces";
import {HeaderOrchestrator} from "./header/headerOrchestrator";
import {
  NavbarOrchestrator,
  NavbarOrchestratorProps,
} from "./navbar/navbarOrchestrator";
import {UIContentBarProps} from "../../../types/modules/ui/contentBar/contentBarModuleInterfaces";
import {
  ContentBarOrchestrator,
  ContentBarOrchestratorProps,
} from "./contentBar/contentBarOrchestrator";
import {CookieBannerOrchestrator} from "./cookiebanner/cookieBannerOrchestrator";

type UIParams = {
  UILayerHeader?: (props: UIHeaderProps) => React.ReactNode;
  UILayerContentBar?: (props: UIContentBarProps) => React.ReactNode;
  UILayerCookieBanner?: (props: UICookieBannerProps) => React.ReactNode;
  UILayerNavbar?: (props: UINavbarProps) => React.ReactNode;
  staticCollapsedState?: StaticCollapsedState;
};

export enum StaticCollapsedState {
  Collapsed,
  Unfolded,
}

const KEY = "navbarCollapsed";
const safeGet = () => {
  try {
    const v = localStorage.getItem(KEY);
    return v ? JSON.parse(v) : false;
  } catch {
    return false;
  }
};
const safeSet = (val: boolean) => {
  try {
    localStorage.setItem(KEY, JSON.stringify(val));
  } catch {}
};

const calcInitialNavbarCollapsed = (staticCollapsedState?: StaticCollapsedState) => {
      let collapsed = safeGet();

    if (staticCollapsedState !== undefined) {
      if (staticCollapsedState === StaticCollapsedState.Collapsed) {
        collapsed = true;
      }
      if (staticCollapsedState === StaticCollapsedState.Unfolded) {
        collapsed = false;
      }
    }

    return collapsed;
}

const calcInitialState = (staticCollapsedState?: StaticCollapsedState) => {
  return {
    navbarCollapsed: calcInitialNavbarCollapsed(staticCollapsedState),
    collapsible: staticCollapsedState === undefined
  }
};

export class UIModule implements UIModuleType<UIState> {
  public slice;
  public middleware = [];
  public enhancers = [];
  public useModuleLifecycle;
  public UILayerHeader: React.ComponentType<
    UIHeaderProps & {uiComponent?: React.ComponentType<UIHeaderProps>}
  >;
  public UILayerContentBar: React.ComponentType<
    ContentBarOrchestratorProps & {
      uiComponent?: React.ComponentType<UIContentBarProps>;
    }
  >;
  public UILayerCookieBanner: React.ComponentType<{
    uiComponent?: React.ComponentType<UICookieBannerProps>;
  }>;
  public UILayerNavbar: React.ComponentType<
    NavbarOrchestratorProps & {
      uiComponent?: React.ComponentType<UINavbarProps>;
    }
  >;

  constructor(params?: UIParams) {
    const initialState = calcInitialState(params?.staticCollapsedState);
    this.slice = createSlice({
      name: MandatoryModuleNames.UI,
      initialState,
      reducers: {
        setNavbarCollapsed: (state, action: PayloadAction<boolean>) => {
          state.navbarCollapsed = action.payload;
          safeSet(state.navbarCollapsed);
        },
        toggleNavbar: (state) => {
          if (state.collapsible) {
            state.navbarCollapsed = !state.navbarCollapsed;
            safeSet(state.navbarCollapsed);
          }
        },
        setCollapsible: (state, action: PayloadAction<boolean>) => {
          state.collapsible = action.payload;
        },
      },
    });

    this.UILayerHeader = (p) => (
      <HeaderOrchestrator {...p} uiComponent={params?.UILayerHeader} />
    );
    this.UILayerContentBar = (p) => (
      <ContentBarOrchestrator {...p} uiComponent={params?.UILayerContentBar} />
    );
    this.UILayerCookieBanner = (p) => (
      <CookieBannerOrchestrator
        {...p}
        uiComponent={params?.UILayerCookieBanner}
      />
    );
    this.UILayerNavbar = (p) => (
      <NavbarOrchestrator {...p} uiComponent={params?.UILayerNavbar} />
    );

    this.useModuleLifecycle = () => ({renderChildren: true});
  }
}

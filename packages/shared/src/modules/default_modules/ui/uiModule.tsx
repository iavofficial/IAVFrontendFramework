/**
 * Copyright © 2025 IAV GmbH Ingenieurgesellschaft Auto und Verkehr, All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {MandatoryModuleNames} from "../../../constants/moduleNames";
import {UIHeaderProps} from "../../../types/modules/ui/header/headerModuleInterfaces";
import {UICookieBannerProps} from "../../../types/modules/ui/cookieBanner/cookieBannerModuleInterfaces";
import {UINavbarProps} from "../../../types/modules/ui/navbar/navbarModuleInterfaces";
import {
  UIExtras,
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
};

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

const initialState: UIState = {navbarCollapsed: safeGet(), collapsible: true};

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
  public extras: UIExtras;

  constructor(params?: UIParams) {
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

    const {setNavbarCollapsed, toggleNavbar, setCollapsible} =
      this.slice.actions;
    this.extras = {setNavbarCollapsed, toggleNavbar, setCollapsible};

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

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

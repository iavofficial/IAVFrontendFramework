import {FFStoreModule} from "../generalModule";
import React from "react";
import {MandatoryModuleNames} from "../../../constants/moduleNames";

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
  UILayerHeader: React.ComponentType;
  UILayerContentWithBar: React.ComponentType;
  UILayerCookieBanner: React.ComponentType;
  UILayerNavbar: React.ComponentType;
  extras: UIExtras;
} & FFStoreModule<TState>;

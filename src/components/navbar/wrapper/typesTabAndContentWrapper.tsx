import React, { ReactElement } from "react";
import { RouteProps } from "react-router-dom";
import { navbarInjectedOptions } from "../typesNavbar";
import { GroupInjectedOptions } from "../tabs/tabGroup/typesGroupTab";

export interface TabAndContentWrapper {
  getRoutes(): ReactElement<RouteProps>[];
  getNavbarComponent(navbarInjectedOptions: navbarInjectedOptions): ReactElement;
  getKey(): string;
}

export type GroupableTabAndContentWrapper = TabAndContentWrapper & {
  getInsideGroup(): boolean;
  // Allow any return value to allow for feedback if
  // necessary while using the framework and developing custom TabAndContentWrappers.
  setInsideGroup(insideGroup: boolean): any;
  getNavbarComponent(navbarInjectedOptions: navbarInjectedOptions | GroupInjectedOptions): ReactElement;
};
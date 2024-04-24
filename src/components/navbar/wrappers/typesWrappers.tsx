import React, { ReactElement } from "react";
import { RouteProps } from "react-router-dom";
import { InjectedOptionsByNavbarToWrapper } from "../types/typesInjectedOptions";
import { InjectedOptionsByGroupToWrapper } from "../types/typesInjectedOptions";

export interface TabAndContentWrapper {
  getRoutes(): ReactElement<RouteProps>[];
  getNavbarComponent(navbarInjectedOptions: InjectedOptionsByNavbarToWrapper): ReactElement;
  getKey(): string;
}

export type GroupableTabAndContentWrapper = TabAndContentWrapper & {
  getInsideGroup(): boolean;
  // Allow any return value to allow for feedback if
  // necessary while using the framework and developing custom TabAndContentWrappers.
  setInsideGroup(insideGroup: boolean): any;
  getNavbarComponent(navbarInjectedOptions: InjectedOptionsByNavbarToWrapper | InjectedOptionsByGroupToWrapper): ReactElement;
};
import React, { ReactElement } from "react";
import { TranslateFunctionType } from "../../../types/translationFunction";

export interface basicNavbarTabFrameworkInjectedOptions {
  path: string;
  navbarCollapsed: boolean;
}

export type groupableNavbarTabPropsFrameworkInjectedOptions = basicNavbarTabFrameworkInjectedOptions & {
  insideGroup: boolean;
  groupActive: boolean;
};

export interface defaultNavbarTabProps<optionType> {
  name: string | ((t: TranslateFunctionType) => string);
  disabled: boolean;
  frameworkInjectedOptions: optionType;
  icon?: ReactElement;
  collapsed?: boolean;
  active?: boolean;
}

export type navbarTabProps = defaultNavbarTabProps<basicNavbarTabFrameworkInjectedOptions>;

export type groupableNavbarTabProps = defaultNavbarTabProps<groupableNavbarTabPropsFrameworkInjectedOptions>;

export type navbarTab<additional = {}> = React.ComponentType<
  navbarTabProps & additional
>;

export type groupableNavbarTab<additional = {}> = React.ComponentType<
  groupableNavbarTabProps & additional
>;
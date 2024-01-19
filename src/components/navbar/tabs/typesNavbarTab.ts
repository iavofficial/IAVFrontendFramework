import React, { ReactElement } from "react";
import { TranslateFunctionType } from "../../../types/translationFunction";
import { navbarInjectedOptions } from "../typesNavbar";
import { GroupInjectedOptions } from "./tabGroup/typesGroupTab";

export type basicNavbarTabFrameworkInjectedOptions = navbarInjectedOptions & {
  path: string;
};

export type groupableNavbarTabPropsFrameworkInjectedOptions =
  basicNavbarTabFrameworkInjectedOptions &
    GroupInjectedOptions & {
      insideGroup: boolean;
    };

export interface NavbarTabProps<OptionType> {
  name: string | ((t: TranslateFunctionType) => string);
  disabled: boolean;
  frameworkInjectedOptions: OptionType;
  icon?: ReactElement;
  collapsed?: boolean;
  active?: boolean;
}

export type groupableNavbarTab<additional = {}> = React.FunctionComponent<
  NavbarTabProps<groupableNavbarTabPropsFrameworkInjectedOptions> & additional
>;

import React, { ReactElement } from "react";
import { TranslateFunctionType } from "../../../types/translationFunction";
import { InjectedOptionsGroupableByWrapperToTab } from "../types/typesInjectedOptions";

/**
 * This interface contains the properties which have to be passed to a navigation tab.
 * The type of the injected options by the framework can be set as for example the tab
 * can be groupable or not.
 */
export interface NavbarTabProps<OptionType> {
  name: string | ((t: TranslateFunctionType) => string);
  disabled: boolean;
  frameworkInjectedOptions: OptionType;
  icon?: ReactElement;
  collapsed?: boolean;
  active?: boolean;
}

/**
 * This type defines the structure which groupable navbar tab components have to obey.
 */
export type GroupableNavbarTab<additional = {}> = React.FunctionComponent<
  NavbarTabProps<InjectedOptionsGroupableByWrapperToTab> & additional
>;

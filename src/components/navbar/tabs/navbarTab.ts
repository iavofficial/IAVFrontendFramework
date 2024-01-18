import React, { ReactElement } from "react";
import { TranslateFunctionType } from "../../../types/translationFunction";

export interface navbarTabProps {
  name: string | ((t: TranslateFunctionType) => string);
  to: string;
  disabled: boolean;
  icon?: ReactElement;
  collapsed?: boolean;
  active?: boolean;
  navbarCollapsed?: boolean;
}

export type groupableNavbarTabProps = navbarTabProps & {
  insideGroup?: boolean;
  groupActive?: booolean;
};

export type navbarTab<additional = {}> = React.ComponentType<
  navbarTabProps & additional
>;

export type groupableNavbarTab<additional = {}> = React.ComponentType<
  groupableNavbarTabProps & additional
>;

import React, { ReactElement } from 'react';

import { TranslateFunctionType } from '../../../contexts/language';

export interface navbarTabProps {
  name: string | ((t: TranslateFunctionType) => string);
  to: string;
  disabled: boolean;
  selectedIcon: string;
  deselectedIcon: string;
  permittedGroups: string[];
  renderElement: ReactElement;
  active?: boolean;
  colorOptions?: {
    tabTextColor: string;
    tabTextHoverColor: string;
    tabHoverBackground: string;
    tabBackground: string;
  };
}

export interface groupPropsBasicFirstLayer {
  name: string | ((t: TranslateFunctionType) => string);
  selectedIcon: string;
  deselectedIcon: string;
  tabAndContent: (groupPropsBasicFirstLayer | navbarTabProps)[];
}

export interface groupPropsBasicSecondLayer extends groupPropsBasicFirstLayer {
  tabAndContent: navbarTabProps[];
}

export type renderTabTypeFirstLayer =
  | navbarTabProps
  | groupPropsBasicFirstLayer;

export interface NavbarElementsFirstLayer {
  tabOrGroupElement: renderTabTypeFirstLayer;
}

export type NavbarPropsForTabType<additional = {}> = React.ComponentType<
  navbarTabProps & additional
>;

export type NavbarPropsForGroupTypeFirstLayer<additional = {}> =
  React.ComponentType<groupPropsBasicFirstLayer & additional>;

export type NavbarPropsForGroupTypeSecondLayer<additional = {}> =
  React.ComponentType<groupPropsBasicSecondLayer & additional>;

export type NavbarPropsForTabTypeFirstLayer<additional = {}> =
  React.ComponentType<NavbarElementsFirstLayer & additional>;

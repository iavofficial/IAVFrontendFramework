import React, { ReactElement } from 'react';

import { TranslateFunctionType } from '../../../contexts/language';

export interface navbarTabPropsBasic {
  name: string | ((t: TranslateFunctionType) => string);
  to: string;
  renderElement?: ReactElement;
  active?: boolean;
  colorOptions?: {
    tabTextColor: string;
    tabTextHoverColor: string;
    tabHoverBackground: string;
    tabBackground: string;
  };
}

export interface navbarTabPropsSecondLayer extends navbarTabPropsBasic {
  navbarTabsThirdLayer: navbarTabPropsBasic[];
}

export interface navbarTabPropsExtended extends navbarTabPropsBasic {
  disabled: boolean;
  selectedIcon: string;
  deselectedIcon: string;
  permittedGroups: string[];
  navbarTabsSecondLayer: navbarTabPropsSecondLayer[];
}

// export interface navbarTabPropsPrivileged extends navbarTabPropsSimple {
//   permittedGroups: string[];
// }

// export interface navbarTabPropsGeneral {
//   navbarTab: navbarTabPropsPrivileged | navbarTabPropsSimple;
// }

export type NavbarPropsForTabType<additional = {}> = React.ComponentType<
  navbarTabPropsExtended & additional
>;

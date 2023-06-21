import React from 'react';

export interface NavbarSettingsType {
  navbarCollapsed: boolean;
  setNavbarCollapsed: (navbarCollapsed: boolean) => void;
}

export const NavbarSettingsContext = React.createContext<
  NavbarSettingsType | undefined
>(undefined);

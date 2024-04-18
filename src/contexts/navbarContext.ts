import React from "react";

export interface NavbarSettingsType {
  collapsible: boolean;
  navbarCollapsed: boolean;
  setNavbarCollapsed: (navbarCollapsed: boolean) => void;
}

export const NavbarSettingsContext = React.createContext<NavbarSettingsType>(
  {} as NavbarSettingsType
);

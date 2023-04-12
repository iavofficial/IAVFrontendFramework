import React, { useState } from 'react';
import { ColorSettingsContext } from '../contexts/colorsettings';
import { NavbarSettingsContext } from '../contexts/navbarContext';

export const NavbarSettingsProvider = (props: React.PropsWithChildren<{}>) => {
  const [navbarCollapsed, setNavbarCollapsed] = useState(() =>
    localStorage.getItem('navbarCollapsed')
      ? Boolean(JSON.parse(localStorage.getItem('navbarCollapsed') as string))
      : false
  );

  const setNavbarCollapsedToLocalStorage = (navbarCollapsed: boolean) => {
    localStorage.setItem('navbarCollapsed', JSON.stringify(navbarCollapsed));
    setNavbarCollapsed(navbarCollapsed);
  };

  let returnObject = {
    navbarCollapsed: navbarCollapsed,
    setNavbarCollapsed: setNavbarCollapsedToLocalStorage,
  };
  return (
    <NavbarSettingsContext.Provider value={returnObject}>
      {props.children}
    </NavbarSettingsContext.Provider>
  );
};

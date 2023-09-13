import React, { useMemo, useState } from "react";
import { NavbarSettingsContext } from "../contexts/navbarContext";
import { StaticCollapsedState } from "../types/navbarSettingsTypes";

interface Props {
  staticCollapsedState?: StaticCollapsedState;
}

export const NavbarSettingsProvider = (
  props: React.PropsWithChildren<Props>
) => {
  const [navbarCollapsed, setNavbarCollapsed] = useState(() => {
    let state = false;

    if (props.staticCollapsedState !== undefined) {
      if (props.staticCollapsedState === StaticCollapsedState.Collapsed) {
        state = true;
      }
      if (props.staticCollapsedState === StaticCollapsedState.Unfolded) {
        state = false;
      }
    } else {
      const storedState = localStorage.getItem("navbarCollapsed");
      state = storedState ? Boolean(JSON.parse(storedState as string)) : false;
    }

    return state;
  });

  const setNavbarCollapsedToLocalStorage = (navbarCollapsed: boolean) => {
    localStorage.setItem("navbarCollapsed", JSON.stringify(navbarCollapsed));
    setNavbarCollapsed(navbarCollapsed);
  };

  return (
    <NavbarSettingsContext.Provider
      value={{
        collapsible: props.staticCollapsedState === undefined,
        navbarCollapsed: navbarCollapsed,
        setNavbarCollapsed: setNavbarCollapsedToLocalStorage,
      }}
    >
      {props.children}
    </NavbarSettingsContext.Provider>
  );
};

/**
 * Copyright © 2025 IAV GmbH Ingenieurgesellschaft Auto und Verkehr, All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import React, {useState} from "react";
import {NavbarSettingsContext} from "../navbarContext";
import {StaticCollapsedState} from "../../types/navbarSettingsTypes";

interface Props {
  staticCollapsedState?: StaticCollapsedState;
}

export const NavbarSettingsProvider = (
  props: React.PropsWithChildren<Props>,
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

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

import React from "react";
import {ContextMenu} from "primereact/contextmenu";
import {MenuItem} from "./settingsMenu";
import {  useModuleContext } from "@iavofficial/frontend-framework-shared/moduleContext";
import { useDefaultDispatch } from "@iavofficial/frontend-framework-shared/moduleDefaults";
import { MandatoryModuleNames } from "@iavofficial/frontend-framework-shared/mandatoryModuleNames";

export interface Props {
  hideMenu: (e: React.KeyboardEvent) => void;
  userMenuOptions?: UserMenuOptions;
}

export interface UserMenuOptions {
  hideLogoutButton?: boolean;
  additionalItems?: MenuItem[];
}

//eslint-disable-next-line
export const UserMenu = React.forwardRef<ContextMenu, Props>((props, ref) => {
  const {modules} = useModuleContext();

  const dispatch = useDefaultDispatch();

  const basicOptions: MenuItem[] = [];

  if (!props.userMenuOptions?.hideLogoutButton) {
    basicOptions.push({
      label: "Logout",
      icon: "pi pi-sign-out",
      command: () => {
        dispatch(modules[MandatoryModuleNames.Authentication].logout());
      },
    });
  }

  const model = props.userMenuOptions?.additionalItems
    ? [...props.userMenuOptions.additionalItems, ...basicOptions]
    : basicOptions;

  return basicOptions.length > 0 ? (
    <div onKeyDown={(e) => props.hideMenu(e)}>
      <ContextMenu ref={ref} model={model} />
    </div>
  ) : (
    <React.Fragment />
  );
});

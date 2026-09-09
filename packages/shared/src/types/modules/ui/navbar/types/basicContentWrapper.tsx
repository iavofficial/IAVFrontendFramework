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
import {ContentWrapperGeneralization} from "./contentWrapperGeneralization";
import {GroupableTabAndContentWrapper} from "./typesWrappers";
import {ComponentTypeMinProps} from "../../../../util-types/componentTypeMinProps";
import {
  InjectedOptionsByGroupToWrapper,
  InjectedOptionsByNavbarToWrapper,
  InjectedOptionsGroupableByWrapperToTab,
  InjectedOptionsObject,
} from "../../navbar/types/typesInjectedOptions";

export class BasicContentWrapper
  extends ContentWrapperGeneralization
  implements GroupableTabAndContentWrapper
{
  private _insideGroup = false;

  constructor(
    protected _path: string,
    protected _navbarTab: ComponentTypeMinProps<
      InjectedOptionsObject<InjectedOptionsGroupableByWrapperToTab>
    >,
    protected _component: React.ComponentType,
  ) {
    super(_path, _component);
  }

  // As this wrapper can be used inside a group but doesn't have to be located
  // inside a group, it has to take the options of the navbar component and
  // the options of groups.
  getNavbarComponent = (
    navbarInjectedOptions:
      InjectedOptionsByNavbarToWrapper | InjectedOptionsByGroupToWrapper,
  ) => {
    const NavbarElement = this._navbarTab;
    const insideGroup = this.getInsideGroup();
    const groupActive =
      insideGroup && "groupActive" in navbarInjectedOptions
        ? navbarInjectedOptions.groupActive
        : false;
    const groupStyleOptions =
      insideGroup && "groupStyleOptions" in navbarInjectedOptions
        ? navbarInjectedOptions.groupStyleOptions
        : undefined;

    const injectedOptions: InjectedOptionsGroupableByWrapperToTab = {
      insideGroup,
      path: this._path,
      navbarCollapsed: navbarInjectedOptions.navbarCollapsed,
      groupActive,
      groupStyleOptions,
    };

    return (
      <NavbarElement
        key={this.getKey()}
        frameworkInjectedOptions={injectedOptions}
      />
    );
  };

  getInsideGroup = () => {
    return this._insideGroup;
  };

  setInsideGroup = (insideGroup: boolean) => {
    this._insideGroup = insideGroup;
  };
}

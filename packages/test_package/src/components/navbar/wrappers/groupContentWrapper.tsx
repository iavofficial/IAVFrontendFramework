/**
 * Copyright © 2024 IAV GmbH Ingenieurgesellschaft Auto und Verkehr, All Rights Reserved.
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

import React, {ReactElement} from "react";
import {RouteProps} from "react-router-dom";
import {TabGroup} from "../tabs/tabGroup/tabGroup";
import {generateHashForValues} from "../../../utils/hash";
import {TranslateFunctionType} from "../../../types/translationFunction";
import {GroupableTabAndContentWrapper} from "./typesWrappers";
import {
  InjectedOptionsByGroupToWrapper,
  InjectedOptionsByNavbarToWrapper,
} from "../types/typesInjectedOptions";

export class Group implements GroupableTabAndContentWrapper {
  private _insideGroup = false;

  constructor(
    private _name: string | ((t: TranslateFunctionType) => string),
    private _logo: ReactElement,
    private _collapsible: boolean,
    private _contentWrappers: GroupableTabAndContentWrapper[],
  ) {
    _contentWrappers.forEach((contentWrapper) => {
      contentWrapper.setInsideGroup(true);
    });
  }

  // Generate unique key based on the keys of the views.
  getKey = () => {
    return generateHashForValues(
      this._contentWrappers.map((view) => view.getKey()),
    );
  };

  getRoutes = () => {
    const routes: ReactElement<RouteProps>[] = [];
    this._contentWrappers.forEach((view) => {
      view.getRoutes().forEach((route) => {
        routes.push(route);
      });
    });
    return routes;
  };

  // If this wrapper is located at the top of a group hierarchie (meaning without a parent group)
  // the options will be injected directly by the navbar component. Because of this frameworkInjectedOptions
  // can be of type InjectedOptionsByNavbarToWrapper.
  getNavbarComponent = (
    frameworkInjectedOptions:
      | InjectedOptionsByNavbarToWrapper
      | InjectedOptionsByGroupToWrapper,
  ) => {
    const injectedProperties = {
      navbarCollapsed: frameworkInjectedOptions.navbarCollapsed,
      insideGroup: this.getInsideGroup(),
      // As the options origin can be the navbar component itself it has to be checked whether this
      // wrapper is located inside a group.
      groupActive: this.getInsideGroup()
        ? // @ts-ignore If insideGroup is true groupActive will be contained.
          frameworkInjectedOptions.groupActive
        : false,
    };

    return (
      <TabGroup
        navbarCollapsed={frameworkInjectedOptions.navbarCollapsed}
        key={this.getKey()}
        name={this._name}
        logo={this._logo ? this._logo : undefined}
        collapsible={this._collapsible}
        frameworkInjectedOptions={injectedProperties}
        wrappers={this._contentWrappers}
      />
    );
  };

  get name() {
    return this._name;
  }

  getInsideGroup() {
    return this._insideGroup;
  }

  setInsideGroup(insideGroup: boolean) {
    this._insideGroup = insideGroup;
  }
}

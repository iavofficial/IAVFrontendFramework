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

import {ReactElement} from "react";
import {RouteProps} from "react-router-dom";
import {
  InjectedOptionsByGroupToWrapper,
  InjectedOptionsByNavbarToWrapper,
} from "../types/typesInjectedOptions";

export interface TabAndContentWrapper {
  getRoutes(): ReactElement<RouteProps>[];
  getNavbarComponent(
    navbarInjectedOptions: InjectedOptionsByNavbarToWrapper,
  ): ReactElement;
  getKey(): string;
}

export type GroupableTabAndContentWrapper = TabAndContentWrapper & {
  getInsideGroup(): boolean;
  // Allow any return value to allow for feedback if
  // necessary while using the framework and developing custom TabAndContentWrappers.
  setInsideGroup(insideGroup: boolean): any;
  getNavbarComponent(
    navbarInjectedOptions:
      | InjectedOptionsByNavbarToWrapper
      | InjectedOptionsByGroupToWrapper,
  ): ReactElement;
};

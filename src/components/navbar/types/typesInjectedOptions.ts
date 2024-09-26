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

/**
 * This interface contains the basic options which are passed to the wrapper by the navbar component.
 */
export interface InjectedOptionsByNavbarToWrapper {
  navbarCollapsed: boolean;
}

/**
 * This interface contains the options which are passed to the wrapper by a group component for groupable tabs.
 */
export type InjectedOptionsByGroupToWrapper =
  InjectedOptionsByNavbarToWrapper & {
    groupActive: boolean;
  };

/**
 * This interface contains all basic options which are passed to a tab component by the wrapper.
 */
export type InjectedOptionsByWrapperToTab = InjectedOptionsByNavbarToWrapper & {
  path: string;
};

/**
 * This interface contains all options which are passed to groupable tab components by the wrapper.
 */
export type InjectedOptionsGroupableByWrapperToTab =
  InjectedOptionsByWrapperToTab &
    InjectedOptionsByGroupToWrapper & {
      insideGroup: boolean;
    };

/**
 * This interface defines the structure of an object which contains options to inject by the framework.
 */
export interface InjectedOptionsObject<PropertiesToInject> {
  frameworkInjectedOptions: PropertiesToInject;
}

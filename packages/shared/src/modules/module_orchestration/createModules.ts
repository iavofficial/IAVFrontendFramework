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

import {FFModule} from "../../types/modules/generalModule";
import {
  ActualMandatoryStateFromModules,
  FFMandatoryStoreModules,
  FFMandatoryState,
  GenericModules,
} from "../../types/modules/moduleOrchestrationTypes";
import {defaultNonStoreModules, defaultStoreModules} from "./moduleDefaults";

export function createModules<
  TUserStoreModules extends Partial<TNonStoreModules>,
  TMandatoryStoreModules extends Partial<FFMandatoryStoreModules<TState>> = {},
  TNonStoreModules extends Record<string, FFModule> = Record<string, FFModule>,
  TState extends
    FFMandatoryState = ActualMandatoryStateFromModules<TMandatoryStoreModules>,
>(
  params: {
    frameworkStoreModules?: TMandatoryStoreModules,
    userStoreModules?: TUserStoreModules;
    nonStoreModules?: TNonStoreModules;
  } = {},
) {
  const {
    frameworkStoreModules = {} as TMandatoryStoreModules,
    nonStoreModules = {} as TNonStoreModules,
    userStoreModules = {},
  } = params;

  const mergedMandatoryStoreModules = {
    ...userStoreModules,
    ...defaultStoreModules,
    ...frameworkStoreModules,
  };

  const mergedNonStoreModules = {
    ...defaultNonStoreModules,
    ...nonStoreModules,
  };

  return {
    frameworkStoreModules: mergedMandatoryStoreModules,
    userStoreModules: userStoreModules,
    // Modules which are relevant for the store overwrite modules which are not relevant
    // for the store in case there is a duplicate key. This is necessary because store modules
    // are "more specific" than other modules. For example there could be a Module M for Routing
    // which has a default implementation inside the framework. The user may want to write a custom
    // Routing Module X which should replace the default implementation. He will pass X inside the
    // constructor because of which this.storeModules contains X. However, sinde M is a default
    // implementation it is presend inside defaultNonStoreModules. Because of this M is present
    // in this.nonStoreModules, so the union of this.storeModules and this.nonStoreModules
    // contains two routing modules (X and M) for the router key. Of course, the user module should
    // overwrite the default implementation.
    // However, the other way around makes no sense (a user module without store replaces a default
    // implementation which is included inside the store), since the state which is defined inside
    // the default implementation is necessary for the framework to work correctly. So you can conclude:
    // A default implementation for the store can be overwritten by just custom modules for the store.
    // A default implementation without store can be overwritten by custom modules both for and without
    // the store.
    all: {...mergedNonStoreModules, ...userStoreModules, ...mergedMandatoryStoreModules},
  };
}

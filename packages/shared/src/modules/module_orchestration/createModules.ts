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
} from "../../types/modules/moduleOrchestrationTypes";
import {ExactPartial} from "../../types/util-types/exact";
import {
  DefaultNonStoreModules,
  defaultNonStoreModules,
  defaultStoreModules,
} from "./moduleDefaults";

export function createModules<
  // Partial of DefaultNonStoreModules ensures that if TUserStoreModules is used for
  // overriding default non store modules, the user modules have to statisfy the
  // corresponding TS constraints.
  TUserStoreModules extends Partial<DefaultNonStoreModules>,
  // Same for TMandatoryStoreModules regarding overriding the default store modules.
  TMandatoryStoreModules extends Partial<
    FFMandatoryStoreModules<TMandatoryModulesState>
  > = {},
  TNonStoreModules extends Record<string, FFModule> = Record<string, FFModule>,
  TMandatoryModulesState extends
    FFMandatoryState = ActualMandatoryStateFromModules<TMandatoryStoreModules>,
>(
  params: {
    // It has to be ensured that frameworkStoreModules has no more keys than
    // there are mandatory modules as this attribute's purpose is to override
    // default store modules.
    frameworkStoreModules?: ExactPartial<
      FFMandatoryStoreModules<TMandatoryModulesState>,
      TMandatoryStoreModules
    >;
    // TUserModules should not be used to override mandatory modules.
    userStoreModules?: Omit<TUserStoreModules, keyof FFMandatoryStoreModules>;
    nonStoreModules?: TNonStoreModules;
  } = {},
) {
  const {
    frameworkStoreModules = {} as TMandatoryStoreModules,
    nonStoreModules = {} as TNonStoreModules,
    userStoreModules = {} as TUserStoreModules,
  } = params;

  const mergedMandatoryStoreModules = {
    // User store modules should not override mandatory store modules (which are
    // default ones and passed custom ones). This is why user store modules are
    // spread first.
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
    /*
    User store modules override modules which are not relevant
     for the store in case the user wants to implement non store modules but wants to add a state.
     This is necessary because store modules are "more specific" than other modules. For example there
     could be a Module M for Routing
     which has a default implementation inside the framework. The user may want to write a custom
     Routing Module X which should replace the default implementation. He will pass X inside the
     constructor because of which this.userStoreModules contains X. However, sinde M is a default
     implementation it is present inside defaultNonStoreModules. Because of this M is present
     in this.nonStoreModules, so the union of this.userStoreModules and this.nonStoreModules
     contains two routing modules (X and M) for the router key. Of course, the user module should
     override the default implementation.
     However, the other way around makes no sense (a user module without store replaces a default
     implementation which is included inside the store), since the state which is defined inside
     the default implementation is necessary for the framework to work correctly. So you can conclude:
     A default implementation for the store can be overridden by just custom modules for the store
     (modules.frameworkStoreModules).
     A default implementation without store can be overwritten by custom modules both for and without
     the store.
     */
    all: {
      ...mergedNonStoreModules,
      ...userStoreModules,
      ...mergedMandatoryStoreModules,
    },
  };
}

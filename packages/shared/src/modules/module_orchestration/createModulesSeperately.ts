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

import {USER_MODULES_PREFIX} from "../../constants/moduleNames";
import {
  ActualMandatoryStateFromModules,
  FFMandatoryStoreModules,
  FFMandatoryState,
  ActualUserModulesStateFromModules,
  FFStoreModules,
} from "../../types/modules/moduleOrchestrationTypes";
import {Exact, ExactPartial} from "../../types/util-types/exact";
import {RestrictKeyToPrefix} from "../../types/util-types/restrictKeyToPrefix";
import {DefaultNonStoreModules} from "./moduleDefaults";
import { mergeModules } from "./util/mergeModules";

export function createModulesSeperately<
  // Partial of DefaultNonStoreModules ensures that if TUserStoreModules is used for
  // overriding default non store modules, the user modules have to statisfy the
  // corresponding TS constraints.
  TUserStoreModules extends FFStoreModules<TUserModulesState> &
    Partial<DefaultNonStoreModules>,
  // Same for TMandatoryStoreModules regarding overriding the default store modules.
  TUserModulesState = ActualUserModulesStateFromModules<TUserStoreModules>,
  TFrameworkStoreModules extends Partial<
    FFMandatoryStoreModules<TMandatoryModulesState>
  > = {},
  TMandatoryModulesState extends
    FFMandatoryState = ActualMandatoryStateFromModules<TFrameworkStoreModules>,
  TNonStoreModules extends Partial<DefaultNonStoreModules> = {},
>(
  params: {
    // It has to be ensured that frameworkStoreModules has no more keys than
    // there are mandatory modules as this attribute's purpose is to override
    // default store modules.
    frameworkStoreModules?: ExactPartial<
      FFMandatoryStoreModules<TMandatoryModulesState>,
      TFrameworkStoreModules
    >;
    // TUserModules should not be used to override mandatory modules.
    // Because of this Omit is used in order to prevent userStoreModules
    // to have keys of FFMandatoryStoreModules.
    // Furthermore, RestrictKeyToPrefix is used in order to ensure that
    // every user module begins with a specific prefix for user modules.
    // By doing this a collision of keys for new Framework Modules with
    // user modules can be avoided.
    userStoreModules?: Exact<
      RestrictKeyToPrefix<
        Omit<TUserStoreModules, keyof FFMandatoryStoreModules>,
        typeof USER_MODULES_PREFIX
      >,
      TUserStoreModules
    >;
    nonStoreModules?: TNonStoreModules;
  } = {},
) {
  const {
    frameworkStoreModules = {} as TFrameworkStoreModules,
    nonStoreModules = {} as TNonStoreModules,
    userStoreModules = {} as TUserStoreModules,
  } = params;

  return mergeModules(frameworkStoreModules, userStoreModules, nonStoreModules);
}

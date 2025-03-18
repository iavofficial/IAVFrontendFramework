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

import {
  createTypedUseModule,
  useModuleContext,
} from "../../contexts/moduleContext";
import {
  ActualMandatoryStateFromModules,
  FFMandatoryStoreModules,
  FFMandatoryState,
  ActualUserModulesStateFromModules,
  FFStoreModules,
  TParamUserStoreModules,
  TParamUserNonStoreModules,
  TParamFrameworkStoreModulesPartial,
  TParamFrameworkNonStoreModulesPartial,
} from "../../types/modules/moduleOrchestrationTypes";
import {DefaultNonStoreModules} from "./moduleDefaults";
import {mergeModules} from "./util/mergeModules";

export function createModulesSeperately<
  TUserNonStoreModules extends object,
  // Partial of DefaultNonStoreModules ensures that if TUserStoreModules is used for
  // overriding default non store modules, the user modules have to statisfy the
  // corresponding TS constraints.
  TUserStoreModules extends FFStoreModules<TUserModulesState> &
    Partial<DefaultNonStoreModules>,
  // Same for TMandatoryStoreModules regarding overriding the default store modules.
  TUserModulesState = ActualUserModulesStateFromModules<TUserStoreModules>,
  TFrameworkStoreModules extends Partial<
    FFMandatoryStoreModules<TFrameworkModulesState>
  > = {},
  TFrameworkModulesState extends
    FFMandatoryState = ActualMandatoryStateFromModules<TFrameworkStoreModules>,
  TFrameworkNonStoreModules extends Partial<DefaultNonStoreModules> = {},
>(
  params: {
    frameworkStoreModules?: TParamFrameworkStoreModulesPartial<
      TFrameworkStoreModules,
      TFrameworkModulesState
    >;
    userStoreModules?: TParamUserStoreModules<
      TUserStoreModules,
      TUserModulesState
    >;
    frameworkNonStoreModules?: TParamFrameworkNonStoreModulesPartial<TFrameworkNonStoreModules>;
    userNonStoreModules?: TParamUserNonStoreModules<TUserNonStoreModules>;
  } = {},
) {
  const {
    frameworkStoreModules = {} as TFrameworkStoreModules,
    userStoreModules = {} as TUserStoreModules,
    frameworkNonStoreModules = {} as TFrameworkNonStoreModules,
    userNonStoreModules = {} as TUserNonStoreModules,
  } = params;

  const finalModules = mergeModules({
    frameworkStoreModules: frameworkStoreModules,
    userStoreModules: userStoreModules,
    frameworkNonStoreModules: frameworkNonStoreModules,
    userNonStoreModules: userNonStoreModules,
  });

  return {
    ...finalModules,
    useModuleContextTyped: useModuleContext<typeof finalModules.all>,
    useModuleTyped: createTypedUseModule<typeof finalModules.all>(),
  };
}

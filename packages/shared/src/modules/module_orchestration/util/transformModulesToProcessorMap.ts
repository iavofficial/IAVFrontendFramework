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
  FFMandatoryState,
  ModuleAndProcessorMap,
} from "../../../types/modules/moduleOrchestrationTypes";

// Type assertion has to be used until there is a type safe way to
// map the modules to a module and processor map.
export const transformModulesToProcessorMap = <
  TModules extends object,
  TFrameworkModulesState extends FFMandatoryState,
>(
  modules: TModules,
) => {
  const modulesArray = Object.entries(modules).map(([key, value]) => ({
    [key]: {
      module: value,
    },
  }));

  const processorMap = (
    modulesArray.length > 0
      ? modulesArray.reduce((prev, current) => ({
          ...prev,
          ...current,
        }))
      : {}
  ) as ModuleAndProcessorMap<TModules, TFrameworkModulesState>;

  return processorMap;
};

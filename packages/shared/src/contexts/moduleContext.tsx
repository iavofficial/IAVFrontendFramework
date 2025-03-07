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

import React, {useContext} from "react";
import {FFMandatoryStoreModules} from "../types/modules/moduleOrchestrationTypes";
import {allDefaultModules} from "../modules/module_orchestration/moduleDefaults";

export type ModuleContextValues<TModules> = {
  modules: TModules;
};

export type DefaultModuleContextValues =
  ModuleContextValues<FFMandatoryStoreModules>;

export const ModuleContext = React.createContext<DefaultModuleContextValues>(
  {} as DefaultModuleContextValues,
);

export const useModuleContext = <
  TModules = typeof allDefaultModules,
>(): ModuleContextValues<TModules> => {
  return useContext(ModuleContext) as ModuleContextValues<TModules>;
};

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
import {AllDefaultModules} from "../modules/module_orchestration/moduleDefaults";

export type ModuleContextValues<TModules> = {
  modules: TModules;
};

export type DefaultModuleContextValues = ModuleContextValues<AllDefaultModules>;

export const ModuleContext = React.createContext<DefaultModuleContextValues>(
  {} as DefaultModuleContextValues,
);

export const useModuleContext = <TModules = AllDefaultModules>() => {
  return useContext(ModuleContext) as ModuleContextValues<TModules>;
};

// There seems to be no way for useModule in which it can be used without
// passing no or both types. As passing the type for K is redundant, this
// is not prefered. Because of this the createModules functions create a
// typed useModule Hook using this function.
export const createTypedUseModule = <TModules = AllDefaultModules>() => {
  return <K extends keyof TModules>(key: K) => {
    const {modules} = useModuleContext<TModules>();
    return modules[key];
  };
};

export const useModule = <
  K extends keyof TModules,
  TModules = AllDefaultModules,
>(
  key: K,
) => {
  const {modules} = useModuleContext<TModules>();
  return modules[key];
};

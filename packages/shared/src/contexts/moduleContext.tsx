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

import React, { useContext } from "react";
import { AuthModule, AuthState } from "../types/modules/auth/authenticationProvider";

export type ModuleContextValues<TModules> = {
  modules: TModules;
}

export type DefaultModuleContextValues = ModuleContextValues<{
  auth: AuthModule<AuthState>;
}>;

export const ModuleContext = React.createContext<DefaultModuleContextValues>(
  {} as DefaultModuleContextValues
);

export const useModuleContext = <TModules,>(): ModuleContextValues<TModules> => {
  return useContext(ModuleContext) as ModuleContextValues<TModules>;
};
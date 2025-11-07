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

import React from "react";
import {PropsWithChildren} from "react";
import {
  ModuleContext,
  ModuleContextValues,
} from "@iavofficial/frontend-framework-shared/moduleContext";
import {
  FFMandatoryState,
  FFAllMandatoryModules,
} from "@iavofficial/frontend-framework-shared/moduleOrchestrationTypes";
import {FFModule} from "@iavofficial/frontend-framework-shared/generalModule";

export interface Props<TState extends FFMandatoryState> {
  modules: FFAllMandatoryModules<TState> & Record<string, FFModule>;
}

export const ModuleContextProvider = <TState extends FFMandatoryState>(
  props: PropsWithChildren<Props<TState>>,
) => {
  // The type has to be adapted since the correct type is not known
  // at creation of the module context.
  const ModuleContextTyped = ModuleContext as React.Context<
    ModuleContextValues<typeof props.modules>
  >;

  return (
    <ModuleContextTyped.Provider
      value={{
        modules: props.modules,
      }}
    >
      {props.children}
    </ModuleContextTyped.Provider>
  );
};

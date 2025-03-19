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
  FFMandatoryNonStoreModules,
  FFMandatoryState,
  FFMandatoryStoreModules,
  TParamAllModulesPartial,
} from "../../types/modules/moduleOrchestrationTypes";
import {mergeModules} from "./util/mergeModules";
import {separateModuleTypes} from "./util/separateModuleTypes";

// It would be better to use FFModule inside the Record to ensure that
// the useModuleLifecycle method has the expected type if the module
// provides this hook. However, doing this results in problems as
// when providing the modules with an object literal TS performs
// excess property checking for object literals (passed objects have
// to fully match). If the module does not contain this hook it results
// in an error. Furthermore, an index signature to open the FFModule type
// cannot be added since it introduces other errors.
// However, just providing object inside the Record is not very critical
// as the user will get an error when he passes the modules to the
// PageGlobalDataLayer if module types mismatch with FFModule.
export const createModules = <
    TModules extends Partial<
        FFMandatoryStoreModules<TFrameworkStoreModulesState>
    > &
        Partial<FFMandatoryNonStoreModules> &
        Record<string, object>,
    TFrameworkStoreModulesState extends FFMandatoryState = ActualMandatoryStateFromModules<TModules>,
>(
    paramModules?: TParamAllModulesPartial<TModules, TFrameworkStoreModulesState>,
) => {
    const modules = paramModules ?? ({} as TModules);

  const separatedModules = separateModuleTypes(modules);

  const finalModules = mergeModules(separatedModules);

  return {
    ...finalModules,
    useModuleContextTyped: useModuleContext<typeof finalModules.all>,
    useModuleTyped: createTypedUseModule<typeof finalModules.all>(),
  };
};

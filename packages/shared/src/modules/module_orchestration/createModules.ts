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

import {DefaultStoreModules, defaultStoreModules} from "./moduleDefaults";
import { mergeModules } from "./util/mergeModules";

type WithoutSlice<T> = {
  [K in keyof T as T[K] extends {slice: any} ? never : K]: T[K];
};

type WithoutKeys<T, U> = Pick<T, Exclude<keyof T, keyof U>>;

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
// GlobalDataLayer if module types mismatch with FFModule.
export const createModules = <TModules extends Record<string, object>>(
  paramModules?: TModules,
) => {
  const modules = paramModules ?? ({} as TModules);

  // Using Omit unfortunately does not work.
  type TNonStoreModules = WithoutSlice<TModules>;
  type TStoreModules = WithoutKeys<TModules, TNonStoreModules>;

  type TUserStoreModules = WithoutKeys<TStoreModules, DefaultStoreModules>;
  type TFrameworkStoreModules = WithoutKeys<TStoreModules, TUserStoreModules>;

  let frameworkStoreModules = {} as TFrameworkStoreModules;
  let userStoreModules = {} as TUserStoreModules;
  let nonStoreModules = {} as TNonStoreModules;

  Object.entries(modules).forEach(([key, module]) => {
    if (!("slice" in module)) {
      nonStoreModules = {...nonStoreModules, [key]: module};
    } else if (key in defaultStoreModules) {
      frameworkStoreModules = {...frameworkStoreModules, [key]: module};
    } else {
      userStoreModules = {...userStoreModules, [key]: module};
    }
  });

  return mergeModules(frameworkStoreModules, userStoreModules, nonStoreModules);
};

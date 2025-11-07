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

import {USER_MODULES_PREFIX} from "../../../constants/moduleNames";
import {
  defaultNonStoreModules,
  defaultStoreModules,
  DefaultStoreModules,
} from "../moduleDefaults";

type WithoutSlice<T> = {
  [K in keyof T as T[K] extends {slice: any} ? never : K]: T[K];
};

type WithoutKeys<T, U> = Pick<T, Exclude<keyof T, keyof U>>;

type FilterKeys<T, Prefix extends string> = {
  [K in keyof T as K extends `${Prefix}${string}` ? K : never]: T[K];
};

export const separateModuleTypes = <TModules extends Record<string, object>>(
  modules: TModules,
) => {
  // Using Omit unfortunately does not work.
  type TNonStoreModules = WithoutSlice<TModules>;
  type TStoreModules = WithoutKeys<TModules, TNonStoreModules>;

  type TFrameworkNonStoreModules = FilterKeys<
    TNonStoreModules,
    typeof USER_MODULES_PREFIX
  >;
  type TUserNonStoreModules = WithoutKeys<
    TNonStoreModules,
    TFrameworkNonStoreModules
  >;

  type TUserStoreModules = WithoutKeys<TStoreModules, DefaultStoreModules>;
  type TFrameworkStoreModules = WithoutKeys<TStoreModules, TUserStoreModules>;

  let frameworkStoreModules = {} as TFrameworkStoreModules;
  let userStoreModules = {} as TUserStoreModules;

  let frameworkNonStoreModules = {} as TFrameworkNonStoreModules;
  let userNonStoreModules = {} as TUserNonStoreModules;

  Object.entries(modules).forEach(([key, module]) => {
    if (key in defaultStoreModules) {
      frameworkStoreModules = {...frameworkStoreModules, [key]: module};
    } else if (key in defaultNonStoreModules) {
      frameworkNonStoreModules = {...frameworkNonStoreModules, [key]: module};
    } else if ("slice" in module) {
      userStoreModules = {...userStoreModules, [key]: module};
    } else {
      userNonStoreModules = {...userNonStoreModules, [key]: module};
    }
  });

  return {
    frameworkStoreModules: frameworkStoreModules,
    userStoreModules: userStoreModules,
    frameworkNonStoreModules: frameworkNonStoreModules,
    userNonStoreModules: userNonStoreModules,
  };
};

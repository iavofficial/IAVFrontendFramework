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

function rebuild<T>(obj: T): T {
  return {...obj};
}

import {FFModule} from "../../types/modules/generalModule";
import {
  ActualMandatoryStateFromModules,
  FFMandatoryStoreModules,
  FFMandatoryState,
  MergeModules,
  ActualUserModulesStateFromModules,
  FFStoreModules,
} from "../../types/modules/moduleOrchestrationTypes";
import {Exact, ExactPartial} from "../../types/util-types/exact";
import {
  DefaultNonStoreModules,
  defaultNonStoreModules,
  DefaultStoreModules,
  defaultStoreModules,
} from "./moduleDefaults";

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
export function createModules<TModules extends Record<string, object>>(
  paramModules?: TModules,
) {
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

  type TMergedFrameworkStoreModules = MergeModules<
    DefaultStoreModules,
    TFrameworkStoreModules
  >;
  const mergedFrameworkStoreModules = {
    ...defaultStoreModules,
    ...frameworkStoreModules,
  } as TMergedFrameworkStoreModules;

  const storeModules = {
    frameworkStoreModules: mergedFrameworkStoreModules,
    userStoreModules: rebuild(userStoreModules),
  };

  type TMergedNonStoreModules = MergeModules<
    DefaultNonStoreModules,
    TNonStoreModules
  >;
  const mergedNonStoreModules = {
    ...defaultNonStoreModules,
    ...nonStoreModules,
  } as TMergedNonStoreModules;

  /*
    User store modules override modules which are not relevant
     for the store in case the user wants to implement non store modules but wants to add a state.
     This is necessary because store modules are "more specific" than other modules. For example there
     could be a Module M for Routing
     which has a default implementation inside the framework. The user may want to write a custom
     Routing Module X which should replace the default implementation. He will pass X inside the
     constructor because of which this.userStoreModules contains X. However, sinde M is a default
     implementation it is present inside defaultNonStoreModules. Because of this M is present
     in this.nonStoreModules, so the union of this.userStoreModules and this.nonStoreModules
     contains two routing modules (X and M) for the router key. Of course, the user module should
     override the default implementation.
     However, the other way around makes no sense (a user module without store replaces a default
     implementation which is included inside the store), since the state which is defined inside
     the default implementation is necessary for the framework to work correctly. So you can conclude:
     A default implementation for the store can be overridden by just custom modules for the store
     (modules.frameworkStoreModules).
     A default implementation without store can be overwritten by custom modules both for and without
     the store.
  */

  const allModules = {
    ...mergedNonStoreModules,
    ...userStoreModules,
    ...mergedFrameworkStoreModules,
  } as MergeModules<
    MergeModules<TMergedNonStoreModules, typeof userStoreModules>,
    TMergedFrameworkStoreModules
  >;

  return {
    storeModules: storeModules,
    all: allModules,
  };
}

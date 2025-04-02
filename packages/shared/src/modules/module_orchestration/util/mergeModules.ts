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

import {MergeModules} from "../../../types/modules/moduleOrchestrationTypes";
import {
  defaultNonStoreModules,
  DefaultNonStoreModules,
  defaultStoreModules,
  DefaultStoreModules,
} from "../moduleDefaults";

type StoreModules<TFrameworkStoreModules, TUserStoreModules> = {
  userStoreModules: TUserStoreModules;
  frameworkStoreModules: MergeModules<
    DefaultStoreModules,
    TFrameworkStoreModules
  >;
};

type AllModules<
  TFrameworkStoreModules,
  TUserStoreModules,
  TFrameworkNonStoreModules,
  TUserNonStoreModules,
> = MergeModules<
  MergeModules<
    MergeModules<
      TUserNonStoreModules,
      MergeModules<DefaultNonStoreModules, TFrameworkNonStoreModules>
    >,
    TUserStoreModules
  >,
  MergeModules<DefaultStoreModules, TFrameworkStoreModules>
>;

export type FinalModules<
  TFrameworkStoreModules extends object,
  TUserStoreModules extends object,
  TFrameworkNonStoreModules extends object,
  TUserNonStoreModules extends object,
> = {
  all: AllModules<
    TFrameworkStoreModules,
    TUserStoreModules,
    TFrameworkNonStoreModules,
    TUserNonStoreModules
  >;
  storeModules: StoreModules<TFrameworkStoreModules, TUserStoreModules>;
};

export const mergeModules = <
  TFrameworkStoreModules extends object,
  TUserStoreModules extends object,
  TFrameworkNonStoreModules extends object,
  TUserNonStoreModules extends object,
>(modules: {
  frameworkStoreModules: TFrameworkStoreModules;
  userStoreModules: TUserStoreModules;
  frameworkNonStoreModules: TFrameworkNonStoreModules;
  userNonStoreModules: TUserNonStoreModules;
}): FinalModules<
  TFrameworkStoreModules,
  TUserStoreModules,
  TFrameworkNonStoreModules,
  TUserNonStoreModules
> => {
  const mergedFrameworkStoreModules = {
    ...defaultStoreModules,
    ...modules.frameworkStoreModules,
  } as MergeModules<DefaultStoreModules, TFrameworkStoreModules>;

  const mergedFrameworkNonStoreModules = {
    ...defaultNonStoreModules,
    ...modules.frameworkNonStoreModules,
  } as MergeModules<DefaultNonStoreModules, TFrameworkNonStoreModules>;

  const storeModules: StoreModules<TFrameworkStoreModules, TUserStoreModules> =
    {
      userStoreModules: modules.userStoreModules,
      frameworkStoreModules: mergedFrameworkStoreModules,
    };

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
  const allModules: AllModules<
    TFrameworkStoreModules,
    TUserStoreModules,
    TFrameworkNonStoreModules,
    TUserNonStoreModules
  > = {
    ...modules.userNonStoreModules,
    ...mergedFrameworkNonStoreModules,
    ...modules.userStoreModules,
    ...mergedFrameworkStoreModules,
  };

  return {
    storeModules,
    all: allModules,
  };
};

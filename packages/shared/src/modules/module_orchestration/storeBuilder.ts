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

// The Store Builder is used by the developer to create a Redux store and pass it to the
// framework. It can include different processor methods which process a corresponding module.
// While the Builder provides default processing logic via the StoreConfigBuilder, custom processor
// methods are necessary when specific modules have to be processed another way.
// Furthermore the Builder contains a storeBuilder method which is used to build the store after
// all processor methods were executed. The storeBuilder can be replaced too.

import {configureStore, EnhancedStore} from "@reduxjs/toolkit";
import {
  ActualMandatoryStateFromModules,
  FFMandatoryStoreModules,
  FFMandatoryState,
  ModuleAndProcessorMap,
  ModuleProcessorFunction,
  FFStoreModules,
  ActualUserModulesStateFromModules,
  TParamFrameworkStoreModules,
  TParamUserStoreModules,
} from "../../types/modules/moduleOrchestrationTypes";
import {StoreConfig, StoreConfigBuilder} from "./storeConfigBuilder";
import {DefaultNonStoreModules} from "./moduleDefaults";
import {transformModulesToProcessorMap} from "./util/transformModulesToProcessorMap";

export class StoreBuilder<
  TFrameworkStoreModules extends
    FFMandatoryStoreModules<TFrameworkModulesState>,
  // Partial of DefaultNonStoreModules ensures that if TUserStoreModules is used for
  // overriding default non store modules, the user modules have to statisfy the
  // corresponding TS constraints.
  TUserStoreModules extends FFStoreModules<TUserModulesState> &
    Partial<DefaultNonStoreModules>,
  TFrameworkModulesState extends
    FFMandatoryState = ActualMandatoryStateFromModules<TFrameworkStoreModules>,
  // Same for TMandatoryStoreModules regarding overriding the default store modules.
  TUserModulesState = ActualUserModulesStateFromModules<TUserStoreModules>,
> {
  private storeConfigBuilder: StoreConfigBuilder<TFrameworkModulesState>;

  // These are mandatory modules and processors which are essential for the framework as
  // it uses values and methods of the processed modules.
  private frameworkModulesAndProcessors: ModuleAndProcessorMap<
    FFMandatoryStoreModules<TFrameworkModulesState>,
    TFrameworkModulesState
  >;

  // These are optional modules and processors of the user.
  private userStoreModulesAndProcessors:
    | ModuleAndProcessorMap<TUserStoreModules, TFrameworkModulesState>
    | undefined;

  private storeBuilder: (
    storeConfig: StoreConfig<TFrameworkModulesState>,
  ) => EnhancedStore<TFrameworkModulesState> = defaultStoreBuilder;

  constructor(storeModules: {
    frameworkStoreModules: TParamFrameworkStoreModules<
      TFrameworkStoreModules,
      TFrameworkModulesState
    >;
    userStoreModules?: TParamUserStoreModules<
      TUserStoreModules,
      TUserModulesState
    >;
  }) {
    this.storeConfigBuilder = new StoreConfigBuilder(
      storeModules.frameworkStoreModules,
    );

    this.frameworkModulesAndProcessors = transformModulesToProcessorMap<
      TFrameworkStoreModules,
      TFrameworkModulesState
    >(storeModules.frameworkStoreModules);

    if (storeModules.userStoreModules) {
      this.userStoreModulesAndProcessors = transformModulesToProcessorMap<
        TUserStoreModules,
        TFrameworkModulesState
      >(storeModules.userStoreModules);
    }
  }

  setFrameworkModuleProcessor<
    K extends keyof typeof this.frameworkModulesAndProcessors,
  >(
    moduleType: K,
    processor: ModuleProcessorFunction<
      (typeof this.frameworkModulesAndProcessors)[K]["module"],
      TFrameworkModulesState
    >,
  ) {
    this.frameworkModulesAndProcessors[moduleType].processor = processor;
    return this;
  }

  setUserModuleProcessor<
    K extends keyof ModuleAndProcessorMap<
      TUserStoreModules,
      TFrameworkModulesState
    >,
  >(
    moduleType: K,
    processor: ModuleProcessorFunction<
      ModuleAndProcessorMap<
        TUserStoreModules,
        TFrameworkModulesState
      >[K]["module"],
      TFrameworkModulesState
    >,
  ) {
    if (this.userStoreModulesAndProcessors) {
      this.userStoreModulesAndProcessors[moduleType].processor = processor;
    }
    return this;
  }

  setStoreBuilder(
    storeBuilder: (
      storeConfig: StoreConfig<TFrameworkModulesState>,
    ) => EnhancedStore<TFrameworkModulesState>,
  ) {
    this.storeBuilder = storeBuilder;
    return this;
  }

  build() {
    executeProcessorsForModules(
      this.frameworkModulesAndProcessors,
      this.storeConfigBuilder,
    );

    if (this.userStoreModulesAndProcessors) {
      executeProcessorsForModules(
        this.userStoreModulesAndProcessors,
        this.storeConfigBuilder,
      );
    }

    const storeConfig = this.storeConfigBuilder.build();

    return this.storeBuilder(storeConfig);
  }
}

export const defaultStoreBuilder = <TState extends FFMandatoryState>(
  storeConfig: StoreConfig<TState>,
) => {
  const store = configureStore<TState>({
    reducer: storeConfig.reducers,
    middleware: (getDefaultMiddleware: Function) =>
      getDefaultMiddleware().concat(storeConfig.middleware),
    enhancers: (getDefaultEnhancers: Function) =>
      getDefaultEnhancers().concat(storeConfig.enhancers),
  });

  return store;
};

const executeProcessorsForModules = <
  TModules extends FFStoreModules,
  TFrameworkModulesState extends FFMandatoryState,
>(
  modulesAndProcessors: ModuleAndProcessorMap<TModules, TFrameworkModulesState>,
  storeConfigBuilder: StoreConfigBuilder<TFrameworkModulesState>,
) => {
  (Object.keys(modulesAndProcessors) as (keyof TModules)[]).forEach((key) => {
    const entry = modulesAndProcessors[key];
    if (entry.processor) {
      entry.processor(entry.module, storeConfigBuilder);
    }
  });
};

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
// framework. It includes different processor modules which process a corresponding module.
// While the Builder provides default processor methods, they can be replaced allowing for
// customization of module processing. Furthermore the Builder contains a storeBuilder method
// which is used to build the store after all processor methods were executed. The storeBuilder

import {configureStore, EnhancedStore} from "@reduxjs/toolkit";
import {
  ActualMandatoryStateFromModules,
  FFMandatoryStoreModules,
  FFMandatoryState,
  ModuleAndProcessorMap,
  ModuleProcessorFunction,
  FFStoreModules,
  ActualUserModulesStateFromModules,
} from "../../types/modules/moduleOrchestrationTypes";
import {StoreConfig} from "./storeConfig";
import {StoreConfigBuilder} from "./storeConfigBuilder";
import {MandatoryModuleNames} from "../../constants/mandatoryModuleNames";
import {Exact} from "../../types/util-types/exact";
import {FFStoreModule} from "../../types/modules/generalModule";
import {DefaultNonStoreModules} from "./moduleDefaults";

// can be replaced to customize the build of the Redux store.
export class StoreBuilder<
  TFrameworkModules extends FFMandatoryStoreModules<TFrameworkModuleState>,
  // Partial of DefaultNonStoreModules ensures that if TUserStoreModules is used for
  // overriding default non store modules, the user modules have to statisfy the
  // corresponding TS constraints.
  TUserStoreModules extends FFStoreModules<TUserModulesState> &
    Partial<DefaultNonStoreModules>,
  TFrameworkModuleState extends
    FFMandatoryState = ActualMandatoryStateFromModules<TFrameworkModules>,
  // Same for TMandatoryStoreModules regarding overriding the default store modules.
  TUserModulesState = ActualUserModulesStateFromModules<TUserStoreModules>,
> {
  private storeConfigBuilder: StoreConfigBuilder<TFrameworkModuleState>;

  // These are mandatory modules and processors which are essential for the framework as
  // it uses values and methods of the processed modules.
  private mandatoryModulesAndProcessors: ModuleAndProcessorMap<
    FFMandatoryStoreModules<TFrameworkModuleState>,
    TFrameworkModuleState
  >;

  // These are optional and modules and processors of the user.
  private userStoreModulesAndProcessors:
    | ModuleAndProcessorMap<TUserStoreModules, TFrameworkModuleState>
    | undefined;

  private storeBuilder: (
    storeConfig: StoreConfig<TFrameworkModuleState>,
  ) => EnhancedStore<TFrameworkModuleState> = defaultStoreBuilder;

  constructor(
    // It has to be ensured that frameworkStoreModules has no more keys than
    // there are mandatory modules as this attribute's purpose is to override
    // default store modules.
    frameworkStoreModules: Exact<
      FFMandatoryStoreModules<TFrameworkModuleState>,
      TFrameworkModules
    >,
    // TUserModules should not be used to override mandatory modules.
    userStoreModules?: Exact<
      Omit<TUserStoreModules, keyof FFMandatoryStoreModules>,
      TUserStoreModules
    >,
  ) {
    this.storeConfigBuilder = new StoreConfigBuilder(frameworkStoreModules);

    this.mandatoryModulesAndProcessors = {
      [MandatoryModuleNames.Authentication]: {
        module: frameworkStoreModules[MandatoryModuleNames.Authentication],
      },
    };

    if (userStoreModules) {
      this.userStoreModulesAndProcessors = Object.entries(userStoreModules).map(
        ([key, value]) => ({
          [key]: {
            module: value,
          },
        }),
      ) as ModuleAndProcessorMap<TUserStoreModules, TFrameworkModuleState>;
    }
  }

  setFrameworkModuleProcessor<
    K extends keyof typeof this.mandatoryModulesAndProcessors,
  >(
    moduleType: K,
    processor: ModuleProcessorFunction<
      TFrameworkModules[K],
      TFrameworkModuleState
    >,
  ) {
    this.mandatoryModulesAndProcessors[moduleType].processor = processor;
    return this;
  }

  setUserModuleProcessor<
    K extends keyof typeof this.userStoreModulesAndProcessors,
  >(
    moduleType: K,
    processor: ModuleProcessorFunction<
      (typeof this.userStoreModulesAndProcessors)[K]["module"],
      TFrameworkModuleState
    >,
  ) {
    if (this.userStoreModulesAndProcessors) {
      this.userStoreModulesAndProcessors[moduleType].processor = processor;
    }
    return this;
  }

  setStoreBuilder(
    storeBuilder: (
      storeConfig: StoreConfig<TFrameworkModuleState>,
    ) => EnhancedStore<TFrameworkModuleState>,
  ) {
    this.storeBuilder = storeBuilder;
    return this;
  }

  build() {
    executeProcessorsForModules(
      this.mandatoryModulesAndProcessors,
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

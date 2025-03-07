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
  GenericModules,
  ModuleAndProcessorMap,
  ModuleProcessorFunction,
} from "../../types/modules/moduleOrchestrationTypes";
import {StoreConfig} from "./storeConfig";
import {StoreConfigBuilder} from "./storeConfigBuilder";
import {MandatoryModuleNames} from "../../constants/mandatoryModuleNames";

// can be replaced to customize the build of the Redux store.
export class StoreBuilder<
  TUserModules extends GenericModules,
  TModules extends FFMandatoryStoreModules<TState>,
  TState extends FFMandatoryState = ActualMandatoryStateFromModules<TModules>,
> {
  private storeConfigBuilder: StoreConfigBuilder<TState>;

  // These are mandatory modules and processors which are essential for the framework as
  // it uses values and methods of the processed modules.
  private mandatoryModulesAndProcessors: ModuleAndProcessorMap<
    FFMandatoryStoreModules<TState>,
    TState
  >;

  // These are optional and modules and processors of the user.
  private userModulesAndProcessors:
    | ModuleAndProcessorMap<TUserModules, TState>
    | undefined;

  private storeBuilder: (
    storeConfig: StoreConfig<TState>,
  ) => EnhancedStore<TState> = defaultStoreBuilder;

  constructor(
    ffMandatoryStoreModules: TModules,
    userModulesAndProcessors?: ModuleAndProcessorMap<TUserModules, TState>,
  ) {
    this.storeConfigBuilder = new StoreConfigBuilder(ffMandatoryStoreModules);

    this.mandatoryModulesAndProcessors = {
      [MandatoryModuleNames.Authentication]: {
        module: ffMandatoryStoreModules[MandatoryModuleNames.Authentication]
      },
    };

    if (userModulesAndProcessors) {
      this.userModulesAndProcessors = userModulesAndProcessors;
    }
  }

  setFrameworkModuleProcessor<
    K extends keyof typeof this.mandatoryModulesAndProcessors,
  >(
    moduleType: K,
    processor: ModuleProcessorFunction<
      (typeof this.mandatoryModulesAndProcessors)[K]["module"],
      TState
    >,
  ) {
    this.mandatoryModulesAndProcessors[moduleType].processor = processor;
    return this;
  }

  setUserModuleProcessor<K extends keyof TUserModules>(
    moduleType: K,
    processor: ModuleProcessorFunction<TUserModules[K], TState>,
  ) {
    if (this.userModulesAndProcessors) {
      this.userModulesAndProcessors[moduleType].processor = processor;
    }
    return this;
  }

  build() {
    executeProcessorsForModules(
      this.mandatoryModulesAndProcessors,
      this.storeConfigBuilder,
    );

    if (this.userModulesAndProcessors) {
      executeProcessorsForModules(
        this.userModulesAndProcessors,
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
  TModules extends object,
  TState extends FFMandatoryState,
>(
  modulesAndProcessors: ModuleAndProcessorMap<TModules, TState>,
  storeConfigBuilder: StoreConfigBuilder<TState>,
) => {
  (Object.keys(modulesAndProcessors) as (keyof TModules)[]).forEach((key) => {
    const entry = modulesAndProcessors[key];
    if (entry.processor) {
      entry.processor(entry.module, storeConfigBuilder);
    }
  });
};

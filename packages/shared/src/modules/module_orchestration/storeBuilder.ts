// The Store Builder is used by the developer to create a Redux store and pass it to the
// framework. It includes different processor modules which process a corresponding module.
// While the Builder provides default processor methods, they can be replaced allowing for
// customization of module processing. Furthermore the Builder contains a storeBuilder method
// which is used to build the store after all processor methods were executed. The storeBuilder

import {configureStore, EnhancedStore} from "@reduxjs/toolkit";
import {
  ActualMandatoryStateFromModules,
  FFMandatoryModules,
  FFMandatoryState,
  GenericModules,
  ModuleAndProcessorMap,
  ModuleProcessorFunction,
} from "./moduleOrchestrationTypes";
import { StoreConfig } from "./storeConfig";
import { StoreConfigBuilder } from "./storeConfigBuilder";
import { FFStoreModule } from "../../types/modules/generalModule";
import { AuthModule, AuthState } from "../../types/modules/auth/authenticatorModule";
import { MandatoryModuleNames } from "../../constants/mandatoryModuleNames";

// can be replaced to customize the build of the Redux store.
export class StoreBuilder<
  TUserModules extends GenericModules,
  TModules extends FFMandatoryModules<TState>,
  TState extends FFMandatoryState = ActualMandatoryStateFromModules<TModules>,
> {
  private storeConfigBuilder: StoreConfigBuilder = new StoreConfigBuilder();

  // These are mandatory modules and processors which are essential for the framework as
  // it uses values and methods of the processed modules.
  private mandatoryModulesAndProcessors: ModuleAndProcessorMap<
    FFMandatoryModules<TState>
  >;

  // These are optional and modules and processors of the user.
  private userModulesAndProcessors:
    | ModuleAndProcessorMap<TUserModules>
    | undefined;

  private storeBuilder: (
    storeConfig: StoreConfig,
  ) => EnhancedStore<FFMandatoryState> = defaultStoreBuilder;

  constructor(
    ffMandatoryModules: TModules,
    userModulesAndProcessors?: ModuleAndProcessorMap<TUserModules>,
  ) {
    this.mandatoryModulesAndProcessors = {
      [MandatoryModuleNames.Authentication]: {
        module: ffMandatoryModules[MandatoryModuleNames.Authentication],
        processor: defaultAuthModuleProcessor,
      },
    };

    if (userModulesAndProcessors) {
      this.userModulesAndProcessors = userModulesAndProcessors;
    }
  }

  setFrameworkModuleProcessor<K extends keyof FFMandatoryModules<TState>>(
    moduleType: K,
    processor: ModuleProcessorFunction<TModules[K]>,
  ) {
    this.mandatoryModulesAndProcessors[moduleType].processor = processor;
    return this;
  }

  setUserModuleProcessor<K extends keyof TUserModules>(
    moduleType: K,
    processor: ModuleProcessorFunction<TUserModules[K]>,
  ) {
    if (this.userModulesAndProcessors) {
      this.userModulesAndProcessors[moduleType].processor = processor;
    }
    return this;
  }

  getModules() {
    const mandatoryModules = Object.entries(this.mandatoryModulesAndProcessors)
      .map(([key, value]) => ({[key]: value.module}))
      .reduce((prev, current) => ({...prev, ...current}));

    let userModules: Record<string, FFStoreModule> = {};

    if (this.userModulesAndProcessors) {
      userModules = Object.entries(this.userModulesAndProcessors)
        .map(([key, value]) => ({[key]: value.module}))
        .reduce((prev, current) => ({...prev, ...current}));
    }

    return {...mandatoryModules, userModules};
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

export const defaultAuthModuleProcessor = <TAuthState extends AuthState>(
  authModule: AuthModule<TAuthState>,
  storeConfigBuilder: StoreConfigBuilder,
) => {
  storeConfigBuilder.setReducer("auth", authModule.slice.reducer);
};

export const defaultStoreBuilder = (storeConfig: StoreConfig) => {
  const store = configureStore({
    reducer: storeConfig.reducers,
    middleware: (getDefaultMiddleware: Function) =>
      getDefaultMiddleware().concat(storeConfig.middleware),
    enhancers: (getDefaultEnhancers: Function) =>
      getDefaultEnhancers().concat(storeConfig.enhancers),
  });

  return store;
};

const executeProcessorsForModules = <TModules extends object>(
  modulesAndProcessors: ModuleAndProcessorMap<TModules>,
  storeConfigBuilder: StoreConfigBuilder,
) => {
  (Object.keys(modulesAndProcessors) as (keyof TModules)[]).forEach((key) => {
    const entry = modulesAndProcessors[key];
    entry.processor(entry.module, storeConfigBuilder);
  });
};

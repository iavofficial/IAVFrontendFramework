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
  Action,
  configureStore,
  EnhancedStore,
  Middleware,
  Reducer,
  StoreEnhancer,
  ThunkDispatch,
} from "@reduxjs/toolkit";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {DummyAuthenticator} from "./components/authentication/default/dummyAuthenticationProvider";
import {MandatoryModuleNames} from "@iavofficial/frontend-framework-shared/mandatoryModuleNames";
import {
  AuthModule,
  AuthState,
} from "@iavofficial/frontend-framework-shared/authenticationProvider";
import {FFStoreModule, FFStoreModuleGeneric} from "@iavofficial/frontend-framework-shared/module";

const executeProcessorsForModules = <TModules extends object>(
  modulesAndProcessors: ModuleAndProcessorMap<TModules>,
  storeConfigBuilder: StoreConfigBuilder,
) => {
  (Object.keys(modulesAndProcessors) as (keyof TModules)[]).forEach((key) => {
    const entry = modulesAndProcessors[key];
    entry.processor(entry.module, storeConfigBuilder);
  });
};

/*
To add a new mandatory module:
1. Add the state (of it's slice) to FFMandatoryState.
2. Add the type of the module in minimal configuration to FFMandatoryModules. Minimal
   configuration means that the module includes just only all values and methods which
   are used by the framework itself. This is necessary to ensure that only modules can
   be used which are of this type and because of this provide all necessary values and
   methods to the framework.
3. Add an instance of a default module for this key.
4. Inside the build method of the StoreConfigBuilder: Add the root reducer of your default
   module like it is done for auth. This is necessary to ensure that all mandatory reducers
   are present when building the redux store.
5. Create a default processor for the module.
6. Inside the constructor of StoreBuilder: Add an object with the corresponding key to
   include the passed module and the default processor inside the ModuleAndProcessorMap
   for mandatory modules.
*/

// The mandatory state (which will be the state of different module's slices)
export type FFMandatoryState = {
  [K in typeof MandatoryModuleNames.Authentication]: AuthState;
};

// It is concluded that every mandatory state will have a root reducer object.
// Without the possiblity of changing values (so the existence of reducers)
// state is not sensible.
export type FFMandatoryReducers = {
  [K in keyof FFMandatoryState]: Reducer<FFMandatoryState[K]>;
};

// All mandatory modules with minimal setup which is needed by the framework.
// These modules in the given minimal setup are needed in order to provide
// essential values and methods to the framework, for example login.
// So the minimal configuration is exactly the set of values and methods
// used by the framework itself.
export type FFMandatoryModules<TAuthState extends AuthState = AuthState> = {
  [MandatoryModuleNames.Authentication]: AuthModule<TAuthState>;
};

// The user can provide additional modules which aren't used by the
// framework itself.
export type GenericModules = Record<string, FFStoreModule>;

// Processor functions are used to process single modules. They can be
// replaces in order to allow the developer to implement custom processing,
// since it is not possible to think of every possible processing step which
// could occur at development of the framework.
export type ModuleProcessorFunction<M extends FFStoreModule> = (
  module: M,
  config: StoreConfigBuilder,
) => void;

// Objects of this type aggragate a module and it's corresponding processor
// method. The following example shows it's structure:
// {auth: {module: ..., processor: ...}, ...}
// The effect of never in this case is that there cannot be a key with a value
// which does not extend FFStoreModule.
export type ModuleAndProcessorMap<ModuleType extends object> = {
  [K in keyof ModuleType]: ModuleType[K] extends FFStoreModule
    ? ModuleEntry<ModuleType[K]>
    : never;
};

// This type defines the structure of one entry inside the ModuleAndProcessorMap.
export interface ModuleEntry<M extends FFStoreModule> {
  module: M;
  processor: ModuleProcessorFunction<M>;
}

// This object contains the default modules which can be replaced.
export const defaultModules: FFMandatoryModules = {
  [MandatoryModuleNames.Authentication]: new DummyAuthenticator(),
};

export interface FFMandatoryModulesExactModuleType<
  TState extends FFMandatoryState = FFMandatoryState,
  TAuthModule extends AuthModule<TState["auth"]> = AuthModule<TState["auth"]>,
> {
  auth: TAuthModule;
  // Add other modules similarly if needed.
}

type ExtractModuleState<T> = T extends FFStoreModuleGeneric<infer S> ? S : never;

type ActualMandatoryStateFromModules<
  TModules extends Partial<FFMandatoryModules<any>>
> = {
  [K in keyof FFMandatoryModules<any>]: K extends keyof TModules
    ? ExtractModuleState<TModules[K]>
    : ExtractModuleState<FFMandatoryModules<any>[K]>;
};


type MergeModules<TUserModules, TDefaultModules> = Omit<
  TDefaultModules,
  keyof TUserModules
> &
  TUserModules;

export class ModuleSetBuilder<
  TModules extends Partial<FFMandatoryModules<any>>,
  TState extends FFMandatoryState = ActualMandatoryStateFromModules<TModules>
> {
  private defaultModules: FFMandatoryModulesExactModuleType<TState> = defaultModules;
  private modules: TModules;

  constructor(modules: TModules) {
    this.modules = modules;
  }

  build(): MergeModules<TModules, FFMandatoryModulesExactModuleType<TState>> {
    const mergedModules = {
      ...this.defaultModules,
      ...this.modules,
    };
    return mergedModules;
  }
}


/*// This assumes that each module (e.g. AuthModule) is generic in its state type.
type ActualMandatoryStateFromModules<
  TModules extends Partial<FFMandatoryModules<any>>,
> = {
  [K in keyof FFMandatoryModules<any>]: K extends keyof TModules
    ? TModules[K] extends AuthModule<infer S>
      ? S
      : FFMandatoryModules<any>[K] extends AuthModule<infer S>
        ? S
        : never
    : FFMandatoryModules<any>[K] extends AuthModule<infer S>
      ? S
      : never;
};

type MergeModules<TUserModules, TDefaultModules> = Omit<
  TDefaultModules,
  keyof TUserModules
> &
  TUserModules;

export class ModuleSetBuilder<
  TModules extends Partial<FFMandatoryModules<any>>,
  TState extends FFMandatoryState = ActualMandatoryStateFromModules<TModules>,
> {
  private defaultModules: FFMandatoryModulesExactModuleType<TState> =
    defaultModules;
  private modules: TModules;

  constructor(modules: TModules) {
    this.modules = modules;
  }

  build(): MergeModules<TModules, FFMandatoryModulesExactModuleType<TState>> {
    // Merge the defaults with the user modules.
    const mergedModules = {
      ...this.defaultModules,
      ...this.modules,
    };
    return mergedModules;
  }
}*/

/*
export const defaultModules: FFMandatoryModules = {
  [MandatoryModuleNames.Authentication]: new DummyAuthenticator(),
};

type MergeModules<TUserModules, TDefaultModules> = Omit<
  TDefaultModules,
  keyof TUserModules
> &
  TUserModules;

export class ModuleSetBuilder<
  TModules extends Partial<FFMandatoryModules<any>>,
  TAuthState extends AuthState = (TModules extends {auth: AuthModule<infer S>}
    ? S
    : AuthState) &
    AuthState,
> {
  private defaultModules: FFMandatoryModules<TAuthState> = defaultModules;
  private modules: TModules;

  constructor(modules: TModules) {
    this.modules = modules;
  }

  build() {
    const mergedModules = {
      ...this.defaultModules,
      ...this.modules,
    } as MergeModules<TModules, FFMandatoryModules<TAuthState>>;
    return mergedModules;
  }
}
*/

/*
type MergeModules<TUserModules, TDefaultModules> = Omit<
  TDefaultModules,
  keyof TUserModules
> &
  TUserModules;

export class ModuleSetBuilder<
  TModules extends Partial<FFMandatoryModules<TAuthState>>,
  TAuthState extends AuthState,
> {
  private defaultModules: FFMandatoryModules<TAuthState> = defaultModules;
  private modules: TModules;

  constructor(modules: TModules) {
    this.modules = modules;
  }

  build(): MergeModules<TModules, FFMandatoryModules<TAuthState>> {
    // Create a merged object where user-provided modules override defaults.
    const mergedModules = {
      ...this.defaultModules,
      ...this.modules,
    } as MergeModules<TModules, FFMandatoryModules<TAuthState>>;

    return mergedModules;
  }
}
*/

// An object of this class will contain all reducers etc. of all modules.
// They are added by the corresponding processors. The object will be passed
// to a store builder function to create the store.
export class StoreConfig {
  constructor(
    public reducers: FFMandatoryReducers & Record<string, Reducer>,
    public middleware: Middleware[] = [],
    public enhancers: StoreEnhancer[] = [],
    public additional: Record<string, unknown> = {},
  ) {}
}

// This Builder builds the final store config. The Builder will be passed to
// the processor methods in order to allow adding of reducers etc. This Builder
// is necessary to ensure that all mandatory reducers (for example one root
// reducer for the auth key) were added. Inspect the build method for further
// insight.
export class StoreConfigBuilder {
  private reducers: Record<string, Reducer> = {};
  private middleware: Middleware[] = [];
  private enhancers: StoreEnhancer[] = [];
  // This field is used to allow users to add additional values with custom processors to use them inside
  // a custom storeBuilder
  private extras: Record<string, unknown> = {};

  constructor() {}

  public setReducer(key: string, reducer: Reducer): this {
    this.reducers[key] = reducer;
    return this;
  }

  public addMiddleware(middleware: Middleware): this {
    this.middleware.push(middleware);
    return this;
  }

  public addEnhancer(enhancer: StoreEnhancer): this {
    this.enhancers.push(enhancer);
    return this;
  }

  public setExtras(key: string, value: unknown): this {
    this.extras[key] = value;
    return this;
  }

  build() {
    // This logic is necessary to ensure that every reducer key is present and has a module as it's value.
    const {[MandatoryModuleNames.Authentication]: auth, ...otherReducers} =
      this.reducers;

    const finalReducers: FFMandatoryReducers & Record<string, Reducer> = {
      ...otherReducers,
      [MandatoryModuleNames.Authentication]:
        auth ?? defaultModules.auth.slice.reducer,
    };

    return new StoreConfig(
      finalReducers,
      this.middleware,
      this.enhancers,
      this.extras,
    );
  }
}

// The Store Builder is used by the developer to create a Redux store and pass it to the
// framework. It includes different processor modules which process a corresponding module.
// While the Builder provides default processor methods, they can be replaced allowing for
// customization of module processing. Furthermore the Builder contains a storeBuilder method
// which is used to build the store after all processor methods were executed. The storeBuilder
// can be replaced to customize the build of the Redux store.
export class StoreBuilder<
  TAuthState extends AuthState,
  TUserModules extends GenericModules,
> {
  private storeConfigBuilder: StoreConfigBuilder = new StoreConfigBuilder();

  // These are mandatory modules and processors which are essential for the framework as
  // it uses values and methods of the processed modules.
  private mandatoryModulesAndProcessors: ModuleAndProcessorMap<
  FFMandatoryModules<TAuthState>
>;

  // These are optional and modules and processors of the user.
  private userModulesAndProcessors:
    | ModuleAndProcessorMap<TUserModules>
    | undefined;

  private storeBuilder: (
    storeConfig: StoreConfig,
  ) => EnhancedStore<FFMandatoryState> = defaultStoreBuilder;

  constructor(
    ffMandatoryModules: FFMandatoryModules<TAuthState>,
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

  setFrameworkModuleProcessor<K extends keyof FFMandatoryModules<TAuthState>>(
    moduleType: K,
    processor: ModuleProcessorFunction<
      (typeof this.mandatoryModulesAndProcessors)[K]["module"]
    >,
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

export const defaultStore = new StoreBuilder(defaultModules).build();

// The extended type is taken from the ReturnType type.
export type RootState<TStoreState extends (...args: any) => any> =
  ReturnType<TStoreState>;
export type AppDispatch<TStoreDispatch> = TStoreDispatch;

export type DefaultRootState = RootState<typeof defaultStore.getState>;
export type DefaultAppDispatch = AppDispatch<typeof defaultStore.dispatch>;
export type DefaultThunkDispatch = ThunkDispatch<
  DefaultRootState,
  unknown,
  Action<string>
>;

export const useDefaultDispatch: () => DefaultThunkDispatch = useDispatch;
export const useDefaultSelector: TypedUseSelectorHook<DefaultRootState> =
  useSelector;

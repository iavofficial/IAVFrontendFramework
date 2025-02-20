import {
  configureStore,
  EnhancedStore,
  Middleware,
  Reducer,
  StoreEnhancer,
} from "@reduxjs/toolkit";
import {
  AuthModule,
  AuthState,
} from "@iavofficial/frontend-framework-shared-types/authenticationProvider";
import {FFModule} from "@iavofficial/frontend-framework-shared-types/module";
import { TypedUseSelectorHook, useSelector } from "react-redux";

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState<TStoreState extends (...args: any) => any> = ReturnType<TStoreState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch<TStoreDispatch> = TStoreDispatch;

interface MinimalStoreState {
  auth: AuthState;
}

interface FFModules {
  auth: AuthModule<AuthState>;
}

type UserModules = Record<string, FFModule>;

export const defaultModules: FFModules = {
  auth: DummyAuthenticationProvider,
};

class StoreConfig {
  constructor(
    public reducers: { auth: Reducer } & Record<string, Reducer>,
    public middleware: Middleware[] = [],
    public enhancers: StoreEnhancer[] = [],
    public additional: Record<string, any> = {}
  ) {}
}


export class StoreConfigBuilder {
  private reducers: Record<string, Reducer> = {};
  private middleware: Middleware[] = [];
  private enhancers: StoreEnhancer[] = [];
  // This field is used to allow users to add additional values with custom processors to use them inside
  // a custom storeBuilder
  private additional: Record<string, any> = {};

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

  public setAdditional(key: string, value: any): this {
    this.additional[key] = value;
    return this;
  }
  
  build() {
    if (!this.reducers.auth) {
      this.reducers.auth = defaultModules.auth.slice.reducer;
    }
    return new StoreConfig(this.reducers, this.middleware, this.enhancers, this.additional);
  }
}

export type ModuleProcessorFunction<M extends FFModule> = (
  module: M,
  config: StoreConfigBuilder,
) => void;

interface ModuleEntry<M extends FFModule> {
  module: M;
  processor: ModuleProcessorFunction<M>;
}

type ModuleAndProcessorMap<ModuleType extends object> = {
  [K in keyof ModuleType]: ModuleType[K] extends FFModule
    ? ModuleEntry<ModuleType[K]>
    : never;
};

export class StoreBuilder<TUserModules extends UserModules> {
  private storeConfigBuilder: StoreConfigBuilder = new StoreConfigBuilder();

  private frameworkModulesAndProcessors: ModuleAndProcessorMap<FFModules>;

  private userModulesAndProcessors:
    | ModuleAndProcessorMap<TUserModules>
    | undefined;

  private storeBuilder: (
    storeConfig: StoreConfig,
  ) => EnhancedStore<MinimalStoreState> = defaultStoreBuilder;

  constructor(
    ffModules: FFModules,
    userModulesAndProcessors?: ModuleAndProcessorMap<TUserModules>,
  ) {
    this.frameworkModulesAndProcessors = {
      auth: {
        module: ffModules.auth,
        processor: defaultAuthModuleProcessor,
      },
    };

    if (userModulesAndProcessors) {
      this.userModulesAndProcessors = userModulesAndProcessors;
    }
  }

  setFrameworkModuleProcessor<K extends keyof FFModules>(
    moduleType: K,
    processor: ModuleProcessorFunction<FFModules[K]>,
  ) {
    this.frameworkModulesAndProcessors[moduleType].processor = processor;
  }

  setUserModuleProcessor<K extends keyof TUserModules>(
    moduleType: K,
    processor: ModuleProcessorFunction<TUserModules[K]>,
  ) {
    if (this.userModulesAndProcessors) {
      this.userModulesAndProcessors[moduleType].processor = processor;
    }
  }

  build() {
    executeProcessorsForModules(
      this.frameworkModulesAndProcessors,
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

const executeProcessorsForModules = <TModules extends object>(
  modulesAndProcessors: ModuleAndProcessorMap<TModules>,
  storeConfigBuilder: StoreConfigBuilder,
) => {
  (Object.keys(modulesAndProcessors) as (keyof TModules)[]).forEach((key) => {
    const entry = modulesAndProcessors[key];
    entry.processor(entry.module, storeConfigBuilder);
  });
};

export const defaultAuthModuleProcessor = (
  authModule: AuthModule<AuthState>,
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

// Infer the `RootState` and `AppDispatch` types from the store itself
export type DefaultRootState = RootState<typeof defaultStore.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type DefaultAppDispatch = AppDispatch<typeof defaultStore.dispatch>;

export const useDefaultSelector: TypedUseSelectorHook<DefaultRootState> = useSelector;

// TODO HINTS:
/*
- Important: Both Module Set and Store have to be passed to the GlobalDataLayer in order to integrate the Provider with the store and call all useModuleLifecycle Hooks of all modules.
- Maybe there should be a replaceable store creation method to allow for attaching middleware or other Redux features which not have been thought of.
*/

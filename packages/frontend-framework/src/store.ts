import { configureStore, EnhancedStore, Middleware, Reducer, StoreEnhancer } from '@reduxjs/toolkit';
import { AuthModule, AuthState } from "@iavofficial/frontend-framework-shared-types/authenticationProvider";
import { FFModule } from '@iavofficial/frontend-framework-shared-types/module';


// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

interface MinimalStoreState {
  auth: AuthState;
}

interface FFModules {
  auth: AuthModule<AuthState>;
}

type UserModules = Record<string, FFModule>;

export const defaultModules: FFModules = {
  auth: DummyAuthenticationProvider
};

export class StoreConfig {
  public reducers: Record<string, Reducer> = {};
  public middleware: Middleware[] = [];
  public enhancers: StoreEnhancer[] = [];
  // This field is used to allow users to add additional values with custom processors to use them inside
  // a custom storeBuilder
  public additional: Record<string, any> = {};
}

export type ModuleProcessorFunction<M extends FFModule> = (module: M, config: StoreConfig) => StoreConfig;

interface ModuleEntry<M extends FFModule> {
  module: M;
  processor: ModuleProcessorFunction<M>;
}

type ModuleAndProcessorMap<ModuleType extends object> = {
  [K in keyof ModuleType]: ModuleType[K] extends FFModule ? ModuleEntry<ModuleType[K]> : never;
};

export class StoreBuilder<TUserModules extends UserModules> {
  private storeConfig: StoreConfig = new StoreConfig();

  private frameworkModulesAndProcessors: ModuleAndProcessorMap<FFModules>;

  private userModulesAndProcessors: ModuleAndProcessorMap<TUserModules> | undefined;

  private storeBuilder: (storeConfig: StoreConfig) => EnhancedStore<MinimalStoreState> = defaultStoreBuilder;

  constructor(ffModules: FFModules, userModulesAndProcessors?: ModuleAndProcessorMap<TUserModules>) {
    this.frameworkModulesAndProcessors = {
      auth: {
        module: ffModules.auth,
        processor: defaultAuthModuleProcessor
      }
    };

    if (userModulesAndProcessors) {
      this.userModulesAndProcessors = userModulesAndProcessors;
    }
  }
  
  setFrameworkModuleProcessor<K extends keyof FFModules>(moduleType: K, processor: ModuleProcessorFunction<FFModules[K]>) {
    this.frameworkModulesAndProcessors[moduleType].processor = processor;
  }
  
  setUserModuleProcessor<K extends keyof TUserModules>(moduleType: K, processor: ModuleProcessorFunction<TUserModules[K]>) {
    if(this.userModulesAndProcessors) {
      this.userModulesAndProcessors[moduleType].processor = processor;
    }
  }

  build() {
    executeProcessorsForModules(this.frameworkModulesAndProcessors, this.storeConfig);
  
    if (this.userModulesAndProcessors) {
      executeProcessorsForModules(this.userModulesAndProcessors, this.storeConfig);
    }

    return this.storeBuilder(this.storeConfig);
  }
}

const executeProcessorsForModules = <TModules extends object>(
  modulesAndProcessors: ModuleAndProcessorMap<TModules>,
  storeConfig: StoreConfig
): StoreConfig => {
  let retStoreConfig = { ...storeConfig };
  (Object.keys(modulesAndProcessors) as (keyof TModules)[]).forEach((key) => {
    const entry = modulesAndProcessors[key];
    retStoreConfig = entry.processor(entry.module, retStoreConfig);
  });
  return retStoreConfig;
};

export const defaultAuthModuleProcessor = (authModule: AuthModule<AuthState>, storeConfig: StoreConfig) => {
  storeConfig.reducers = { ...storeConfig.reducers, auth: authModule.slice.reducer };
  return storeConfig;
}

export const defaultStoreBuilder = (storeConfig: StoreConfig) => {  
  const store = configureStore({
    reducer: storeConfig.reducers,
    middleware: ((getDefaultMiddleware: Function) => getDefaultMiddleware().concat(storeConfig.middleware)),
    enhancers: (getDefaultEnhancers: Function) => getDefaultEnhancers().concat(storeConfig.enhancers)
  });

  return store;
}

export const defaultStore = new StoreBuilder(defaultModules).build();

// TODO HINTS:
/*
- Important: Both Module Set and Store have to be passed to the GlobalDataLayer in order to integrate the Provider with the store and call all useModuleLifecycle Hooks of all modules.
- Maybe there should be a replaceable store creation method to allow for attaching middleware or other Redux features which not have been thought of.
*/
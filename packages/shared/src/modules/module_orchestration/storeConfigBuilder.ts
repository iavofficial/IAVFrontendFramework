// This Builder builds the final store config. The Builder will be passed to
// the processor methods in order to allow adding of reducers etc. This Builder
// is necessary to ensure that all mandatory reducers (for example one root
// reducer for the auth key) were added. Inspect the build method for further

import {Middleware, Reducer, StoreEnhancer} from "@reduxjs/toolkit";
import {
  FFMandatoryReducers,
  FFMandatoryState,
  FFMandatoryStoreModules,
} from "../../types/modules/moduleOrchestrationTypes";
import {StoreConfig} from "./storeConfig";

export class StoreConfigBuilder<TState extends FFMandatoryState> {
  private reducers: FFMandatoryReducers<TState>;
  private middleware: Middleware[] = [];
  private enhancers: StoreEnhancer[] = [];
  // This field is used to allow users to add additional values with custom processors to use them inside
  // a custom storeBuilder
  private extras: Record<string, unknown> = {};

  constructor(modules: FFMandatoryStoreModules<TState>) {
    let reducers = {};
    let middleware: Middleware[] = [];
    let enhancers: StoreEnhancer[] = [];
    let extras = {};
    Object.entries(modules).forEach(([key, module]) => {
      reducers = {...reducers, [key]: module.slice.reducer};
      if (module.middleware) {
        middleware = [...middleware, ...module.middleware];
      }
      if (module.enhancers) {
        enhancers = [...enhancers, ...module.enhancers];
      }
      extras = {...extras, ...module.extras};
    });
    this.reducers = reducers as FFMandatoryReducers<TState>;
    this.middleware = middleware;
    this.enhancers = enhancers;
    this.extras = extras;
  }

  public setReducer<K extends keyof TState>(key: K, reducer: Reducer<TState[K]>): this {
    this.reducers[key] = reducer;
    return this;
  }

  public setMiddleware(middleware: Middleware[]): this {
    this.middleware = middleware;
    return this;
  }

  public setEnhancers(enhancers: StoreEnhancer[]): this {
    this.enhancers = enhancers;
    return this;
  }

  public setExtras(key: string, value: unknown): this {
    this.extras[key] = value;
    return this;
  }

  build() {
    return new StoreConfig(
      this.reducers,
      this.middleware,
      this.enhancers,
      this.extras,
    );
  }
}

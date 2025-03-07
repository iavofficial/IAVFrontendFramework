// This Builder builds the final store config. The Builder will be passed to
// the processor methods in order to allow adding of reducers etc. This Builder
// is necessary to ensure that all mandatory reducers (for example one root
// reducer for the auth key) were added. Inspect the build method for further

import { Middleware, Reducer, StoreEnhancer } from "@reduxjs/toolkit";
import { FFMandatoryReducers } from "../../types/modules/moduleOrchestrationTypes";
import { StoreConfig } from "./storeConfig";
import { defaultModules } from "./moduleDefaults";
import { MandatoryModuleNames } from "../../constants/mandatoryModuleNames";

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
// An object of this class will contain all reducers etc. of all modules.
// They are added by the corresponding processors. The object will be passed

import { Middleware, Reducer, StoreEnhancer } from "@reduxjs/toolkit";
import { FFMandatoryReducers, FFMandatoryState } from "../../types/modules/moduleOrchestrationTypes";

// to a store builder function to create the store.
export class StoreConfig<TState extends FFMandatoryState> {
    constructor(
      public reducers: FFMandatoryReducers<TState> & Record<string, Reducer>,
      public middleware: Middleware[] = [],
      public enhancers: StoreEnhancer[] = [],
      public additional: Record<string, unknown> = {},
    ) {}
  }
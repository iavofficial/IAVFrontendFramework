import {Middleware, Slice, StoreEnhancer} from "@reduxjs/toolkit";

export type ModuleLifecycleHook = () => {renderChildren: boolean} & Record<
  string,
  unknown
>;

export type FFModule = {
  useModuleLifecycle?: ModuleLifecycleHook;
}

export type FFStoreModule = {
  slice?: Slice;
  middleware?: Middleware[];
  enhancers?: StoreEnhancer[];
  extras?: object;
} & FFModule;
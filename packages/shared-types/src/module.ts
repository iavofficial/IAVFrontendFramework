import {Middleware, Slice, StoreEnhancer} from "@reduxjs/toolkit";

export type ModuleLifecycleHook = () => {renderChildren: boolean} & Record<
  string,
  unknown
>;

export type FFStoreModule = {
  slice?: Slice;
  middleware?: Middleware[];
  enhancers?: StoreEnhancer[];
  useModuleLifecycle?: ModuleLifecycleHook;
  extras?: object;
}

import {Middleware, Slice, StoreEnhancer} from "@reduxjs/toolkit";

export type ModuleLifecycleHook = () => {renderChildren: boolean} & Record<
  string,
  any
>;

export type FFStoreModule = Partial<{
  slice: Slice;
  middleware: Middleware[];
  enhancers: StoreEnhancer[];
  additional: Record<string, unknown>;
  // TODO: What to do with this? --> Maybe decide when implementing routing.
  //  useModuleLifecycle: ModuleLifecycleHook;
}>;

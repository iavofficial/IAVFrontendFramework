import {Middleware, Slice, StoreEnhancer} from "@reduxjs/toolkit";

export type ModuleLifecycleHook = () => {renderChildren: boolean} & Record<
  string,
  any
>;

export type FFModule = Partial<{
  slice: Slice;
  useModuleLifecycle: ModuleLifecycleHook;
  middleware: Middleware[];
  enhancers: StoreEnhancer[];
  additional: Record<string, unknown>;
}>;

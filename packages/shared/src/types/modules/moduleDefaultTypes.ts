import { AppDispatch, MergeModules, RootState } from "./moduleOrchestrationTypes";
import { Action, ThunkDispatch } from "@reduxjs/toolkit";
import { defaultNonStoreModules, defaultStore, defaultStoreModules } from "../../modules/module_orchestration/moduleDefaults";
import { TypedUseSelectorHook } from "react-redux";

export type DefaultStoreModules = typeof defaultStoreModules;

export type DefaultNonStoreModules = typeof defaultNonStoreModules;

export type AllDefaultModules = MergeModules<
  DefaultNonStoreModules,
  DefaultStoreModules
>;

export type DefaultRootState = RootState<DefaultStoreGetState>;
export type DefaultAppDispatch = AppDispatch<DefaultStoreDispatch>;
export type DefaultThunkDispatch = ThunkDispatch<
  DefaultRootState,
  unknown,
  Action<string>
>;

export type DefaultStore = typeof defaultStore;
export type DefaultStoreGetState = typeof defaultStore.getState;
export type DefaultStoreDispatch = typeof defaultStore.dispatch;

export type DefaultDispatchFunction = () => DefaultThunkDispatch;
export type DefaultSelectorFunction = () => TypedUseSelectorHook<DefaultRootState>;
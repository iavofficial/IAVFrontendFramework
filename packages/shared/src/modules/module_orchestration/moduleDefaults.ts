import {Action, ThunkDispatch} from "@reduxjs/toolkit";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {MandatoryModuleNames} from "../../constants/mandatoryModuleNames";
import {DummyAuthenticator} from "../default_modules/auth/dummyAuthenticatorModule";
import {StoreBuilder} from "./storeBuilder";
import {
  AppDispatch,
  FFMandatoryStoreModules,
  RootState,
} from "../../types/modules/moduleOrchestrationTypes";

export type DefaultRootState = RootState<typeof defaultStore.getState>;
export type DefaultAppDispatch = AppDispatch<typeof defaultStore.dispatch>;
export type DefaultThunkDispatch = ThunkDispatch<
  DefaultRootState,
  unknown,
  Action<string>
>;

// This object contains the default modules which can be replaced.
export const defaultStoreModules: FFMandatoryStoreModules = {
  [MandatoryModuleNames.Authentication]: new DummyAuthenticator(),
};

export type DefaultStoreModules = typeof defaultStoreModules;

export const defaultNonStoreModules = {};

export type DefaultNonStoreModules = typeof defaultNonStoreModules;

export const allDefaultModules = {
  ...defaultStoreModules,
  ...defaultNonStoreModules,
};

export type AllDefaultModules = typeof allDefaultModules;

export const defaultStore = new StoreBuilder(defaultStoreModules).build();

export type DefaultStore = typeof defaultStore;

export const useDefaultDispatch: () => DefaultThunkDispatch = useDispatch;
export const useDefaultSelector: TypedUseSelectorHook<DefaultRootState> =
  useSelector;

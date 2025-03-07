import {Action, ThunkDispatch} from "@reduxjs/toolkit";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {
  AppDispatch,
  FFMandatoryModules,
  RootState,
} from "./moduleOrchestrationTypes";
import {MandatoryModuleNames} from "../../constants/mandatoryModuleNames";
import {DummyAuthenticator} from "../default_modules/auth/dummyAuthenticatorModule";
import {StoreBuilder} from "./storeBuilder";

export type DefaultRootState = RootState<typeof defaultStore.getState>;
export type DefaultAppDispatch = AppDispatch<typeof defaultStore.dispatch>;
export type DefaultThunkDispatch = ThunkDispatch<
  DefaultRootState,
  unknown,
  Action<string>
>;

// This object contains the default modules which can be replaced.
export const defaultModules: FFMandatoryModules = {
  [MandatoryModuleNames.Authentication]: new DummyAuthenticator(),
};

export const defaultStore = new StoreBuilder(defaultModules).build();

export const useDefaultDispatch: () => DefaultThunkDispatch = useDispatch;
export const useDefaultSelector: TypedUseSelectorHook<DefaultRootState> =
  useSelector;

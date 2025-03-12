/**
 * Copyright © 2025 IAV GmbH Ingenieurgesellschaft Auto und Verkehr, All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

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

export type DefaultRootState = RootState<DefaultStoreState>;
export type DefaultAppDispatch = AppDispatch<DefaultStoreDispatch>;
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

export const defaultStore = new StoreBuilder({
  frameworkStoreModules: defaultStoreModules,
}).build();

export type DefaultStore = typeof defaultStore;
export type DefaultStoreState = typeof defaultStore.getState;
export type DefaultStoreDispatch = typeof defaultStore.dispatch;

export const useDefaultDispatch: () => DefaultThunkDispatch = useDispatch;
export const useDefaultSelector: TypedUseSelectorHook<DefaultRootState> =
  useSelector;

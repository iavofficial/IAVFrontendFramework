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

import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {MandatoryModuleNames} from "../../constants/moduleNames";
import {DummyAuthenticator} from "../default_modules/auth/dummyAuthenticatorModule";
import {StoreBuilder} from "./storeBuilder";

import {FFMandatoryStoreModules} from "../../types/modules/moduleOrchestrationTypes";
import {ReactRouterRouter} from "../default_modules/router/reactRouterRouterModule";
import {I18NextInternationalizer} from "../default_modules/internationalization/i18NextInternationalizerModule";
import {UIModule} from "../default_modules/ui/uiModule";
import type {
  DefaultRootState,
  DefaultThunkDispatch,
} from "../../types/modules/moduleDefaultTypes";

// This object contains the default modules which can be replaced.
export const defaultStoreModules: FFMandatoryStoreModules = {
  [MandatoryModuleNames.Authenticator]: new DummyAuthenticator(),
  [MandatoryModuleNames.Internationalizer]: new I18NextInternationalizer(),
  [MandatoryModuleNames.UI]: new UIModule(),
};

export const defaultNonStoreModules = {
  [MandatoryModuleNames.Router]: new ReactRouterRouter(),
};

export const allDefaultModules = {
  ...defaultStoreModules,
  ...defaultNonStoreModules,
};

export const defaultStore = new StoreBuilder({
  frameworkStoreModules: defaultStoreModules,
}).build();

export const useDefaultDispatch: () => DefaultThunkDispatch = useDispatch;
export const useDefaultSelector: TypedUseSelectorHook<DefaultRootState> =
  useSelector;

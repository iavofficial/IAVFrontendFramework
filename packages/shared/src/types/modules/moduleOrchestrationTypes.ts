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

import {Reducer} from "@reduxjs/toolkit";
import {FFStoreModule} from "../../types/modules/generalModule";
import {
  MandatoryModuleNames,
  USER_MODULES_PREFIX,
} from "../../constants/moduleNames";
import {AuthModule, AuthState} from "./auth/authenticatorModule";
import {StoreConfigBuilder} from "../../modules/module_orchestration/storeConfigBuilder";
import {Exact, ExactPartial} from "../util-types/exact";
import {RestrictKeyToPrefix} from "../util-types/restrictKeyToPrefix";
import {DefaultNonStoreModules} from "../../modules/module_orchestration/moduleDefaults";

export type FFStoreModules<TModulesState = unknown> = {
  [K in keyof TModulesState]: FFStoreModule<TModulesState[K]>;
};

// The (default) mandatory state (which will be the state of different module's slices)
export type FFMandatoryState = {
  [MandatoryModuleNames.Authentication]: AuthState;
};

// All mandatory modules with minimal setup which is needed by the framework.
// These modules in the given minimal setup are needed in order to provide
// essential values and methods to the framework, for example login.
// So the minimal configuration is exactly the set of values and methods
// used by the framework itself.
export type FFMandatoryStoreModules<
  TModulesState extends FFMandatoryState = FFMandatoryState,
> = {
  [MandatoryModuleNames.Authentication]: AuthModule<
    TModulesState[typeof MandatoryModuleNames.Authentication]
  >;
};

// The types of all default M mandatory modules without a state for the store.
export type FFMandatoryNonStoreModules = {};

export type FFAllMandatoryModules<
  TModulesState extends FFMandatoryState = FFMandatoryState,
> = FFMandatoryStoreModules<TModulesState> & FFMandatoryNonStoreModules;

// It is concluded that every mandatory state will have a root reducer object.
// Without the possiblity of changing values (so the existence of reducers)
// state is not sensible.
export type FFMandatoryReducers<TModulesState extends FFMandatoryState> = {
  [K in keyof TModulesState]: Reducer<TModulesState[K]>;
};

// The user can provide additional modules which aren't used by the
// framework itself.
export type GenericModules = Record<string, FFStoreModule<unknown>>;

// Objects of this type aggragate a module and it's corresponding processor
// method. The following example shows it's structure:
// {auth: {module: ..., processor: ...}, ...}
// The effect of never in this case is that there cannot be a key with a value
// which does not extend FFStoreModule.
export type ModuleAndProcessorMap<
  TModules extends FFStoreModules,
  TFrameworkModulesState extends FFMandatoryState,
> = {
  [K in keyof TModules]: TModules[K] extends FFStoreModule<
    ExtractModuleState<TModules[K]>
  >
    ? ModuleEntry<TModules[K], TFrameworkModulesState>
    : never;
};

// This type defines the structure of one entry inside the ModuleAndProcessorMap.
export interface ModuleEntry<
  TModule,
  TFrameworkModulesState extends FFMandatoryState,
> {
  module: TModule;
  processor?: ModuleProcessorFunction<TModule, TFrameworkModulesState>;
}

// Processor functions are used to process single modules. They can be
// replaced in order to allow the developer to implement custom processing,
// since it is not possible to think of every possible processing step which
// could occur at development of the framework.
export type ModuleProcessorFunction<
  TModule,
  TFrameworkModulesState extends FFMandatoryState,
> = (
  module: TModule,
  config: StoreConfigBuilder<TFrameworkModulesState>,
) => void;

// Using this type the State Type of a Module can be iferred.
export type ExtractModuleState<T> =
  T extends FFStoreModule<infer S> ? S : never;

// This type creates an object of the specific state of all modules, for example:
// {auth: AwsAuthenticatorState, routing: ReactRouterRouterState}
export type ActualMandatoryStateFromModules<
  TModules extends Partial<FFMandatoryStoreModules>,
> = {
  [K in keyof FFMandatoryStoreModules]: K extends keyof TModules
    ? ExtractModuleState<TModules[K]>
    : ExtractModuleState<FFMandatoryStoreModules[K]>;
};

export type ActualUserModulesStateFromModules<TModules> = {
  [K in keyof TModules]: ExtractModuleState<TModules[K]>;
};

// This type merges two module types. If there are duplicate keys regarding
// both types, the keys of TDefaultModules will be overwritten.
export type MergeModules<TDefault, TOverrides> = Omit<
  TDefault,
  keyof TOverrides
> &
  TOverrides;

// The extended type is taken from the ReturnType type.
export type RootState<TStoreState extends (...args: any) => any> =
  ReturnType<TStoreState>;

export type AppDispatch<TStoreDispatch> = TStoreDispatch;

// It has to be ensured that frameworkStoreModules has no more keys than
// there are mandatory modules as this attribute's purpose is to override
// default store modules.
export type TParamFrameworkStoreModules<
  TModules extends FFMandatoryStoreModules<TFrameworkModuleState>,
  TFrameworkModuleState extends FFMandatoryState,
> = Exact<FFMandatoryStoreModules<TFrameworkModuleState>, TModules>;

export type TParamFrameworkStoreModulesPartial<
  TModules extends Partial<FFMandatoryStoreModules<TFrameworkModuleState>>,
  TFrameworkModuleState extends FFMandatoryState,
> = ExactPartial<FFMandatoryStoreModules<TFrameworkModuleState>, TModules>;

// TUserModules should not be used to override mandatory modules.
// Because of this Omit is used in order to prevent userStoreModules
// to have keys of FFMandatoryStoreModules.
// Furthermore, RestrictKeyToPrefix is used in order to ensure that
// every user module begins with a specific prefix for user modules.
// By doing this a collision of keys for new Framework Modules with
// user modules can be avoided.
export type TParamUserStoreModules<
  TUserStoreModules extends FFStoreModules<TUserModulesState> &
    Partial<DefaultNonStoreModules>,
  TUserModulesState,
> = Exact<
  RestrictKeyToPrefix<
    Omit<TUserStoreModules, keyof FFMandatoryStoreModules>,
    typeof USER_MODULES_PREFIX
  >,
  TUserStoreModules
>;

export type TParamFrameworkNonStoreModules<
  TFrameworkNonStoreModules extends DefaultNonStoreModules,
> = Exact<Partial<DefaultNonStoreModules>, TFrameworkNonStoreModules>;

export type TParamFrameworkNonStoreModulesPartial<
  TFrameworkNonStoreModules extends Partial<DefaultNonStoreModules>,
> = ExactPartial<Partial<DefaultNonStoreModules>, TFrameworkNonStoreModules>;

export type TParamUserNonStoreModules<TUserNonStoreModules> = Exact<
  RestrictKeyToPrefix<TUserNonStoreModules, typeof USER_MODULES_PREFIX>,
  TUserNonStoreModules
>;
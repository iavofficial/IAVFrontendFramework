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
import {MandatoryModuleNames} from "../../constants/mandatoryModuleNames";
import {AuthModule, AuthState} from "./auth/authenticatorModule";
import {StoreConfigBuilder} from "../../modules/module_orchestration/storeConfigBuilder";
/*
To add a new mandatory module:
1. Add the state (of it's slice) to FFMandatoryState.
2. Add the type of the module in minimal configuration to FFMandatoryStoreModules. Minimal
   configuration means that the module includes just only all values and methods which
   are used by the framework itself. This is necessary to ensure that only modules can
   be used which are of this type and because of this provide all necessary values and
   methods to the framework.
3. Add an instance of a default module for this key.
4. Inside the build method of the StoreConfigBuilder: Add the root reducer of your default
   module like it is done for auth. This is necessary to ensure that all mandatory reducers
   are present when building the redux store.
5. Create a default processor for the module.
6. Inside the constructor of StoreBuilder: Add an object with the corresponding key to
   include the passed module and the default processor inside the ModuleAndProcessorMap
   for mandatory modules.
*/

// The mandatory state (which will be the state of different module's slices)
export type FFMandatoryState = {
  [MandatoryModuleNames.Authentication]: AuthState;
};

// It is concluded that every mandatory state will have a root reducer object.
// Without the possiblity of changing values (so the existence of reducers)
// state is not sensible.
export type FFMandatoryReducers<TState extends FFMandatoryState> = {
  [K in keyof TState]: Reducer<TState[K]>;
};

// All mandatory modules with minimal setup which is needed by the framework.
// These modules in the given minimal setup are needed in order to provide
// essential values and methods to the framework, for example login.
// So the minimal configuration is exactly the set of values and methods
// used by the framework itself.
export type FFMandatoryStoreModules<
  TState extends FFMandatoryState = FFMandatoryState,
> = {
  [MandatoryModuleNames.Authentication]: AuthModule<
    TState[typeof MandatoryModuleNames.Authentication]
  >;
};

export type FFMandatoryNonStoreModules = {};

export type FFAllMandatoryModules<
  TState extends FFMandatoryState = FFMandatoryState,
> = FFMandatoryStoreModules<TState> & FFMandatoryNonStoreModules;

// The user can provide additional modules which aren't used by the
// framework itself.
export type GenericModules = Record<string, FFStoreModule>;

// Processor functions are used to process single modules. They can be
// replaces in order to allow the developer to implement custom processing,
// since it is not possible to think of every possible processing step which
// could occur at development of the framework.
export type ModuleProcessorFunction<
  M extends FFStoreModule,
  TState extends FFMandatoryState,
> = (module: M, config: StoreConfigBuilder<TState>) => void;

// Objects of this type aggragate a module and it's corresponding processor
// method. The following example shows it's structure:
// {auth: {module: ..., processor: ...}, ...}
// The effect of never in this case is that there cannot be a key with a value
// which does not extend FFStoreModule.
export type ModuleAndProcessorMap<
  ModuleType extends object,
  TState extends FFMandatoryState,
> = {
  [K in keyof ModuleType]: ModuleType[K] extends FFStoreModule
    ? ModuleEntry<ModuleType[K], TState>
    : never;
};

// This type defines the structure of one entry inside the ModuleAndProcessorMap.
export interface ModuleEntry<
  M extends FFStoreModule,
  TState extends FFMandatoryState,
> {
  module: M;
  processor?: ModuleProcessorFunction<M, TState>;
}

// Using this type the State Type of a Module can be iferred.
export type ExtractModuleState<T> =
  T extends FFStoreModule<infer S> ? S : never;

// This type creates an object of the specific state of all modules, for example:
// {auth: AWSAuthenticatorState, routing: ReactRouterRouterState}
export type ActualMandatoryStateFromModules<
  TModules extends Partial<FFMandatoryStoreModules>,
> = {
  [K in keyof FFMandatoryStoreModules]: K extends keyof TModules
    ? ExtractModuleState<TModules[K]>
    : ExtractModuleState<FFMandatoryStoreModules[K]>;
};

// This type merges two module types. If there are duplicate keys regarding
// both types, the keys of TDefaultModules will be overwritten.
export type MergeModules<TCustomModules, TDefaultModules> = Omit<
  TDefaultModules,
  keyof TCustomModules
> &
  TCustomModules;

// The extended type is taken from the ReturnType type.
export type RootState<TStoreState extends (...args: any) => any> =
  ReturnType<TStoreState>;
export type AppDispatch<TStoreDispatch> = TStoreDispatch;

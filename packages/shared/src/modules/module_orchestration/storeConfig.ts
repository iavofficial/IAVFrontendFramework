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

// An object of this class will contain all reducers etc. of all modules.
// They are added by the corresponding processors. The object will be passed

import { Middleware, Reducer, StoreEnhancer } from "@reduxjs/toolkit";
import { FFMandatoryReducers, FFMandatoryState } from "../../types/modules/moduleOrchestrationTypes";

// to a store builder function to create the store.
export class StoreConfig<TState extends FFMandatoryState> {
    constructor(
      public reducers: FFMandatoryReducers<TState> & Record<string, Reducer>,
      public middleware: Middleware[] = [],
      public enhancers: StoreEnhancer[] = [],
      public additional: Record<string, unknown> = {},
    ) {}
  }
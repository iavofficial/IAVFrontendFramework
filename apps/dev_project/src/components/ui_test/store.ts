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

import {
  createModules,
  StoreBuilder,
} from "@iavofficial/frontend-framework/store";
import { configureStore } from "@reduxjs/toolkit";
import { I18NextInternationalizer } from "@iavofficial/frontend-framework/defaultModules";
import { ReactRouterRouter } from "@iavofficial/frontend-framework-shared/reactRouterRouterModule";

import { MandatoryModuleNames } from "@iavofficial/frontend-framework/constants";
import { translations } from "../aws_test/translations.ts";
import CustomHeader from "./CustomHeader.tsx";
import CustomNavbar from "./CustomNavbar.tsx";
import CustomCookieBanner from "./CustomCookieBanner.tsx";
import CustomContentBar from "./CustomContentBar.tsx";
import { UIModule } from "@iavofficial/frontend-framework-shared/uiModule";

const customModules = {
  [MandatoryModuleNames.Internationalizer]: new I18NextInternationalizer({
    translationResources: translations,
  }),
  [MandatoryModuleNames.Router]: new ReactRouterRouter(),
  [MandatoryModuleNames.UI]: new UIModule({
    UILayerHeader: CustomHeader,
    UILayerNavbar: CustomNavbar,
    UILayerCookieBanner: CustomCookieBanner,
    UILayerContentBar: CustomContentBar,
  }),
};

export const modules = createModules(customModules);

export const store = new StoreBuilder(modules.storeModules)
  .setFrameworkModuleProcessor(
    MandatoryModuleNames.UI,
    (module, storeConfigBuilder) => {
      storeConfigBuilder.setReducer(
        MandatoryModuleNames.UI,
        module.slice.reducer,
      );
    },
  )
  .setFrameworkModuleProcessor(
    MandatoryModuleNames.Internationalizer,
    (module, storeConfigBuilder) => {
      storeConfigBuilder.setReducer(
        MandatoryModuleNames.Internationalizer,
        module.slice.reducer,
      );
    },
  )
  .setStoreBuilder((storeConfig) => {
    return configureStore({
      reducer: storeConfig.reducers,
      middleware: (getDefaultMiddleware: Function) =>
        getDefaultMiddleware().concat(storeConfig.middleware),
      enhancers: (getDefaultEnhancers: Function) =>
        getDefaultEnhancers().concat(storeConfig.enhancers),
    });
  })
  .build();

export const useModuleContextTyped = modules.useModuleContextTyped;
export const useModuleTyped = modules.useModuleTyped;

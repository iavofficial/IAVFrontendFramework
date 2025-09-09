/**
 * Copyright …
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  createModulesSeparately,
  StoreBuilder,
} from "@iavofficial/frontend-framework/store";
import { configureStore } from "@reduxjs/toolkit";

import { UIOrchestrator } from "@iavofficial/frontend-framework-shared/uiOrchestrator";
import { I18NextInternationalizer } from "@iavofficial/frontend-framework/defaultModules";
import { ReactRouterRouter } from "@iavofficial/frontend-framework-shared/reactRouterRouterModule";

import { MandatoryModuleNames } from "@iavofficial/frontend-framework/constants";
import { translations } from "../aws_test/translations.ts";

const frameworkStoreModules = {
  [MandatoryModuleNames.UI]: new UIOrchestrator(),
  [MandatoryModuleNames.Internationalizer]: new I18NextInternationalizer({
    translationResources: translations,
  }),
};

const frameworkNonStoreModules = {
  [MandatoryModuleNames.Router]: new ReactRouterRouter(),
};

export const modules = createModulesSeparately({
  frameworkStoreModules,
  frameworkNonStoreModules,
});

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

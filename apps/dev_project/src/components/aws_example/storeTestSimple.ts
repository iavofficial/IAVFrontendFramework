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
import { Amplify } from "aws-amplify";
import { cognitoUserPoolsTokenProvider } from "aws-amplify/auth/cognito";
import { CookieStorage } from "aws-amplify/utils";
import { AwsAuthenticator } from "@iavofficial/frontend-framework-aws-authenticator/awsAuthenticatorModule";
import { MandatoryModuleNames } from "@iavofficial/frontend-framework/constants";
import { I18NextInternationalizer } from "@iavofficial/frontend-framework/defaultModules";
import { translations } from "./translations";
import { configureStore } from "@reduxjs/toolkit";

const cognitoPool = import.meta.env.VITE_COGNITO_POOL;
const cognitoAppId = import.meta.env.VITE_COGNITO_APP_ID;
const domain = import.meta.env.VITE_DOMAIN;

const configureAmplify = () => {
  Amplify.configure({
    Auth: {
      Cognito: {
        userPoolId: cognitoPool,
        userPoolClientId: cognitoAppId,
      },
    },
  });
  cognitoUserPoolsTokenProvider.setKeyValueStorage(
    new CookieStorage({
      domain: domain,
      path: "/",
      expires: 365,
      // @ts-ignore
      secure: domain !== "localhost",
      sameSite: "lax",
    })
  );
};

const customModules = {
  [MandatoryModuleNames.Authentication]: new AwsAuthenticator({
    configureAmplify: configureAmplify,
    failOnNoLegalGroup: true,
    legalGroups: ["ADMIN", "SHOWCASE"],
  }),
  [MandatoryModuleNames.Internationalization]: new I18NextInternationalizer({
    translationResources: translations,
  }),
  userModule: new AwsAuthenticator({
    configureAmplify: configureAmplify,
    failOnNoLegalGroup: true,
    legalGroups: ["ADMIN", "SHOWCASE"],
  }),
  userTest: { text: "text" },
};

export const modules = createModules(customModules);

export const store = new StoreBuilder(modules.storeModules)
  .setFrameworkModuleProcessor(
    MandatoryModuleNames.Authentication,
    (module, storeConfigBuilder) => {}
  )
  .setUserModuleProcessor("userModule", (module, StoreConfigBuilder) => {})
  .setStoreBuilder((storeConfig) => {
    const store = configureStore({
      reducer: storeConfig.reducers,
      middleware: (getDefaultMiddleware: Function) =>
        getDefaultMiddleware().concat(storeConfig.middleware),
      enhancers: (getDefaultEnhancers: Function) =>
        getDefaultEnhancers().concat(storeConfig.enhancers),
    });
    return store;
  })
  .build();

export const useModuleContextTyped = modules.useModuleContextTyped;
export const useModuleTyped = modules.useModuleTyped;

const { modules: modulesTest } = useModuleContextTyped();
const authModule = useModuleTyped(MandatoryModuleNames.Authentication);
const userModule = useModuleTyped("userTest");

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

import translationES from "./assets/translations/es.json";
import { GlobalDataLayer } from "@iavofficial/frontend-framework/globalDataLayer";
import translationEN from "./assets/translations/en.json";
import translationDE from "./assets/translations/de.json";
import translationDECH from "./assets/translations/de-CH.json";
import Layout from "./Layout.tsx";
import {
  StoreBuilder,
} from "@iavofficial/frontend-framework/store";
import { Amplify } from "aws-amplify";
import { cognitoUserPoolsTokenProvider } from "aws-amplify/auth/cognito";
import { CookieStorage } from "aws-amplify/utils";
import { awsAuthenticationViewFactory } from "@iavofficial/frontend-framework-aws-authenticator/awsAuthenticationView";
import { AWSAuthenticator } from "@iavofficial/frontend-framework-aws-authenticator/awsAuthenticatorModule";

const cognitoPool = "eu-central-1_8weTZhK1B";
const cognitoAppId = "47qrr39ilc3qo2eu1vhm7tgg0r";
const domain = "localhost";

const configureAmplify: () => void = () => {
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
    }),
  );
};

  const modules = {
    auth: new AWSAuthenticator({
        configureAmplify: configureAmplify,
        failOnNoLegalGroup: true,
        legalGroups: ["ADMIN", "SHOWCASE"]
    })
};

export const awsAuthenticationView = awsAuthenticationViewFactory(modules.auth);

const store = new StoreBuilder(modules)
/*.setFrameworkModuleProcessor("auth", (
  authModule: AWSAuthenticator,
  storeConfigBuilder: StoreConfigBuilder,
) => {

})*/.build();

export const AppAwsAuthentication = () => {
  const translations = {
    es: {
      translation: translationES,
    },
    en: {
      translation: translationEN,
    },
    de: {
      translation: translationDE,
    },
    de_CH: {
      translation: translationDECH,
    },
  };

  return (
    <GlobalDataLayer
      store={store}
      modules={modules}
      translations={translations}
      colorSettings={{
        colorOptions: {},
      }}
    >
      <Layout />
    </GlobalDataLayer>
  );
}

export default AppAwsAuthentication;

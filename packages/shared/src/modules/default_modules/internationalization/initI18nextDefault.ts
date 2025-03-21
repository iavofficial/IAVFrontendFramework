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

import i18next from "i18next";
import {initReactI18next} from "react-i18next";
import I18nextBrowserLanguageDetector from "i18next-browser-languagedetector";
import {InitI18nextFunctionParams} from "../../../types/modules/internationalization/initI18nextFunction";

export const initI18nextDefault = (params: InitI18nextFunctionParams) => {
  const {translationResources, acceptedCookies, fallbackLang} = params;
  i18next
    .use(initReactI18next) // pass the i18n instance to react-i18next.
    .use(I18nextBrowserLanguageDetector)
    .init({
      debug: false,
      fallbackLng: fallbackLang,
      resources: translationResources,
      detection: {
        caches: [acceptedCookies ? "cookie" : ""],
        cookieMinutes: 525600,
      },
    });
};

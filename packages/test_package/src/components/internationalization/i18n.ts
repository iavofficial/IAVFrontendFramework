/**
 * Copyright © 2024 IAV GmbH Ingenieurgesellschaft Auto und Verkehr, All Rights Reserved.
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

import i18n from "i18next";
import {initReactI18next} from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import {Translations} from "../../contexts/language";

export const initI18next = (
  resources: Translations,
  acceptedCookies: boolean,
  fallbackLang: string,
) => {
  i18n
    .use(initReactI18next) // pass the i18n instance to react-i18next.
    .use(LanguageDetector)
    .init({
      debug: false,
      fallbackLng: fallbackLang,
      resources: resources,
      detection: {
        caches: [acceptedCookies ? "cookie" : ""],
        cookieMinutes: 525600,
      },
    });
};

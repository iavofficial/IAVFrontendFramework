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

import React from "react";
import {TranslateFunctionType} from "../types/translationFunction";

//eslint-disable-next-line
export interface TranslationKeys extends Object {
  option_name: string;
  [key: string]: any;
}

export interface Translation {
  [translation: string]: any;
  translation: TranslationKeys;
}

export interface Translations {
  [lang: string]: Translation;
}

export interface LanguageProvider {
  useCustomTranslation: TranslateFunctionType;
  selectLanguage: (lang: string) => void;
}

export interface LanguageContextType {
  fallbackLang: string;
  resources: Translations;
  activeLang: string;
  selectLanguage: (lang: string) => void;
  useTranslationFunction: () => TranslateFunctionType;
  [attribute: string]: any;
}

export const LanguageContext = React.createContext<
  LanguageContextType | undefined
>(undefined);

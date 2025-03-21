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

import {Slice} from "@reduxjs/toolkit";
import {FFStoreModule} from "../generalModule";

export type InternationalizerState = {
  activeLang: string;
};

export type TranslationKeys = {
  option_name: string;
} & Record<string, string>;

export type Translation = {
  translation: TranslationKeys;
} & Record<string, string | object>;

export type LangResources = {
  [lang: string]: Translation;
};

// This definition allows a translation function to have additional
// params. Because they are additional, the specific function has to
// define additional parameters as optional. This makes sense if you
// think of the use of this function inside the Framework. The Framework
// will only provide the attributes which are known when coding the Framework.
// This is the key attribute. Because of this all other attributes have to
// be optional since the Framework cannot provide them.
export type TranslationFunctionParams = {
  key: string;
} & Record<string, any>;

export type TranslationFunction = (params: TranslationFunctionParams) => string;

export type TranslationWrapperFunction = (t: TranslationFunction) => string;

export type UseTranslationHook = () => TranslationFunction;

export type InternationalizerModule<
  TIntState extends InternationalizerState = InternationalizerState,
> = {
  slice: Slice<TIntState>;
  fallbackLang: string;
  translationResources: LangResources;
  selectActiveLang: (lang: string) => void;
  useTranslation: UseTranslationHook;
} & FFStoreModule<TIntState>;

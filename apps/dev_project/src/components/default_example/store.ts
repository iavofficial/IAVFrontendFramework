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

import { MandatoryModuleNames } from "@iavofficial/frontend-framework/constants";
import { I18NextInternationalizer } from "@iavofficial/frontend-framework/defaultModules";
import {
  createModules,
  StoreBuilder,
} from "@iavofficial/frontend-framework/store";
import translationES from "../../assets/translations/es.json";
import translationEN from "../../assets/translations/en.json";
import translationDE from "../../assets/translations/de.json";
import translationDECH from "../../assets/translations/de-CH.json";

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

const customModules = {
  [MandatoryModuleNames.Internationalization]: new I18NextInternationalizer({
    translationResources: translations,
  }),
};

export const modules = createModules(customModules);

export const store = new StoreBuilder(modules.storeModules).build();

export const useModuleContextTyped = modules.useModuleContextTyped;
export const useModuleTyped = modules.useModuleTyped;

/*const {modules: modulesTest} = useModuleContextTyped();
const authModule = useModuleTyped(MandatoryModuleNames.Authentication);*/

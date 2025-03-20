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
import {useTranslation as useTranslationI18next} from "react-i18next";
import {useEffect, useState} from "react";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {DEFAULT_TRANSLATION_RESOURCES} from "../../../constants/defaultTranslations";
import {useDefaultDispatch} from "../../module_orchestration/moduleDefaults";
import {initI18nextDefault} from "./initI18nextDefault";
import {useCookiesAccepted} from "../../../utils/cookieHooks";
import {MandatoryModuleNames} from "../../../constants/moduleNames";
import {InitI18nextFunction} from "../../../types/modules/internationalization/initI18nextFunction";
import {LangResources} from "../../../types/modules/internationalization/internationalizerModule";

const DEFAULT_FALLBACK_LANG = "en";

const selectActiveLangPlaceholder = (lang: string) => {
  console.error(`The function is not initialized yet. This error
        indicates an error in your application.`);
};

export type I18NextInternationalizerParams = {
  fallbackLang?: string;
  initI18next?: InitI18nextFunction;
  forcedInitialLang?: string;
  translationResources?: LangResources;
};

export class I18NextInternationalizer {
  public slice;
  public fallbackLang;
  public translationResources;
  public selectActiveLang = selectActiveLangPlaceholder;
  public useTranslation;
  public useModuleLifecycle;

  constructor(params?: I18NextInternationalizerParams) {
    const fallbackLang = params?.fallbackLang ?? DEFAULT_FALLBACK_LANG;
    const initI18next = params?.initI18next ?? initI18nextDefault;
    const forcedInitialLang = params?.forcedInitialLang;
    const customTranslationResources = params?.translationResources;

    this.fallbackLang = fallbackLang;

    const initialState = {
      activeLang: forcedInitialLang ?? fallbackLang,
    };

    this.slice = createSlice({
      name: MandatoryModuleNames.Internationalizer,
      initialState: initialState,
      reducers: {
        setActiveLang: (state, action: PayloadAction<string>) => {
          state.activeLang = action.payload;
        },
      },
    });

    const {setActiveLang} = this.slice.actions;

    const mergedTranslationResources = structuredClone(
      DEFAULT_TRANSLATION_RESOURCES,
    );

    if (customTranslationResources) {
      Object.keys(customTranslationResources).forEach((key) => {
        if (Object.keys(mergedTranslationResources).includes(key)) {
          type keyType = keyof typeof mergedTranslationResources;
          Object.assign(
            mergedTranslationResources[key as keyType].translation,
            customTranslationResources[key].translation,
          );
        } else {
          // @ts-ignore No index signature on json imports
          mergedTranslationResources[key] = customTranslationResources[key];
        }
      });
    }

    this.translationResources = mergedTranslationResources;

    this.useTranslation = () => {
      const [t] = useTranslationI18next();
      return (params: {key: string; options?: Record<string, unknown>}) => {
        const options = params?.options ?? {};
        return t(params.key, options);
      };
    };

    this.useModuleLifecycle = () => {
      const [isInitialized, setIsInitialized] = useState(false);
      const cookiesAccepted = useCookiesAccepted();
      const dispatch = useDefaultDispatch();

      useEffect(() => {
        this.selectActiveLang = (lang: string) => {
          i18next.changeLanguage(lang);
          dispatch(setActiveLang(lang));
        };

        initI18next({
          acceptedCookies: cookiesAccepted,
          fallbackLang: fallbackLang,
          translationResources: mergedTranslationResources,
        });

        if (forcedInitialLang) {
          this.selectActiveLang(forcedInitialLang);
        } else {
          this.selectActiveLang(
            i18next.language === "de-DE" ? "de" : i18next.language,
          );
        }

        setIsInitialized(true);
      });

      return {
        renderChildren: isInitialized,
      };
    };
  }
}

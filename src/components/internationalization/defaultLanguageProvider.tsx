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

import React, {useEffect, useState} from "react";
import i18n from "i18next";
import {useTranslation} from "react-i18next";

import translationEN from "../../assets/translations/en.json";
import translationDE from "../../assets/translations/de.json";
import {initI18next} from "./i18n";
import {useCookiesAccepted} from "../cookie/cookieHooks";
import {LanguageContext, Translations} from "../../contexts/language";

export interface LanguageOptions {
  fallbackLang: string;
  initialLang?: string;
}

interface Props {
  languageOptions: LanguageOptions;
  translations?: Translations;
  initI18Next?: () => void;
}

export const DefaultLanguageProvider = (
  props: React.PropsWithChildren<Props>,
) => {
  const {fallbackLang, initialLang} = props.languageOptions;

  const [resources, setResources] = useState({
    en: {
      translation: translationEN,
    },
    de: {
      translation: translationDE,
    },
  });

  const [activeLang, setActiveLang] = useState(initialLang ?? fallbackLang);

  const [loaded, setLoaded] = useState(false);

  const cookiesAccepted = useCookiesAccepted();

  useEffect(() => {
    if (!cookiesAccepted) {
      initI18next(resources, cookiesAccepted, fallbackLang);
    } else if (!props.initI18Next) {
      initI18next(resources, cookiesAccepted, fallbackLang);
    } else {
      props.initI18Next();
    }

    if (initialLang) {
      selectLanguage(initialLang);
    } else {
      setActiveLang(i18n.language === "de-DE" ? "de" : i18n.language);
    }

    setLoaded(true);
  }, [
    props.initI18Next,
    fallbackLang,
    initialLang,
    cookiesAccepted,
    props,
    resources,
  ]);

  useEffect(() => {
    if (props.translations) {
      Object.keys(props.translations).forEach((key) => {
        type keyType = keyof typeof resources;
        if (Object.keys(resources).includes(key)) {
          Object.assign(
            resources[key as keyType].translation,
            // @ts-ignore Bug: Marks props.translations as possibly undfined although it's not.
            props.translations[key].translation,
          );
        } else {
          // @ts-ignore Bug: Marks props.translations as possibly undfined although it's not.
          resources[key] = props.translations[key];
        }
      });
      setResources(resources);
    }
  }, [props.translations, resources]);

  const useTranslationFunction = () => {
    const [t] = useTranslation();
    return function (key: string, ...translationParams: any[]) {
      return t(key, ...(translationParams as []));
    };
  };

  const selectLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
    setActiveLang(lang);
  };

  return (
    <LanguageContext.Provider
      value={{
        fallbackLang: fallbackLang,
        resources: resources,
        activeLang: activeLang,
        selectLanguage: selectLanguage,
        useTranslationFunction: useTranslationFunction,
      }}
    >
      {loaded && props.children}
    </LanguageContext.Provider>
  );
};

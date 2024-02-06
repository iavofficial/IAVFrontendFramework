import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import { Translations } from '../../contexts/language';

export const initI18next = (
  resources: Translations,
  acceptedCookies: boolean,
  fallbackLang: string
) => {
  i18n
    .use(initReactI18next) // pass the i18n instance to react-i18next.
    .use(LanguageDetector)
    .init({
      debug: false,
      fallbackLng: fallbackLang,
      resources: resources,
      detection: {
        caches: [acceptedCookies ? 'cookie' : ''],
        cookieMinutes: 525600,
      },
    });
};

import i18n from 'i18next';
import { initReactI18next, Resources } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import translationEN from "./en.json";
import translationDE from "./de.json";

export interface Translation {
    [translation: string]: any
    translation: Object
}

export interface Translations {
    [lang: string]: Translation
}

export const initI18next = (translations: Translations | undefined) => {
    let resources: Translations = {
        en: {
            translation: translationEN
        },
        de: {
            translation: translationDE
        }
    }
    if (translations) {
        Object.keys(translations).forEach(key => {
            if (Object.keys(resources).includes(key)) {
                Object.assign(resources[key].translation, translations[key].translation);
            } else {
                resources[key] = translations[key];
            }
        })
    }
    i18n
        .use(LanguageDetector)
        .use(initReactI18next)          // pass the i18n instance to react-i18next.
        .init({
            debug: false,
            fallbackLng: "en",
            resources: resources
        });
}
import i18n from 'i18next';
import { initReactI18next, Resources } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import translationEN from "./en.json";
import translationDE from "./de.json";

interface translations {
//    ...translations: Object
}

export const initI18next = (translations: Object) => {
    let resources = {
        en: {
            translation: translationEN
        },
        de: {
            translation: translationDE
        }
    }
    Object.keys(translations).forEach(key => {
        if (Object.keys(resources).includes(key)) {
//            resources[key].translation.concat(translations[key]);
        } else {
//            resources[key] = translations[key];
        }
    })
    i18n
        .use(LanguageDetector)
        .use(initReactI18next)          // pass the i18n instance to react-i18next.
        .init({
            debug: false,
            fallbackLng: "en",
            resources: resources
        });
}
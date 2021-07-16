import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

export const i18next = () => {
    i18n
        .use(LanguageDetector)
        .use(initReactI18next)          // pass the i18n instance to react-i18next.
        .init({
            debug: false,
            fallbackLng: 'en',
            //        ns: ["translations"],
            //        defaultNS: "translations",
            resources: {
                en: {
                    translation: {
                        test: "test in local from library"
                    }
                }
            }
        });
}
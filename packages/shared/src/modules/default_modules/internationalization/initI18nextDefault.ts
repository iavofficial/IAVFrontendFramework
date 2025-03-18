import i18next from "i18next";
import {LangResources} from "../../../types/modules/internationalization/internationalizationModule";
import {initReactI18next} from "react-i18next";
import I18nextBrowserLanguageDetector from "i18next-browser-languagedetector";

export const initI18nextDefault = (params: {
  resources: LangResources;
  acceptedCookies: boolean;
  fallbackLang: string;
}) => {
  const {resources, acceptedCookies, fallbackLang} = params;
  i18next
    .use(initReactI18next) // pass the i18n instance to react-i18next.
    .use(I18nextBrowserLanguageDetector)
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

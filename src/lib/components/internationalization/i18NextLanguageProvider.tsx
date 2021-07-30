import React, { useEffect, useState } from "react";
import i18n from 'i18next';
import i18next from "i18next";
import { useTranslation, withTranslation } from "react-i18next";

import translationEN from "./en.json";
import translationDE from "./de.json";
import { initI18next } from "./i18n";
import { useCookiesAccepted } from "../cookie/cookieHooks";
import { LanguageContext, Translations } from "../../contexts/language";

interface Props {
    fallbackLang: string;
    translations?: Translations;
    initI18Next?: () => void;
}

export const I18NextLanguageProvider = (props: React.PropsWithChildren<Props>) => {

    const [resources, setResources] = useState({
        en: {
            translation: translationEN
        },
        de: {
            translation: translationDE
        }
    });

    const [activeLang, setActiveLang] = useState(props.fallbackLang);

    const [loaded, setLoaded] = useState(false);

    const cookiesAccepted = useCookiesAccepted();

    useEffect(() => {
        if (!cookiesAccepted) {
            initI18next(resources, cookiesAccepted);
        } else if (!props.initI18Next) {
            initI18next(resources, cookiesAccepted);
        } else {
            props.initI18Next();
        }
        setActiveLang(i18n.language);
        setLoaded(true);
    }, [props.initI18Next, cookiesAccepted]);

    useEffect(() => {
        if (props.translations) {
            Object.keys(props.translations).forEach(key => {
                if (Object.keys(resources).includes(key)) {
                    // @ts-ignore Bug: Marks props.translations as possibly undfined although it's not.
                    Object.assign(resources[key].translation, props.translations[key].translation);
                } else {
                    // @ts-ignore Bug: Marks props.translations as possibly undfined although it's not.
                    resources[key] = props.translations[key];
                }
            });
            setResources(resources);
        }
    }, [props.translations]);

    const useCustomTranslation = (key: string, ...translationParams: any[]) => {
        const [t, i18n, ready] = useTranslation();
        return t(key, ...translationParams);
    }

    const selectLanguage = (lang: string) => {
        i18next.changeLanguage(lang);
        setActiveLang(lang);
    }

    return (
        <LanguageContext.Provider value={{
            fallbackLang: props.fallbackLang, resources: resources, activeLang: activeLang,
            selectLanguage: selectLanguage, useCustomTranslation: useCustomTranslation
        }}>
            {loaded && props.children}
        </LanguageContext.Provider>
    );
}
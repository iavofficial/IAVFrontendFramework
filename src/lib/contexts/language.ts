import React from "react";

export interface TranslationKeys extends Object {
    option_name: string,
    [key: string]: any;
}

export interface Translation {
    [translation: string]: any
    translation: TranslationKeys
}

export interface Translations {
    [lang: string]: Translation
}

export interface LanguageProvider {
    useCustomTranslation: (key: string, ...translationParameters: any[]) => string,
    selectLanguage: (lang: string) => void
}

export interface LanguageContextType {
    fallbackLang: string,
    resources: Translations,
    activeLang: string,
    selectlanguage: (lang: string) => void,
    useCustomTranslation: (key: string, ...translationParams: any[]) => string
    [attribute: string]: any;
}

export const LanguageContext = React.createContext<LanguageContextType | undefined>(undefined);
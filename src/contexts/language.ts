import React from "react";

export interface TranslationKeys extends Object {
    option_name: string;
    [key: string]: any;
}

export interface Translation {
    [translation: string]: any;
    translation: TranslationKeys;
}

export interface Translations {
    [lang: string]: Translation;
}

export type TranslateFunctionType = (key: string, ...translationParameters: any) => string;

export interface LanguageProvider {
    useCustomTranslation: TranslateFunctionType;
    selectLanguage: (lang: string) => void;
}

export interface LanguageContextType {
    fallbackLang: string;
    resources: Translations;
    activeLang: string;
    selectLanguage: (lang: string) => void;
    useTranslationFunction: () => TranslateFunctionType
    [attribute: string]: any;
}

export const LanguageContext = React.createContext<LanguageContextType | undefined>(undefined);
import React, { Component } from "react";
import { useContext } from "react";

import { LanguageContext, TranslateFunctionType } from "../../contexts/language";

export function useTranslator() {
    const langContext = useContext(LanguageContext);
    return langContext?.useTranslationFunction ? langContext?.useTranslationFunction() : (...parameters: any) => "";
}

export interface AppliedTranslationProps {
    t: TranslateFunctionType;
}

export function applyTranslation<T>(Component: React.ComponentType<T & AppliedTranslationProps>) {
    return function (props: T) {
        const t = useTranslator();
        return (
            <Component t={t} {...props} />
        );
    }
}
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

export function applyTranslation<T extends AppliedTranslationProps>(Component: React.ComponentType<T>) {
    return function (props: Omit<T, "t">) {
        const t = useTranslator();
        const extendedProps = { t, ...props } as T;
        return (
            <Component {...extendedProps} />
        );
    }
}
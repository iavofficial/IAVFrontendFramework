import { useContext } from "react";
import { withTranslation } from "react-i18next";

import { LanguageContext, TranslateFunctionType } from "../../contexts/language";

export function useTranslator() {
    const langContext = useContext(LanguageContext);
    return langContext?.useTranslationFunction ? langContext?.useTranslationFunction() : (...parameters: any) => "";
}

export interface AppliedTranslationProps {
    t: TranslateFunctionType
}

export const applyTranslation = (component: React.ComponentType<AppliedTranslationProps>, ...properties: any) => (
    withTranslation(...properties)(component)
)
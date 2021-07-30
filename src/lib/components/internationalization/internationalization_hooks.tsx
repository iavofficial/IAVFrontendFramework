import { useContext } from "react";
import { LanguageContext } from "../../contexts/language";

export function useTranslator() {
    const langContext = useContext(LanguageContext);
    return langContext?.useTranslationFunction? langContext?.useTranslationFunction() : (...parameters: any) => "";
}
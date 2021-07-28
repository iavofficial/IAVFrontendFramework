import { useContext } from "react";
import { LanguageContext } from "../../contexts/language";

export function useTranslation() {
    const langContext = useContext(LanguageContext);
    return langContext?.useCustomTranslation? langContext?.useCustomTranslation : (...parameters: any) => "";
}
import translationEN from "../assets/translations/en.json";
import translationDE from "../assets/translations/de.json";

export const DEFAULT_TRANSLATION_RESOURCES = {
  en: {
    translation: translationEN,
  },
  de: {
    translation: translationDE,
  },
} as const;

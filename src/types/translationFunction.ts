/**
 * This type describes the translation function of react-i18next.
 */
export type TranslateFunctionType = (
  key: string,
  ...translationParameters: any
) => string;

/**
 * This type describes a function which takes a translation function t and returns a string (based on t).
 */
export type TranslationFunction = (t: TranslateFunctionType) => string;

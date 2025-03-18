import {Slice} from "@reduxjs/toolkit";

export type InternationalizationState = {
  activeLang: string;
};

export interface TranslationKeys extends Object {
  option_name: string;

  [key: string]: any;
}

export interface Translation {
  translation: TranslationKeys;

  [translation: string]: any;
}

export interface Translations {
  [lang: string]: Translation;
}

export type LangResources = Translations;

// This definition allows a translation function to have additional
// params. Because they are additional, the specific function has to
// define additional parameters as optional. This makes sense if you
// think of the use of this function inside the Framework. The Framework
// will only provide the attributes which are known when coding the Framework.
// This is the key attribute. Because of this all other attributes have to
// be optional since the Framework cannot provide them.
export type TranslationFunctionParams = {
  key: string;
} & Record<string, unknown>;

export type TranslationFunction = (params: TranslationFunctionParams) => string;

export type TranslationWrapperFunction = (t: TranslationFunction) => string;

export type InternationalizationModule<
  TIntState extends InternationalizationState = InternationalizationState,
> = {
  slice: Slice<TIntState>;
  fallbackLang: string;
  translationResources: LangResources;
  selectActiveLang: (lang: string) => void;
  useTranslation: () => TranslationFunction;
};

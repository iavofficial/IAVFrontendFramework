import React, { PropsWithChildren, useContext } from "react";
import { CookiesProvider } from "react-cookie";

import { AuthContext } from "../contexts/auth";
import { Translations } from "../contexts/language";
import {
  DefaultLanguageProvider,
  LanguageOptions,
} from "./internationalization/defaultLanguageProvider";
import { DummyAuthenticationProvider } from "./authentication/default/dummyAuthenticationProvider";
import { ColorProvider, ColorProviderProps } from "../providers/colors/colorProvider";
import { DEFAULT_FALLBACK_LANGUAGE } from "../constants";

// Create this type to make fallbackLang optional for the user.
type GlobalDataLayerLanguageOptions = Omit<LanguageOptions, "fallbackLang"> & {
  fallbackLang?: string;
};

interface Props {
  languageOptions?: GlobalDataLayerLanguageOptions;
  translations?: Translations;
  initI18Next?: () => void;
  colorSettings?: ColorProviderProps
}

export const GlobalDataLayer = (props: PropsWithChildren<Props>) => {
  const authContext = useContext(AuthContext);
  const AuthenticationProvider = authContext
    ? React.Fragment
    : DummyAuthenticationProvider;

  const fallbackLang = props.languageOptions?.fallbackLang ?? DEFAULT_FALLBACK_LANGUAGE;
  const initialLang = props.languageOptions?.initialLang ?? DEFAULT_FALLBACK_LANGUAGE;
  let languageOptions = {
    fallbackLang: fallbackLang,
    initialLang: initialLang
  };
  
  return (
    <CookiesProvider>
      <AuthenticationProvider>
        <DefaultLanguageProvider
          languageOptions={languageOptions}
          translations={props.translations}
          initI18Next={props.initI18Next}
        >
          <ColorProvider {...props.colorSettings}>
            {props.children}
          </ColorProvider>
        </DefaultLanguageProvider>
      </AuthenticationProvider>
    </CookiesProvider>
  );
};

import React, { PropsWithChildren, useContext } from "react";
import { CookiesProvider } from "react-cookie";

import { AuthContext } from "../contexts/auth";
import { Translations } from "../contexts/language";
import { DefaultLanguageProvider } from "./internationalization/defaultLanguageProvider";
import { DummyAuthenticationProvider } from "./authentication/default/dummyAuthenticationProvider";
import { ColorProvider } from "../providers/colors/colorProvider";
import { ColorObject } from "../types/colorObjectType";

interface Props {
  translations?: Translations;
  initI18Next?: () => void;
  colorOptions?: ColorObject;
}

export const GlobalDataLayer = (props: PropsWithChildren<Props>) => {
  const authContext = useContext(AuthContext);
  const AuthenticationProvider = authContext
    ? React.Fragment
    : DummyAuthenticationProvider;

  return (
    <CookiesProvider>
      <AuthenticationProvider>
        <DefaultLanguageProvider
          fallbackLang="en"
          translations={props.translations}
          initI18Next={props.initI18Next}
        >
          <ColorProvider colorOptions={props.colorOptions}>
            {props.children}
          </ColorProvider>
        </DefaultLanguageProvider>
      </AuthenticationProvider>
    </CookiesProvider>
  );
};

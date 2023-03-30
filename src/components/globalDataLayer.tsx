import React, { PropsWithChildren, useContext } from 'react';
import { CookiesProvider } from 'react-cookie';

import { AuthContext } from '../contexts/auth';
import { Translations } from '../contexts/language';
import { DefaultLanguageProvider } from './internationalization/defaultLanguageProvider';
import { DummyAuthenticationProvider } from './authentication/default/dummyAuthenticationProvider';

interface Props {
  translations?: Translations;
  initI18Next?: () => void;
}

export const GlobalDataLayer = (props: PropsWithChildren<Props>) => {
  const authContext = useContext(AuthContext);
  const LoginProvider = authContext
    ? React.Fragment
    : DummyAuthenticationProvider;

  console.log('hier dein loginprovider: ', LoginProvider);

  return (
    <CookiesProvider>
      <LoginProvider>
        <DefaultLanguageProvider
          fallbackLang="en"
          translations={props.translations}
          initI18Next={props.initI18Next}
        >
          {props.children}
        </DefaultLanguageProvider>
      </LoginProvider>
    </CookiesProvider>
  );
};

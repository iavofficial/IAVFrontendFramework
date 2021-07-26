import React, { PropsWithChildren, useContext } from "react";
import { CookiesProvider } from "react-cookie";

import { AuthContext } from "../contexts/auth";
import { Translations } from "../contexts/language";
import { I18NextLanguageProvider } from "./internationalization/i18NextLanguageProvider";
import { DummyLoginProvider } from "./login/dummyLoginProvider";

interface Props {
    translations?: Translations;
    initI18Next?: () => void;
}

export const DisaContexts = (props: PropsWithChildren<Props>) => {
    const authContext = useContext(AuthContext);
    const LoginProvider = authContext ? React.Fragment : DummyLoginProvider;

    return (
        <CookiesProvider>
            <LoginProvider>
                <I18NextLanguageProvider fallbackLang="en" translations={props.translations} initI18Next={props.initI18Next}>
                    {props.children}
                </I18NextLanguageProvider>
            </LoginProvider>
        </CookiesProvider>
    )
}
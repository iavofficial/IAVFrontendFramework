import "primeflex/primeflex.css";
import "primereact/resources/themes/nova/theme.css";
import "primereact/resources/primereact.css";
import "primeicons/primeicons.css";
import React, { useContext } from "react";
import { BrowserRouter as Router, Redirect, Route } from "react-router-dom";
import { CookiesProvider } from "react-cookie";

import "./css/disaPage.css";
import "./css/disaFramework.css";
import "./css/error.css";
import { BasicLoginView } from "./login/basicLoginView";
import { DisaHeader } from "./disaHeader";
import { Navbar } from "./navbar/navbar";
import { Imprint } from "./imprint";
import { CookieBanner } from "./cookie/cookieBanner";
import { DummyLoginProvider } from "./login/dummyLoginProvider";
import { AuthContext } from "../contexts/auth";
import { TabAndContentWrapper } from "./navbar/wrapper/tabAndContentWrapper";
import { Translations } from "../contexts/language";
import { I18NextLanguageProvider } from "./internationalization/i18NextLanguageProvider";

export interface Props {
    tabAndContentWrappers: TabAndContentWrapper[];
    startingPoint: string;
    loginView?: React.ComponentType<any>;
    translations?: Translations;
    initI18Next?: () => void;
}

export const DisaPage = (props: Props) => {
    const authContext = useContext(AuthContext);

    const LoginProvider = authContext ? React.Fragment : DummyLoginProvider;
    const LoginView = props.loginView ? props.loginView : BasicLoginView;

    return (
        <CookiesProvider>
            <I18NextLanguageProvider fallbackLang="en" translations={props.translations} initI18Next={props.initI18Next}>
                <CookieBanner />
                <LoginProvider>
                    {authContext?.hasAuthenticated() ?
                        <Router>
                            <div className={"p-d-flex p-flex-column"} style={{ height: "100%", bottom: "0" }}>
                                <DisaHeader />
                                <div className="p-d-flex" style={{ height: "100%", margin: "0" }}>
                                    <Navbar tabAndContentWrappers={props.tabAndContentWrappers} />
                                    {props.tabAndContentWrappers.map(wrapper => wrapper.getRoutes())}
                                    <Route exact path="/imprint" component={Imprint} />
                                    <Redirect exact from="login" to={props.startingPoint.valueOf()} />
                                </div>
                            </div>
                        </Router>
                        :
                        <Router>
                            <Route exact path="/login" component={LoginView} />
                            <Route exact path="/imprint" component={Imprint} />
                            <Redirect exact from="/" to="/login" />
                        </Router >
                    }
                </LoginProvider>
            </I18NextLanguageProvider>
        </CookiesProvider>
    );
};
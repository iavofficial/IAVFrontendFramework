import "primeflex/primeflex.css";
import "primereact/resources/themes/nova/theme.css";
import "primereact/resources/primereact.css";
import "primeicons/primeicons.css";
import React, { useContext, useEffect } from "react";
import { BrowserRouter as Router, Redirect, Route } from "react-router-dom";

import "./css/disaPage.css";
import "./css/disaFramework.css";
import "./css/error.css";
import { BasicLoginView } from "./login/basicLoginView";
import { DisaHeader } from "./disaHeader";
import { Navbar } from "./navbar/navbar";
import { Imprint } from "./imprint";
import { CookieBanner } from "./cookie/cookieBanner";
import { acceptedCookies } from "./cookie/cookieHandler";
import { DummyLoginProvider } from "./login/dummyLoginProvider";
import { AuthContext, placeholderContext } from "../contexts/auth";
import { TabAndContentWrapper } from "./navbar/wrapper/tabAndContentWrapper";
import { initI18next, Translations } from "../internationalization/i18n";

export interface Props {
    tabAndContentWrappers: TabAndContentWrapper[];
    startingPoint: string;
    loginView?: React.ComponentType<any>;
    translations?: Translations;
    skipI18nextInit?: boolean;
}

export const DisaPage = (props: Props) => {
    // Init I18Next only once (if it should not be skipped)
    useEffect(() => {
        if (!props.skipI18nextInit) {
            initI18next(props.translations);
        }
    }, []);
    const context = useContext(AuthContext);
    // Compare references. If the context is still placeholderContext the default DummyLoginProvider should be used.
    const OptionalDummyLoginProvider = context === placeholderContext ? DummyLoginProvider : React.Fragment;
    const LoginView = props.loginView !== undefined && props.loginView !== null ? props.loginView : BasicLoginView;
    return (
        <OptionalDummyLoginProvider>
            {!acceptedCookies() && <CookieBanner />}
            <AuthContext.Consumer>
                {(context) => {
                    if (context.hasAuthenticated()) {
                        return (
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
                        );
                    } else {
                        return (
                            <Router>
                                <Route exact path="/login" component={LoginView} />
                                <Route exact path="/imprint" component={Imprint} />
                                <Redirect exact from="/" to="/login" />
                            </Router >
                        );
                    }
                }}
            </AuthContext.Consumer>
        </OptionalDummyLoginProvider>
    );
};
import "primeflex/primeflex.css";
import "primereact/resources/themes/nova/theme.css";
import "primereact/resources/primereact.css";
import "primeicons/primeicons.css";
import React, { useContext } from "react";
import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom";

import "./css/constants.css";
import "./css/disaPage.css";
import "./css/disaFramework.css";
import "./css/error.css";
import { BasicAuthenticationView } from "./authentication/default/basicAuthenticationView";
import { DisaHeader } from "./disaHeader";
import { Navbar } from "./navbar/navbar";
import { Imprint } from "./imprint";
import { CookieBanner } from "./cookie/cookieBanner";
import { AuthContext } from "../contexts/auth";
import { TabAndContentWrapper } from "./navbar/wrapper/tabAndContentWrapper";
import { MenuOptions } from "./navbar/menu";

export interface Props {
    tabAndContentWrappers: TabAndContentWrapper[];
    startingPoint: string;
    menuOptions?: MenuOptions;
    authenticationView?: React.ComponentType<any>;
    documentsComponent?: React.ComponentType<any>;
    documentsLabelKey?: string;
}

export const UILayer = (props: Props) => {
    const authContext = useContext(AuthContext);
    const AuthenticationView = props.authenticationView ? props.authenticationView : BasicAuthenticationView;

    const DefaultImprint = () => (
        <div className="p-d-flex" style={{ height: "100%", width: "100%", justifyContent: "center", alignItems: "center" }}>
            <Imprint />
        </div>
    );

    // className="p-d-flex p-flex-column"
    const RSMView = () => (
        <div style={{ display: "flex", flexDirection: "column", height: "100%", bottom: "0" }}>
            <div style={{ flex: "0 0 auto" }}>
                <DisaHeader />
            </div>
            <div style={{ display: "flex", flex: "1 1 auto", overflow: "auto" }}>
                <Navbar tabAndContentWrappers={props.tabAndContentWrappers} menuOptions={props.menuOptions} documentsLabelKey={props.documentsLabelKey} />
                {props.tabAndContentWrappers.map(wrapper => wrapper.getRoutes())}
                <Route exact path="/documents" component={props.documentsComponent ? props.documentsComponent : DefaultImprint} />
            </div>
        </div>
    );

    return (
        <>
            <CookieBanner />
            <Router>
                {authContext?.hasAuthenticated() ?
                    <Redirect to={props.startingPoint.valueOf()} />
                    :
                    <Redirect to="/login" />
                }
                <Switch>
                    <Route path="/login" component={AuthenticationView} />
                    {!authContext?.hasAuthenticated() && <Route path="/documents" component={props.documentsComponent ? props.documentsComponent : DefaultImprint} />}
                    {authContext?.hasAuthenticated() && <Route path="/" component={RSMView} />}
                </Switch>
            </Router>
        </>
    );
};
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
import { BasicAuthenticationView } from "./login/default/basicAuthenticationView";
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
    loginView?: React.ComponentType<any>;
}

export const UILayer = (props: Props) => {
    const authContext = useContext(AuthContext);
    const LoginView = props.loginView ? props.loginView : BasicAuthenticationView;

    const RSMView = () => (
        <div className={"p-d-flex p-flex-column"} style={{ height: "100%", bottom: "0" }}>
            <DisaHeader />
            <div className="p-d-flex" style={{ height: "100%", margin: "0" }}>
                <Navbar tabAndContentWrappers={props.tabAndContentWrappers} menuOptions={props.menuOptions} />
                {props.tabAndContentWrappers.map(wrapper => wrapper.getRoutes())}
                <Route exact path="/imprint" component={Imprint} />
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
                    <Route path="/login" component={LoginView} />
                    {!authContext?.hasAuthenticated() && <Route path="/imprint" component={Imprint} />}
                    {authContext?.hasAuthenticated() && <Route path="/" component={RSMView} />}
                </Switch>
            </Router>
        </>
    );
};
import "primeflex/primeflex.css";
import "primereact/resources/themes/nova/theme.css";
import "primereact/resources/primereact.css";
import "primeicons/primeicons.css";
import React, { useContext } from "react";
import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom";
import { MenuItem } from "primereact/components/menuitem/MenuItem";

import "./css/constants.css";
import "./css/disaPage.css";
import "./css/disaFramework.css";
import "./css/error.css";
import { BasicLoginView } from "./login/default/basicLoginView";
import { DisaHeader } from "./disaHeader";
import { Navbar } from "./navbar/navbar";
import { Imprint } from "./imprint";
import { CookieBanner } from "./cookie/cookieBanner";
import { AuthContext } from "../contexts/auth";
import { TabAndContentWrapper } from "./navbar/wrapper/tabAndContentWrapper";

export interface Props {
    tabAndContentWrappers: TabAndContentWrapper[];
    startingPoint: string;
    settingsMenuItems?: MenuItem[];
    loginView?: React.ComponentType<any>;
}

export const UILayer = (props: Props) => {
    const authContext = useContext(AuthContext);
    const LoginView = props.loginView ? props.loginView : BasicLoginView;

    const RSMView = () => (
        <div className={"p-d-flex p-flex-column"} style={{ height: "100%", bottom: "0" }}>
            <DisaHeader />
            <div className="p-d-flex" style={{ height: "100%", margin: "0" }}>
                <Navbar tabAndContentWrappers={props.tabAndContentWrappers} settingsMenuItems={props.settingsMenuItems} />
                {props.tabAndContentWrappers.map(wrapper => wrapper.getRoutes())}
                <Route exact path="/imprint" component={Imprint} />
            </div>
        </div>
    );

    return (
        <>
            <CookieBanner />
            <Router>
                <Switch>
                    <Route path="/login" component={LoginView} />
                    {!authContext?.hasAuthenticated() && <Route path="/imprint" component={Imprint} />}
                    <Route path="/" component={RSMView} />
                </Switch>
                {authContext?.hasAuthenticated() ?
                    <Redirect to={props.startingPoint.valueOf()} />
                    :
                    <Redirect to="/login" />
                }
            </Router>
        </>
    );
};
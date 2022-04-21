import "primeflex/primeflex.css";
import "primereact/resources/themes/nova/theme.css";
import "primereact/resources/primereact.css";
import "primeicons/primeicons.css";
import React, { useContext } from "react";
import { BrowserRouter as Router, Redirect, Route, Switch, useLocation } from "react-router-dom";

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
import { AuthenticationViewProps } from "./authentication/aws/authenticationView";

export interface Props {
    tabAndContentWrappers: TabAndContentWrapper[];
    startingPoint: string;
    menuOptions?: MenuOptions;
    authenticationView?: React.ComponentType<AuthenticationViewProps & any>;
    documentsComponent?: React.ComponentType<any>;
    documentsLabelKey?: string;
    headerOptions?: {
        leftSrc?: string;
        rightSrc?: string;
        hideLeft?: boolean;
        hideRight?: boolean;
    }
}

// TODO: The creation of the components DefaultImprint, RSMView and Redirector inside UILayer may cause a problem.
// Because the components are recreated every render, the Routes will get new components every render. This may cause a rerender of
// all components which are encapsulated in this layer.
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
                <DisaHeader headerOptions={props.headerOptions}/>
            </div>
            <div style={{ display: "flex", flex: "1 1 auto", overflow: "auto" }}>
                <Navbar tabAndContentWrappers={props.tabAndContentWrappers} menuOptions={props.menuOptions} documentsLabelKey={props.documentsLabelKey} />
                {props.tabAndContentWrappers.map(wrapper => wrapper.getRoutes())}
                <Route exact path="/documents" component={props.documentsComponent ? props.documentsComponent : DefaultImprint} />
            </div>
        </div>
    );

    const Redirector = () => {
        const location = useLocation();

        if (!authContext?.hasAuthenticated()) {
            if (location.pathname !== "/documents") {
                return <Redirect to={"/login"} />
            }
            return <></>;
        }

        if (location.pathname === "/login") {
            return <Redirect to={props.startingPoint.valueOf()} />;
        }

        return <></>;
    }

    return (
        <>
            <CookieBanner />
            <Router>
                <Redirector />
                <Switch>
                    <Route path="/login" component={() => <AuthenticationView documentsLabelKey={props.documentsLabelKey} />} />
                    {!authContext?.hasAuthenticated() && <Route path="/documents" component={props.documentsComponent ? props.documentsComponent : DefaultImprint} />}
                    {authContext?.hasAuthenticated() && <Route path="/" component={RSMView} />}
                </Switch>
            </Router>
        </>
    );
};
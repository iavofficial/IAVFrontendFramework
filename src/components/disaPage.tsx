import "primeflex/primeflex.css";
import "primereact/resources/themes/nova/theme.css";
import "primereact/resources/primereact.css";
import "primeicons/primeicons.css";
import React from "react";
import { BrowserRouter as Router, Redirect, Route } from "react-router-dom";

import "./css/disaPage.css";
import "./css/disaFramework.css";
import "./css/error.css";
import BasicLoginView from "./login/basicLoginView";
import DisaHeader from "./disaHeader";
import NavbarTab from "./navbar/navbarTab";
import Navbar from "./navbar/navbar";
import Imprint from "./imprint";
import CookieBanner from "./cookieBanner";
import { acceptedCookies } from "./cookieHandler";
import DummyLoginProvider from "./login/dummyLoginProvider";
import AuthContext from "../contexts/auth";
import View from "./view";

interface Props {
    views: View[];
    startingPoint: String;
    loginView: React.ComponentType;
    // TODO: Refactor this
    loginProvider: any;
    loginProviderProps: any;
}

const DisaPage = (props: Props) => {
    const LoginProvider = props.loginProvider !== undefined && props.loginProvider !== null ? props.loginProvider : DummyLoginProvider;
    const LoginView = props.loginView !== undefined && props.loginView !== null ? props.loginView : BasicLoginView;
    return (
        <LoginProvider {...props.loginProviderProps}>
            { !acceptedCookies() && <CookieBanner />}
            <AuthContext.Consumer>
                {(context) => {
                    if (context.isAuthenticated()) {
                        return (
                            <Router>
                                <div className={"p-d-flex p-flex-column"} style={{ height: "100%", bottom: "0" }}>
                                    <DisaHeader />
                                    <div className="p-d-flex" style={{ height: "100%", margin: "0" }}>
                                        <Navbar>
                                            {props.views.map(view => <NavbarTab selectedIcon={view.selectedIcon} deselectedIcon={view.deselectedIcon} to={view.to} name={view.name} disabled={view.disabled} />)}
                                        </Navbar>
                                        {props.views.map(view => <Route exact path={view.to.valueOf()} component={view.component} />)}
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
        </LoginProvider>
    );
};

export default DisaPage;
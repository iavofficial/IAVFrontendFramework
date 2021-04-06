import 'primeflex/primeflex.css';
import 'primereact/resources/themes/nova/theme.css';
import 'primereact/resources/primereact.css';
import "primeicons/primeicons.css";
import React from 'react';
import PropTypes, { shape } from 'prop-types';
import { BrowserRouter as Router, Redirect, Route } from 'react-router-dom';

import './css/disaPage.css';
import BasicLoginView from './login/basicLoginView.js';
import DisaHeader from './disaHeader.js';
import NavbarTab from './navbar/navbarTab.js';
import Navbar from './navbar/navbar.js';
import Imprint from './imprint.js';
import CookieBanner from './cookieBanner.js';
import { acceptedCookiesName, getCookie } from './cookieHandler.js';

const isAuthenticated = false;

const DisaPage = (props) => {
    if (isAuthenticated) {
        return (
            <>
                <Router>
                    <div className={"p-d-flex p-flex-column"} style={{ height: "100%", bottom: "0" }}>
                        <DisaHeader />
                        <div className="p-d-flex" style={{ height: "100%", margin: "0" }}>
                            <Navbar>
                                {props.views.map(view => <NavbarTab selectedIcon={view.selectedIcon} deselectedIcon={view.deselectedIcon} to={view.to} name={view.name} disabled={view.disabled} />)}
                            </Navbar>
                            {props.views.map(view => <Route exact path={view.to} component={view.component} />)}
                            <Route exact path="/imprint" component={Imprint} />
                            <Redirect exact from="login" to="/" />
                        </div>
                    </div>
                </Router>
                {getCookie(acceptedCookiesName) !== "true" && <CookieBanner />}
            </>
        )
    } else {
        return (
            <>
                <Router>
                    <Route exact path="/login" component={props.loginView !== undefined && props.loginView !== null ? props.loginView : BasicLoginView} />
                    <Route exact path="/imprint" component={Imprint} />
                    <Redirect exact from="/" to="/login" />
                </Router>
                {getCookie(acceptedCookiesName) !== "true" && <CookieBanner />}
            </>
        );
    }
};

DisaPage.propTypes = {
    views: PropTypes.arrayOf(
        shape({
            name: PropTypes.string.isRequired,
            to: PropTypes.string.isRequired,
            disabled: PropTypes.bool.isRequired,
            selectedIcon: PropTypes.string.isRequired,
            deselectedIcon: PropTypes.string.isRequired,
            component: PropTypes.element.isRequired
        }).isRequired
    )
};

export default DisaPage;
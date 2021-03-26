import 'primeflex/primeflex.css';
import React from 'react';
import PropTypes, { shape } from 'prop-types';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import './css/disaPage.css';
import DisaHeader from './disaHeader.js';
import NavbarTab from './navbarTab.js';
import Navbar from './navbar.js';

const DisaPage = (props) => {
    return (
        <Router>
            <div className={"p-d-flex p-flex-column"} style={{ height: "100%", bottom: "0" }}>
                <DisaHeader />
                <div className="p-d-flex" style={{ height: "100%", margin: "0" }}>
                    <Navbar>
                        {props.views.map(view => <NavbarTab selectedIcon={view.selectedIcon} deselectedIcon={view.deselectedIcon} to={view.to} name={view.name} disabled={view.disabled} />)}
                    </Navbar>
                    {props.views.map(view => <Route exact path={view.to} component={view.component} />)}
                </div>
            </div>
        </Router>
    );
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
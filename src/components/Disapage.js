import React from 'react';
import PropTypes, { shape } from 'prop-types';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './disaPage.css'
import DisaHeader from './disaHeader.js';
import DisaTab from './disaTab.js';
import Navbar from './navbar.js';

const DisaPage = (props) => {
    return (
        <Router>
            <div className={"p-d-flex p-flex-column"} style={{ height: "100%", bottom: "0" }}>
                <DisaHeader />
                <div className="p-d-flex" style={{ height: "100%", margin: "0" }}>
                    <Navbar>
                        {props.tabs.map((tab) => <DisaTab selectedIcon={tab.selectedIcon} deselectedIcon={tab.deselectedIcon} to={tab.to} name={tab.name} disabled={tab.disabled} />)}
                    </Navbar>
                    <div style={{ width: "100%" }}>
                        {props.tabs.map((tab) => <Route path={tab.to} exact component={tab.component} />)}
                    </div>
                </div>
            </div>
        </Router>
    );
};

DisaPage.propTypes = {
    tabs: PropTypes.arrayOf(
        shape({
            name: PropTypes.string.isRequired,
            to: PropTypes.string.isRequired,
            active: PropTypes.bool.isRequired,
            disabled: PropTypes.bool.isRequired,
            selectedIcon: PropTypes.string.isRequired,
            deselectedIcon: PropTypes.string.isRequired
        }).isRequired
    )
};

export default DisaPage;
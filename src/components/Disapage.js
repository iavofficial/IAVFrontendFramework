import React from 'react';
import DisaHeader from './DisaHeader.js';
import Navbar from './Navbar.js';
import Disatab from './Disatab.js';
import { BrowserRouter as Router, Route } from 'react-router-dom';

const Disapage = (props) => {
    return (
        <Router>
            <DisaHeader />
            <div className="p-d-flex" style={{ "margin": "0" }}>
                <Navbar>
                    {props.tabs.map((tab) => <Disatab selectedIcon={tab.selectedIcon} deselectedIcon={tab.deselectedIcon} to={tab.to} name={tab.name} disabled={tab.disabled}></Disatab>)}
                </Navbar>
                <div className="p-col">
                    {props.tabs.map((tab) => <Route path={tab.to} exact component={tab.component} />)}
                </div>
            </div>
        </Router>
    );
};

export default Disapage;
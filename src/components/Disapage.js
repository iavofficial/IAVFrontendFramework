import React from 'react';
import PropTypes, { shape } from 'prop-types';
import { BrowserRouter as Router } from 'react-router-dom';
import './disaPage.css'
import DisaHeader from './disaHeader.js';
import DisaTab from './disaTab.js';
import Navbar from './navbar.js';
import Content from './content.js';

const DisaPage = (props) => {
    return (
        <Router>
            <div className={"p-d-flex p-flex-column"} style={{ height: "100%", bottom: "0" }}>
                <DisaHeader />
                <div className="p-d-flex" style={{ height: "100%", margin: "0" }}>
                    <Navbar>
                        {props.navbarTabs.map((tab) => <DisaTab selectedIcon={tab.selectedIcon} deselectedIcon={tab.deselectedIcon} to={tab.to} name={tab.name} disabled={tab.disabled} />)}
                    </Navbar>
                    <Content navbarTabs={props.navbarTabs} contentTabs={props.contentTabs} />
                </div>
            </div>
        </Router>
    );
};

DisaPage.propTypes = {
    navbarTabs: PropTypes.arrayOf(
        shape({
            name: PropTypes.string.isRequired,
            to: PropTypes.string.isRequired,
            disabled: PropTypes.bool.isRequired,
            selectedIcon: PropTypes.string.isRequired,
            deselectedIcon: PropTypes.string.isRequired
        }).isRequired
    ),
    contentTabs: PropTypes.arrayOf(
        shape({
            uiElement: PropTypes.element,
            refreshOnClick: PropTypes.bool,
            data: PropTypes.func
        })
    )
};

export default DisaPage;
import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import PropTypes, { shape } from 'prop-types';
import { DISATABHEIGHT } from './constants.js';

class Content extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        return (
            <div className="p-d-flex p-flex-column" style={{ width: "100%" }}>
                <div className="p-d-flex" style={{ height: DISATABHEIGHT }}>
                    {this.props.views.map((view) => <Route path={view.to} exact component={() => view.contentTabs.map((tab) => tab.refreshOnClick ? React.cloneElement(tab.uiElement, { onClick: () => this.setState(tab.data()) }) : tab.uiElement)} />)}
                </div>
                <div style={{ height: "100%" }}>
                    {this.props.views.map((tab) => <Route path={tab.to} exact component={() => tab.component(this.state)} />)}
                </div>
            </div>
        );
    }
}

Content.propTypes = {
    views: PropTypes.arrayOf(
        shape({
            name: PropTypes.string.isRequired,
            to: PropTypes.string.isRequired,
            disabled: PropTypes.bool.isRequired,
            selectedIcon: PropTypes.string.isRequired,
            deselectedIcon: PropTypes.string.isRequired
        }).isRequired
    )
}

export default Content;
import React, { Component } from 'react';
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
                    {this.props.contentTabs.map(tab => tab.refreshOnClick ? React.cloneElement(tab.uiElement, { onClick: () => this.setState(tab.data()) }) : tab.uiElement)}
                </div>
                <div style={{ height: "100%" }}>
                    {this.props.component(this.state)}
                </div>
            </div>
        );
    }
}

Content.propTypes = {
    contentTabs: PropTypes.arrayOf(
        shape({
            uiElement: PropTypes.element.isRequired,
            refreshOnClick: PropTypes.bool.isRequired,
            data: PropTypes.func.isRequired
        }).isRequired
    ),
    component: PropTypes.element.isRequired
}

export default Content;
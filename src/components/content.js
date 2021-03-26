import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Contentbar from './contentbar.js';
import Contentborder from './contentBorder.js';

class Content extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="p-d-flex p-flex-column" style={{ width: "100%" }}>
                <Contentbar contentTabs={this.props.contentTabs} />
                <div style={{ height: "100%" }}>
                    <Contentborder>
                        {this.props.children}
                    </Contentborder>
                </div>
            </div>
        );
    }
}

Content.propTypes = {
    contentTabs: PropTypes.arrayOf(PropTypes.element).isRequired,
}

export default Content;
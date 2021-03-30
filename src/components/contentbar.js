import React from 'react';
import PropTypes from 'prop-types';

import { DISATABHEIGHT } from './constants.js';

const Contentbar = (props) => (
    <div className="p-d-flex" style={{ height: DISATABHEIGHT }}>
        {props.contentElements}
    </div>
);

Contentbar.propTypes = {
    contentElements: PropTypes.arrayOf(PropTypes.element).isRequired,
}

export default Contentbar;
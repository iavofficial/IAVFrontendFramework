import React from 'react';
import PropTypes from 'prop-types';
import { DISATABHEIGHT } from './constants.js';

const Contentbar = props => /*#__PURE__*/React.createElement("div", {
  className: "p-d-flex",
  style: {
    height: DISATABHEIGHT
  }
}, props.contentTabs);

Contentbar.propTypes = {
  contentTabs: PropTypes.arrayOf(PropTypes.element).isRequired
};
export default Contentbar;
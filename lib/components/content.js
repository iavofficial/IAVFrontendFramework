import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Contentbar from './contentbar.js';
import Contentborder from './contentBorder.js';

class Content extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return /*#__PURE__*/React.createElement("div", {
      className: "p-d-flex p-flex-column",
      style: {
        width: "100%"
      }
    }, /*#__PURE__*/React.createElement(Contentbar, {
      contentTabs: this.props.contentTabs
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        height: "100%"
      }
    }, /*#__PURE__*/React.createElement(Contentborder, null, this.props.children)));
  }

}

Content.propTypes = {
  contentTabs: PropTypes.arrayOf(PropTypes.element).isRequired
};
export default Content;
import React from 'react';
import { useLocation } from 'react-router-dom';
import UserPic from '../assets/user.png';
import LogoutPic from '../assets/logout_icon.png';
import Clock from './clock.js';
import { BLUE4, DISATABHEIGHT } from './constants.js';

const Navbar = props => {
  let location = useLocation();
  return /*#__PURE__*/React.createElement("div", {
    className: "p-d-flex p-dir-col p-lg-2",
    style: {
      "padding": "0px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "p-d-flex p-align-center",
    style: {
      height: DISATABHEIGHT,
      backgroundColor: BLUE4
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: UserPic,
    style: {
      marginLeft: "5%"
    },
    alt: ""
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: "bold",
      color: "white",
      marginLeft: "10px"
    }
  }, "PLACEHOLDER"), /*#__PURE__*/React.createElement("img", {
    src: LogoutPic,
    style: {
      marginLeft: "auto",
      marginRight: "20px",
      cursor: "pointer"
    },
    alt: ""
  })), React.Children.map(props.children, child => /*#__PURE__*/React.cloneElement(child, {
    active: location.pathname === child.props.to
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: "auto"
    }
  }, /*#__PURE__*/React.createElement(Clock, null)));
};

export default Navbar;
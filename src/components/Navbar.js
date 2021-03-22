import React from 'react';
import { useLocation } from 'react-router-dom';
import UserPic from '../assets/user.png';
import LogoutPic from '../assets/logout_icon.png';
import Clock from './clock.js';
import { BLUE4, DISATABHEIGHT } from './constants.js';

const Navbar = (props) => {
    let location = useLocation();
    return (
        <div className="p-d-flex p-dir-col p-lg-2" style={{ "padding": "0px" }}>
            <div className="p-d-flex p-align-center" style={{ height: DISATABHEIGHT, backgroundColor: BLUE4 }}>
                <img src={UserPic} style={{ marginLeft: "5%" }} alt="" />
                <span style={{ fontWeight: "bold", color: "white", marginLeft: "10px" }}>PLACEHOLDER</span>
                <img src={LogoutPic} style={{ marginLeft: "auto", marginRight: "20px", cursor: "pointer" }} alt="" />
            </div>
            {React.Children.map(props.children, (child) =>
                React.cloneElement(child, { active: location.pathname === child.props.to })
            )}
            <div style={{ marginTop: "auto" }}>
                <Clock />
            </div>
        </div>
    );
};

export default Navbar;
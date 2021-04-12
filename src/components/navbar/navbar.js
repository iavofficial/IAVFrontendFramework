import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom";

import UserPic from "../../assets/user.png";
import LogoutPic from "../../assets/logout_icon.png";
import Clock from "../clock";
import { BLUE3, DISATABHEIGHT } from "../constants";
import AuthContext from "../../contexts/auth";

const Navbar = (props) => {
    let location = useLocation();
    let context = useContext(AuthContext);
    return (
        <div className="p-d-flex p-dir-col p-lg-2" style={{ "padding": "0px" }}>
            <div className="p-d-flex p-align-center" style={{ height: DISATABHEIGHT, backgroundColor: BLUE3 }}>
                <img src={UserPic} style={{ marginLeft: "5%" }} alt="" />
                <span style={{ fontWeight: "bold", color: "white", marginLeft: "10px", maxWidth: "60%", textOverflow: "ellipsis", overflow: "hidden" }}>
                    {context.getUsername()}
                </span>
                <img src={LogoutPic} style={{ marginLeft: "auto", marginRight: "20px", cursor: "pointer" }} alt="" onClick={context.logout} />
            </div>
            {React.Children.map(props.children, child =>
                React.cloneElement(child, { active: location.pathname === child.props.to })
            )}
            <div style={{ marginTop: "auto" }}>
                <div style={{ display: "flex", justifyContent: "center" }}>
                    <Link style={{ fontWeight: "bolder", color: "black" }} to="/imprint">Imprint</Link>
                </div>
                <Clock />
            </div>
        </div>
    );
};

export default Navbar;
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

import { BLUE1, GRAY2, DISATABHEIGHT } from "../../constants";
import { navbarTabProps } from "./navbarTab";

interface State {
    hovering: Boolean
}

export const StandardNavbarTab = (props: navbarTabProps) => {

    const active = useLocation().pathname === props.to;

    const [hovering, setHovering] = useState(false);

    const tabStyle = {
        height: DISATABHEIGHT,
        cursor: active || props.disabled ? "default" : "pointer",
        backgroundColor: (active || hovering) && !props.disabled ? BLUE1 : "white",
        color: (active || hovering) && !props.disabled ? "white" : "black",
        opacity: props.disabled ? 0.5 : 1
    };

    const tab = (
        <div style={{ borderStyle: "solid", borderWidth: "0px 0px 1px 0px", borderColor: GRAY2 }}
            onMouseEnter={() => setHovering(true)} onMouseLeave={() => setHovering(false)}>
            <div className="p-d-flex p-align-center" style={tabStyle}>
                {console.log(props.selectedIcon.valueOf())}
                <img src={(active || hovering) && !props.disabled ? props.selectedIcon.valueOf() : props.deselectedIcon.valueOf()}
                    style={{ marginLeft: "5%" }} alt="" />
                <span style={{ fontWeight: "bold" }}>{props.name}</span>
            </div>
        </div>
    );

    return (
        props.disabled ? tab :
        <Link style={{ textDecoration: "none" }} to={props.to.valueOf()}>
            {tab}
        </Link>
    );
}
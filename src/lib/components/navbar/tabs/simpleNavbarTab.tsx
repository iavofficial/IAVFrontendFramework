import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

import {  BLUE3NEW, GRAY2, TAB_HEIGHT } from "../../../constants";
import { useTranslator } from "../../internationalization/translators";
import { navbarTabProps } from "./navbarTab";

export const SimpleNavbarTab = (props: navbarTabProps) => {

    const active = useLocation().pathname === props.to;

    const [hovering, setHovering] = useState(false);

    const t = useTranslator();

    const tabStyle = {
        height: TAB_HEIGHT,
        cursor: active || props.disabled ? "default" : "pointer",
        backgroundColor: (active || hovering) && !props.disabled ? BLUE3NEW : "white",
        color: (active || hovering) && !props.disabled ? "white" : "black",
        opacity: props.disabled ? 0.5 : 1
    };

    const tab = (
        <div className={"navbar-tab-wrapper " + (active ? "active" : "")}>
            <div className="navbar-tab" style={{ borderColor: GRAY2 }}
                onMouseEnter={() => setHovering(true)} onMouseLeave={() => setHovering(false)}>
                <div className="p-d-flex p-align-center" style={tabStyle}>
                    <img src={(active || hovering) && !props.disabled ? props.selectedIcon.valueOf() : props.deselectedIcon.valueOf()} alt="" />
                    <span id="navbar-tab-name">{props.name instanceof Function ? props.name(t) : props.name}</span>
                </div>
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
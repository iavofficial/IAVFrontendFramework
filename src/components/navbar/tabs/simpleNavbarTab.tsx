import React, { useContext, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTranslator } from "../../internationalization/translators";
import "./tabs.css";
import { groupableNavbarTab } from "./navbarTab";
import { ColorSettingsContext } from "../../../contexts/colorsettings";
import { SimpleNavbarTabCollapsed } from "../navbarTabs/simpleNavbarTabCollapsed";
import { SimpleNavbarTabUnfolded } from "../navbarTabs/simpleNavbarTabUnfolded";

export const SimpleNavbarTab: groupableNavbarTab = (props) => {
  const [hovering, setHovering] = useState(false);
  const colorSettingsContext = useContext(ColorSettingsContext);
  const t = useTranslator();
  const active = useLocation().pathname === props.to;

  let highlightColor =
    colorSettingsContext.currentColors.navbarColors.tabColors.highlightColor;
  let mainColor =
    colorSettingsContext.currentColors.navbarColors.tabColors.mainColor;

  let letteringHighlightColor =
    colorSettingsContext.currentColors.navbarColors.tabColors
      .letteringHighlightColor;
  let letteringMainColor =
    colorSettingsContext.currentColors.navbarColors.tabColors
      .letteringMainColor;
      
  const tabStyleDefault = {
    width: props.navbarCollapsed ? "40px" : "240px",
    cursor: active || props.disabled ? "default" : "pointer",
    backgroundColor:
      (active || hovering) && !props.disabled ? highlightColor : mainColor,
    color:
      (active || hovering) && !props.disabled
        ? letteringHighlightColor
        : letteringMainColor,
    opacity: props.disabled ? 0.5 : 1,
  };

  const navbarTab = props.navbarCollapsed ? (
    <SimpleNavbarTabCollapsed
      style={tabStyleDefault}
      setHovering={setHovering}
      hovering={hovering}
      active={active}
      icon={props.icon}
      name={props.name instanceof Function ? props.name(t) : props.name}
      disabled={props.disabled}
    />
  ) : (
    <SimpleNavbarTabUnfolded
      style={tabStyleDefault}
      setHovering={setHovering}
      hovering={hovering}
      active={active}
      icon={props.icon}
      name={props.name instanceof Function ? props.name(t) : props.name}
      disabled={props.disabled}
    />
  );

  return (
    <div className="navbar-tab-space">
      {props.disabled ? (
        <>
          {navbarTab}
          <div
            className="flex"
            style={{ width: props.navbarCollapsed ? "40px" : "240px" }}
          >
            <div style={{ width: "80%" }} />
          </div>
        </>
      ) : (
        <>
          <Link style={{ textDecoration: "none" }} to={props.to.valueOf()}>
            {navbarTab}
          </Link>
        </>
      )}
    </div>
  );
};

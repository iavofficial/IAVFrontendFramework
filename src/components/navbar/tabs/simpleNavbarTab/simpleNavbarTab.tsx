import React, { useContext, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTranslator } from "../../../internationalization/translators";
import "../tabs.css";
import { GroupableNavbarTab } from "../typesNavbarTab";
import { ColorSettingsContext } from "../../../../contexts/colorsettings";
import { SimpleNavbarTabCollapsed } from "./simpleNavbarTabCollapsed";
import { SimpleNavbarTabUnfolded } from "./simpleNavbarTabUnfolded";

export const SimpleNavbarTab: GroupableNavbarTab = (props) => {
  const navbarCollapsed = props.frameworkInjectedOptions.navbarCollapsed;
  const path = props.frameworkInjectedOptions.path;
  const insideActiveGroup = props.frameworkInjectedOptions.groupActive;

  const [hovering, setHovering] = useState(false);
  const colorSettingsContext = useContext(ColorSettingsContext);
  const t = useTranslator();
  const active = useLocation().pathname === path;

  let highlightColor =
    colorSettingsContext.currentColors.navbarColors.tabColors.tabHighlightColor;
  let mainColor =
    colorSettingsContext.currentColors.navbarColors.tabColors.mainColor;
  const insideActiveGroupColor =
    colorSettingsContext.currentColors.navbarColors.tabColors
      .tabInsideActiveGroupColor;

  let backgroundColor = mainColor;
  if ((active || hovering) && !props.disabled) {
    backgroundColor = highlightColor;
  } else if (insideActiveGroup) {
    backgroundColor = insideActiveGroupColor;
  }

  let fontHighlightColor =
    colorSettingsContext.currentColors.navbarColors.tabColors
      .tabFontHighlightColor;
  let fontMainColor =
    colorSettingsContext.currentColors.navbarColors.tabColors.tabFontMainColor;

  const tabStyleDefault = {
    width: navbarCollapsed ? "40px" : "240px",
    cursor: active || props.disabled ? "default" : "pointer",
    backgroundColor: backgroundColor,
    color:
      (active || hovering) && !props.disabled
        ? fontHighlightColor
        : fontMainColor,
    opacity: props.disabled ? 0.5 : 1
  };

  const additionalClassNames = !insideActiveGroup ? "navbar-tab-space" : "";

  const navbarTab = navbarCollapsed ? (
    <SimpleNavbarTabCollapsed
      style={tabStyleDefault}
      setHovering={setHovering}
      hovering={hovering}
      active={active}
      icon={props.icon}
      name={props.name instanceof Function ? props.name(t) : props.name}
      disabled={props.disabled}
      additionalClassNames={additionalClassNames}
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
      additionalClassNames={additionalClassNames}
    />
  );

  return props.disabled ? (
    <>
      {navbarTab}
      <div
        className="flex"
        style={{ width: navbarCollapsed ? "40px" : "240px" }}
      >
        <div style={{ width: "80%" }} />
      </div>
    </>
  ) : (
    <>
      <Link style={{ textDecoration: "none" }} to={path}>
        {navbarTab}
      </Link>
    </>
  );
};

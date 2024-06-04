import React, { ReactElement, useContext, useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTranslator } from "../../../internationalization/translators";
import "../tabs.css";
import { GroupableNavbarTab } from "../typesNavbarTab";
import { ColorSettingsContext } from "../../../../contexts/colorsettings";
import { SimpleNavbarTabCollapsed } from "./simpleNavbarTabCollapsed";
import { SimpleNavbarTabUnfolded } from "./simpleNavbarTabUnfolded";
import {
  determineCurrentColor,
  determineCurrentColorInsideGroup,
} from "../../../../utils/determineCurrentColor";

export interface NestedNavbarTabProps {
  additionalClassNames: string;
  setHovering: (state: boolean) => void;
  style: object;
  iconColor: string;
  name: string;
  icon?: ReactElement;
}

export const SimpleNavbarTab: GroupableNavbarTab = (props) => {
  const navbarCollapsed = props.frameworkInjectedOptions.navbarCollapsed;
  const path = props.frameworkInjectedOptions.path;
  const insideActiveGroup = props.frameworkInjectedOptions.groupActive;

  const [hovering, setHovering] = useState(false);
  const colorSettingsContext = useContext(ColorSettingsContext);
  const t = useTranslator();

  // Use useMemo to improve performance.
  const regex = useMemo(() => {
    let regexString = path;
    // Escape all slashes
    regexString = regexString.replaceAll("/", "\\/");
    // Add ^ to match the beginning of the path. Add * for allowing other characters.
    regexString = `^${regexString}.*`;
    return new RegExp(regexString);
  }, [path]);

  const active = regex.test(useLocation().pathname);


  const tabBackgroundDefaultColor =
    colorSettingsContext.currentColors.navbar.content.default
      .tabBackgroundDefaultColor;
  const tabBackgroundHoverColor =
    colorSettingsContext.currentColors.navbar.content.hover
      .tabBackgroundHoverColor;
  const tabBackgroundActiveColor =
    colorSettingsContext.currentColors.navbar.content.active
      .tabBackgroundActiveColor;
  const insideActiveGroupColor =
    colorSettingsContext.currentColors.navbar.content.insideActiveGroupColor;

  const fontDefaultColor =
    colorSettingsContext.currentColors.navbar.content.default
      .tabFontDefaultColor;
  const fontHoverColor =
    colorSettingsContext.currentColors.navbar.content.hover.tabFontHoverColor;
  const fontActiveColor =
    colorSettingsContext.currentColors.navbar.content.active.tabFontActiveColor;

  const iconDefaultColor =
    colorSettingsContext.currentColors.navbar.content.default
      .tabIconDefaultColor;
  const iconHoverColor =
    colorSettingsContext.currentColors.navbar.content.hover.tabIconHoverColor;
  const iconActiveColor =
    colorSettingsContext.currentColors.navbar.content.active.tabIconActiveColor;

  const tabState = {
    isActive: active,
    isHovering: hovering,
    isDisabled: props.disabled,
    isInsideActiveGroup: insideActiveGroup,
  };

  const backgroundColor = determineCurrentColorInsideGroup(tabState, {
    activeColor: tabBackgroundActiveColor,
    hoverColor: tabBackgroundHoverColor,
    defaultColor: tabBackgroundDefaultColor,
    insideActiveGroupColor: insideActiveGroupColor,
  });

  const fontColor = determineCurrentColor(tabState, {
    activeColor: fontActiveColor,
    hoverColor: fontHoverColor,
    defaultColor: fontDefaultColor,
  });

  const iconColor = determineCurrentColor(tabState, {
    defaultColor: iconDefaultColor,
    hoverColor: iconHoverColor,
    activeColor: iconActiveColor,
  });

  const tabStyleDefault = {
    width: navbarCollapsed ? "40px" : "240px",
    cursor: active || props.disabled ? "default" : "pointer",
    backgroundColor: backgroundColor,
    color: fontColor,
    opacity: props.disabled ? 0.5 : 1,
  };

  const additionalClassNames = !insideActiveGroup ? "navbar-tab-space" : "";

  const nestedProps = {
    style: tabStyleDefault,
    setHovering: setHovering,
    icon: props.icon,
    name: props.name instanceof Function ? props.name(t) : props.name,
    additionalClassNames: additionalClassNames,
    iconColor: iconColor,
  };

  const navbarTab = navbarCollapsed ? (
    <SimpleNavbarTabCollapsed {...nestedProps} />
  ) : (
    <SimpleNavbarTabUnfolded {...nestedProps} />
  );

  return props.disabled ? (
    <>{navbarTab}</>
  ) : (
    <>
      <Link style={{ textDecoration: "none" }} to={path}>
        {navbarTab}
      </Link>
    </>
  );
};

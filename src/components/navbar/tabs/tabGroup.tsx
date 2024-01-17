import React, { ReactElement, useContext, useEffect, useState } from "react";
import "../navbar.css";
import { useTranslator } from "../../internationalization/translators";
import { BLACK, BLUE0, GREY3, GREY5, WHITE } from "../../../constants";
import { generateHashOfLength } from "../../../utils/hash";
import { Tooltip } from "primereact/tooltip";
import { navbarTabProps } from "./navbarTab";
import { ColorSettingsContext } from "../../../contexts/colorsettings";
import { SvgIcon } from "./svgIcon";
import { TranslateFunctionType } from "../../../types/translationFunction";

interface Props {
  name: string | ((t: TranslateFunctionType) => string);
  logo?: ReactElement;
  collapsible?: boolean;
  collapsed?: boolean;

  navbarCollapsed: boolean;
}

type PropsWithNavbarTabChildren<T> = T & {
  children: ReactElement<navbarTabProps>[];
};

export const TabGroup = (props: PropsWithNavbarTabChildren<Props>) => {
  const t = useTranslator();
  const colorSettingsContext = useContext(ColorSettingsContext);
  const [hovering, setHovering] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  let highlightColor =
    colorSettingsContext.currentColors.navbarColors.tabColors.highlightColor;
  let mainColor =
    colorSettingsContext?.currentColors.navbarColors.tabColors.mainColor;

  let letteringHighlightColor =
    colorSettingsContext.currentColors.navbarColors.tabColors
      .letteringHighlightColor;
  let letteringMainColor =
    colorSettingsContext.currentColors.navbarColors.tabColors
      .letteringMainColor;

  let iconHighlightColor =
    colorSettingsContext.currentColors.navbarColors.tabColors
      .iconHighlightColor;
  let iconMainColor =
    colorSettingsContext.currentColors.navbarColors.tabColors.iconMainColor;

  let arrowMainColor =
    colorSettingsContext.currentColors.navbarColors.tabColors.arrowMainColor;
  let arrowHighlightColor =
    colorSettingsContext.currentColors.navbarColors.tabColors
      .arrowHighlightColor;

  const collapsible =
    props.collapsible !== undefined ? props.collapsible : true;

  useEffect(() => {
    if (!collapsible) {
      setCollapsed(true);
    }
  }, [collapsible]);

  const tabStyleDefault = {
    height: "40px",
    width: props.navbarCollapsed ? "40px" : "240px",
    cursor: "pointer",
    backgroundColor: hovering ? highlightColor : mainColor,
    color: hovering ? letteringHighlightColor : letteringMainColor,
    opacity: 1,
    padding: props.navbarCollapsed ? "0px" : "0px 16px 0px 0px",
  };

  const identifier = generateHashOfLength(4);
  const identifierLegal = "a" + identifier;
  const identifierWithDot = "." + identifierLegal;

  const groupElement = props.navbarCollapsed ? (
    <>
      <div
        className={"flex align-items-center " + identifierLegal}
        style={tabStyleDefault}
        id="navbartab-general"
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
      >
        <SvgIcon
          color={hovering ? iconHighlightColor : iconMainColor}
          element={props.logo}
        />
        <Tooltip
          content={props.name instanceof Function ? props.name(t) : props.name}
          target={identifierWithDot}
          id="hover-image"
        />
      </div>
    </>
  ) : (
    <div
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      className="flex align-items-center justify-content-between navbar-tab-space"
      style={tabStyleDefault}
      onClick={() => {
        if (collapsible) {
          setCollapsed(!collapsed);
        }
      }}
    >
      <div className="flex" style={{ height: "100%" }}>
        <div className="flex align-items-center">
          <SvgIcon
            color={hovering ? iconHighlightColor : iconMainColor}
            element={props.logo}
          />
          <span id="navbar-tab-name">
            {props.name instanceof Function ? props.name(t) : props.name}
          </span>
        </div>
      </div>
      <i
        style={{
          cursor: "pointer",
          fontSize: "15px",
          color: hovering ? arrowHighlightColor : arrowMainColor,
        }}
        className={collapsed ? "pi pi-chevron-down" : "pi pi-chevron-left"}
      />
    </div>
  );

  return (
    <>
      {groupElement}
      {collapsed ? (
        props.children.map((child) => {
          if (React.isValidElement(child)) {
            return React.cloneElement(child, { collapsed: collapsed });
          }
          return child;
        })
      ) : (
        <React.Fragment />
      )}
    </>
  );
};

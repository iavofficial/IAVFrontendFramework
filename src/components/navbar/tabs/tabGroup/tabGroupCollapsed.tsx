import React, { useContext, useId } from "react";
import { ColorSettingsContext } from "../../../../contexts/colorsettings";
import { SvgIcon } from "../svgIcon";
import { Tooltip } from "primereact/tooltip";
import { GroupTabProps } from "./groupTabTypes";

export const TabGroupCollapsed = (props: GroupTabProps) => {
  // This id is needed for PrimeReact. It has to begin with a letter.
  const id = "a" + useId();

  const colorSettingsContext = useContext(ColorSettingsContext);

  const iconHighlightColor =
    colorSettingsContext.currentColors.navbarColors.tabColors
      .iconHighlightColor;
  const iconMainColor =
    colorSettingsContext.currentColors.navbarColors.tabColors.iconMainColor;

  return (
    <div
      className={"default-general-navbar-style flex align-items-center " + id}
      style={props.style}
      id="navbartab-general"
      onMouseEnter={() => props.setHovering(true)}
      onMouseLeave={() => props.setHovering(false)}
    >
      <SvgIcon
        color={props.hovering ? iconHighlightColor : iconMainColor}
        element={props.logo}
      />
      <Tooltip content={props.name} target={`.${id}`} id="hover-image" />
    </div>
  );
};

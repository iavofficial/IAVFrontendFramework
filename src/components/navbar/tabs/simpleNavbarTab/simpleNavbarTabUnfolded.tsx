import React from "react";
import { useContext, useId } from "react";
import { ColorSettingsContext } from "../../../../contexts/colorsettings";
import { SvgIcon } from "../svgIcon";
import { SimpleNavbarTabProps } from "./typesSimpleNavbarTab";

export const SimpleNavbarTabUnfolded = (props: SimpleNavbarTabProps) => {
  // This id is needed for PrimeReact. It has to begin with a letter.
  // TODO: const id = "a" + useId();

  const colorSettingsContext = useContext(ColorSettingsContext);

  const iconHighlightColor =
    colorSettingsContext.currentColors.navbarColors.tabColors
      .iconHighlightColor;
  const iconMainColor =
    colorSettingsContext.currentColors.navbarColors.tabColors.iconMainColor;

  return (
    <div
      className="default-general-navbar-style flex "
      style={props.style}
      onMouseEnter={() => props.setHovering(true)}
      onMouseLeave={() => props.setHovering(false)}
    >
      <div style={{ width: "228px" }} className="flex align-items-center">
        <SvgIcon
          color={
            (props.active || props.hovering) && !props.disabled
              ? iconHighlightColor
              : iconMainColor
          }
          element={props.icon}
        />
        <span id="navbar-tab-name">{props.name}</span>
      </div>
    </div>
  );
};

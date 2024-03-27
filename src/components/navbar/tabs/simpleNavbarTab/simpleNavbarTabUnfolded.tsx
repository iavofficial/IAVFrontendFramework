import React from "react";
import { useContext } from "react";
import { ColorSettingsContext } from "../../../../contexts/colorsettings";
import { SvgIcon } from "../svgIcon";
import { SimpleNavbarTabProps } from "./typesSimpleNavbarTab";

export const SimpleNavbarTabUnfolded = (props: SimpleNavbarTabProps) => {
  const colorSettingsContext = useContext(ColorSettingsContext);

  const iconHighlightColor =
    colorSettingsContext.currentColors.navbarColors.tabColors
      .iconHighlightColor;
  const iconMainColor =
    colorSettingsContext.currentColors.navbarColors.tabColors.iconMainColor;

  let className = "default-nav-element-unfolded default-tab-unfolded flex ";

  if (props.additionalClassNames) {
    className += props.additionalClassNames;
  }

  return (
    <div
      className={className}
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

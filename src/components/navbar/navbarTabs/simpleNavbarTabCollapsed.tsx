import React, { useContext, useId } from "react";
import { ColorSettingsContext } from "../../../contexts/colorsettings";
import { SvgIcon } from "../tabs/svgIcon";
import { Tooltip } from "primereact/tooltip";
import { SimpleNavbarTabProps } from "./simpleNavbarTabTypes";

export const SimpleNavbarTabCollapsed = (props: SimpleNavbarTabProps) => {
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
      onMouseEnter={() => props.setHovering(true)}
      onMouseLeave={() => props.setHovering(false)}
      className={
        "default-general-navbar-style flex align-items-center " + id
      }
      style={props.style}
    >
      <SvgIcon
        color={
          (props.active || props.hovering) && !props.disabled
            ? iconHighlightColor
            : iconMainColor
        }
        element={props.icon}
      />
      <Tooltip
        content={props.name}
        target={`.${id}`}
        id="hover-image"
      />
    </div>
  );
};

import React, { useContext, useRef } from "react";
import { ColorSettingsContext } from "../../../../contexts/colorsettings";
import { SvgIcon } from "../svgIcon";
import { Tooltip } from "primereact/tooltip";
import { SimpleNavbarTabProps } from "./typesSimpleNavbarTab";

export const SimpleNavbarTabCollapsed = (props: SimpleNavbarTabProps) => {
  const ref = useRef<HTMLDivElement>(null);

  const colorSettingsContext = useContext(ColorSettingsContext);

  const iconHighlightColor =
    colorSettingsContext.currentColors.navbarColors.tabColors
      .iconHighlightColor;
  const iconMainColor =
    colorSettingsContext.currentColors.navbarColors.tabColors.iconMainColor;

  let className = "default-tab-style flex align-items-center ";

  if (props.additionalClassNames) {
    className += props.additionalClassNames;
  }

  return (
    <div
      ref={ref}
      onMouseEnter={() => props.setHovering(true)}
      onMouseLeave={() => props.setHovering(false)}
      className={className}
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
      <Tooltip content={props.name} target={ref} id="hover-image" />
    </div>
  );
};

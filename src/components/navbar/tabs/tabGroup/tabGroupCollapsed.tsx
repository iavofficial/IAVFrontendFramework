import React, { useContext, useId, useRef } from "react";
import { ColorSettingsContext } from "../../../../contexts/colorsettings";
import { SvgIcon } from "../svgIcon";
import { Tooltip } from "primereact/tooltip";
import { PropsGroupTab } from "./typesTabGroup";

export const TabGroupCollapsed = (props: PropsGroupTab) => {
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
      className={className}
      style={props.style}
      id="navbartab-general"
      onMouseEnter={() => props.setHovering(true)}
      onMouseLeave={() => props.setHovering(false)}
    >
      <SvgIcon
        color={props.hovering ? iconHighlightColor : iconMainColor}
        element={props.logo}
      />
      <Tooltip content={props.name} target={ref} id="hover-image" />
    </div>
  );
};

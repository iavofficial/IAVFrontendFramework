import React, { useContext, useId } from "react";
import { PropsGroupTab } from "./typesTabGroup";
import { SvgIcon } from "../svgIcon";
import { ColorSettingsContext } from "../../../../contexts/colorsettings";

interface Props {
  collapsible: boolean;
  groupTabCollapsed: boolean;
  setGroupTabCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
}

export const TabGroupUnfolded = (props: PropsGroupTab & Props) => {
  // This id is needed for PrimeReact. It has to begin with a letter.
  // TODO: const id = "a" + useId();

  const colorSettingsContext = useContext(ColorSettingsContext);

  const iconHighlightColor =
    colorSettingsContext.currentColors.navbarColors.tabColors
      .iconHighlightColor;
  const iconMainColor =
    colorSettingsContext.currentColors.navbarColors.tabColors.iconMainColor;

  const arrowMainColor =
    colorSettingsContext.currentColors.navbarColors.tabColors.arrowMainColor;
  const arrowHighlightColor =
    colorSettingsContext.currentColors.navbarColors.tabColors
      .arrowHighlightColor;

  let className = "default-tab-style flex align-items-center justify-content-between ";

  if (props.additionalClassNames) {
    className += props.additionalClassNames;
  }

  return (
    <div
      onMouseEnter={() => props.setHovering(true)}
      onMouseLeave={() => props.setHovering(false)}
      className={className}
      style={props.style}
      onClick={() => {
        if (props.collapsible) {
          props.setGroupTabCollapsed(
            (prevGroupTabCollapsed: boolean) => !prevGroupTabCollapsed
          );
        }
      }}
    >
      <div className="flex" style={{ height: "100%" }}>
        <div className="flex align-items-center">
          <SvgIcon
            color={props.hovering ? iconHighlightColor : iconMainColor}
            element={props.logo}
          />
          <span id="navbar-tab-name">{props.name}</span>
        </div>
      </div>
      <i
        style={{
          cursor: "pointer",
          fontSize: "15px",
          color: props.hovering ? arrowHighlightColor : arrowMainColor,
        }}
        className={
          props.groupTabCollapsed ? "pi pi-chevron-left" : "pi pi-chevron-down"
        }
      />
    </div>
  );
};

import React from "react";
import { PropsGroupTab } from "./typesTabGroup";
import { SvgIcon } from "../svgIcon";

export const TabGroupUnfolded = (props: PropsGroupTab) => {
  return (
    <div className="default-nav-element-unfolded default-nav-group-unfolded flex h-full">
      <div className="flex align-items-center w-full">
        <SvgIcon
          color={
            props.hovering
              ? props.colors.iconHighlightColor
              : props.colors.iconMainColor
          }
          element={props.logo}
        />
        <div className="w-full">
          <span id="navbar-tab-name">{props.name}</span>
          <i
            style={{
              cursor: "pointer",
              fontSize: "16px",
              color: props.hovering
                ? props.colors.arrowHighlightColor
                : props.colors.arrowMainColor,
            }}
            className={
              props.groupTabCollapsed
                ? "pi pi-chevron-left"
                : "pi pi-chevron-down"
            }
          />
        </div>
      </div>
    </div>
  );
};

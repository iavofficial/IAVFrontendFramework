import React from "react";
import { PropsGroupTab } from "./typesTabGroup";
import { SvgIcon } from "../svgIcon";

import "./tabGroupUnfolded.css";

export const TabGroupUnfolded = (props: PropsGroupTab) => {
  return (
    <div className="default-nav-element-unfolded default-nav-group-unfolded flex h-full w-full">
      <div className="unfolded-group-wrapper">
        <SvgIcon
          color={
            props.hovering
              ? props.colors.iconHighlightColor
              : props.colors.iconMainColor
          }
          element={props.logo}
        />
        <div className="unfolded-group-name-arrow-wrapper">
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

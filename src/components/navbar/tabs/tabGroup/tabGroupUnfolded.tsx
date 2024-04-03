import React from "react";
import { GeneralGroupTabProps } from "./typesTabGroup";
import { SvgIcon } from "../svgIcon";

import "./tabGroupUnfolded.css";

interface AdditionalProps {
  colors: {
    iconColor: string;
    arrowColor: string;
  }
}

export const TabGroupUnfolded = (props: GeneralGroupTabProps & AdditionalProps) => {
  return (
    <div className="default-nav-element-unfolded default-nav-group-unfolded flex h-full w-full">
      <div className="unfolded-group-wrapper">
        <SvgIcon
          color={props.colors.iconColor}
          element={props.logo}
        />
        <div className="unfolded-group-name-arrow-wrapper">
          <span id="navbar-tab-name">{props.name}</span>
          <i
            style={{
              cursor: "pointer",
              fontSize: "16px",
              color: props.colors.arrowColor
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

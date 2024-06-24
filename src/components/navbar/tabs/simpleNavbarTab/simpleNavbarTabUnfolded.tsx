import React from "react";
import { SvgIcon } from "../svgIcon";
import { NestedNavbarTabProps } from "./simpleNavbarTab";
import "../tabs.css";

export const SimpleNavbarTabUnfolded = (props: NestedNavbarTabProps) => {
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
      <div className="flex align-items-center">
        <SvgIcon color={props.iconColor} element={props.icon} />
        <span id="navbar-tab-name">{props.name}</span>
      </div>
    </div>
  );
};

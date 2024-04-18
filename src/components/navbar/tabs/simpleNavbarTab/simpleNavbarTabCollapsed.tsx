import React, { useRef } from "react";
import { SvgIcon } from "../svgIcon";
import { Tooltip } from "primereact/tooltip";
import { NestedNavbarTabProps } from "./simpleNavbarTab";

export const SimpleNavbarTabCollapsed = (props: NestedNavbarTabProps) => {
  const ref = useRef<HTMLDivElement>(null);

  let className =
    "default-nav-element-collapsed default-tab-collapsed flex align-items-center ";

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
        color={props.iconColor}
        element={props.icon}
      />
      <Tooltip content={props.name} target={ref} id="hover-image" />
    </div>
  );
};

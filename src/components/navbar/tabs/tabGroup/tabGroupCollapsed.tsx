import React, { useRef } from "react";
import { Tooltip } from "primereact/tooltip";
import { PropsGroupTab } from "./typesTabGroup";

export const TabGroupCollapsed = (props: PropsGroupTab) => {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={ref}
      className="default-nav-element-collapsed default-nav-group-collapsed w-full flex align-items-center"
      style={{ width: "100%" }}
    >
      <i
        style={{
          cursor: "pointer",
          fontSize: "16px",
          color: props.hovering
            ? props.colors.arrowHighlightColor
            : props.colors.arrowMainColor,
        }}
        className={
          props.groupTabCollapsed ? "pi pi-chevron-left" : "pi pi-chevron-down"
        }
      />
      <Tooltip content={props.name} target={ref} id="hover-image" />
    </div>
  );
};

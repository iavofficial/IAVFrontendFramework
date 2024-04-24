import React, { useRef } from "react";
import { Tooltip } from "primereact/tooltip";
import { GeneralGroupTabProps } from "./typesTabGroup";

interface AdditionalProps {
  colors: {
    arrowColor: string;
  }
}

export const TabGroupCollapsed = (props: GeneralGroupTabProps & AdditionalProps) => {
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
          color: props.colors.arrowColor
        }}
        className={
          props.groupTabCollapsed ? "pi pi-chevron-left" : "pi pi-chevron-down"
        }
      />
      <Tooltip content={props.name} target={ref} id="hover-image" />
    </div>
  );
};

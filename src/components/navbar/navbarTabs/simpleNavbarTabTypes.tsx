import { ReactElement } from "react";

export interface simpleNavbarTabProps {
  style: { [key: string]: string | number };
  setHovering: (hovering: boolean) => void;
  hovering: boolean;
  active: boolean;
  icon?: ReactElement;
  name: string;
  disabled: boolean;
}

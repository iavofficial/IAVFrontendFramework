import { ReactElement } from "react";

export interface SimpleNavbarTabProps {
  style: { [key: string]: string | number };
  setHovering: (hovering: boolean) => void;
  hovering: boolean;
  active: boolean;
  name: string;
  disabled: boolean;
  icon?: ReactElement;
  additionalClassNames?: string;
}

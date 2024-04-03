import { ReactElement } from "react";

export interface GeneralGroupTabProps {
    hovering: boolean;
    name: string
    groupTabCollapsed: boolean;
    logo?: ReactElement;
}
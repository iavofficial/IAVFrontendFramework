import { ReactElement } from "react";

export interface PropsGroupTab {
    hovering: boolean;
    name: string
    groupTabCollapsed: boolean;
    colors: {
        iconHighlightColor: string;
        iconMainColor: string;
        arrowHighlightColor: string;
        arrowMainColor: string;
    }
    logo?: ReactElement;
}
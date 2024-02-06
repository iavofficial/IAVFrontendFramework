import { ReactElement } from "react";

export interface PropsGroupTab {
    style: {[key: string]: string | number};
    setHovering: (hovering: boolean) => void;
    hovering: boolean;
    name: string
    logo?: ReactElement;
    additionalClassNames?: string;
}
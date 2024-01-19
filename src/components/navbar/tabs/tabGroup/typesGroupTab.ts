import { ReactElement } from "react";
import { basicNavbarTabFrameworkInjectedOptions } from "../typesNavbarTab";

export interface GroupTabProps {
    style: {[key: string]: string | number};
    setHovering: (hovering: boolean) => void;
    hovering: boolean;
    logo?: ReactElement;
    name: string
}

export type GroupInjectedOptions = basicNavbarTabFrameworkInjectedOptions & {
    groupActive: boolean;
}
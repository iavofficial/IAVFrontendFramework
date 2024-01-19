import { ReactElement } from "react";
import { basicNavbarTabFrameworkInjectedOptions } from "../typesNavbarTab";
import { navbarInjectedOptions } from "../../typesNavbar";

export interface GroupTabProps {
    style: {[key: string]: string | number};
    setHovering: (hovering: boolean) => void;
    hovering: boolean;
    logo?: ReactElement;
    name: string
}

export type GroupInjectedOptions = navbarInjectedOptions & {
    groupActive: boolean;
}
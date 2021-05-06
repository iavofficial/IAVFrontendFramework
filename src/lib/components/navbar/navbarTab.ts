import React from "react";

export interface navbarTabProps {
    name: string;
    to: string;
    disabled: boolean;
    selectedIcon: string;
    deselectedIcon: string;
    active?: boolean;
    [attribute: string]: any;
}

export type navbarTab<additional = {}> = React.ComponentType<navbarTabProps & additional>;
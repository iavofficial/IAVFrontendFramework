import React from "react";

export interface navbarTabProps {
    name: string;
    to: string;
    disabled: boolean;
    selectedIcon: string;
    deselectedIcon: string;
    active?: boolean;
}

export type navbarTab<additional = {}> = React.ComponentType<navbarTabProps & additional>;
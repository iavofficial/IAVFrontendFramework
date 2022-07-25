import React from "react";

import { TranslateFunctionType } from "../../../contexts/language";

export interface navbarTabProps {
    name: string | ((t: TranslateFunctionType) => string);
    to: string;
    disabled: boolean;
    selectedIcon: string;
    deselectedIcon: string;
    active?: boolean;
    colorOptions?:{
        tabTextColor: string;
        tabTextHoverColor: string;
        tabHoverBackground: string;
        tabBackground: string;
    }
}

export type navbarTab<additional = {}> = React.ComponentType<navbarTabProps & additional>;
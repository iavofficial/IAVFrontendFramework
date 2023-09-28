import React, { PropsWithChildren } from "react";

export enum LayoutBehaviour {
    // Parent div of content will have no specific layout class
    NONE = "",
    // Parent div will be prime react grid
    GRID = "grid grid-nogutter",
    // Parent will be flexbox
    FLEX = "flex",
    // Parent will be flexbox column
    FLEX_COL = "flex flex-column",
}

interface Props {
    layoutBehaviour: LayoutBehaviour;
}

export const ContentLayout = (props: PropsWithChildren<Props>) => {
    return (
        <div className={`h-full w-full ${props.layoutBehaviour}`}>
            {props.children}
        </div>
    )
}
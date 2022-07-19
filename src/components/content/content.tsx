import React, {ReactElement} from "react";

import {ContentBar} from "./contentBar";
import {GRAY1, GREEN, RED} from "../../constants";

export interface Props {
    contentElements: ReactElement[]
    layoutBehaviour?: LayoutBehaviour;
    backgroundColorContentBar?: string;
    backgroundColorContent?: string;
}

export const Content = (props: React.PropsWithChildren<Props>) => {
    let contentRootClass = "";
    switch (props.layoutBehaviour) {
        case LayoutBehaviour.NONE:
            break;
        case LayoutBehaviour.GRID:
            contentRootClass = "p-grid p-nogutter"
            break;
        case LayoutBehaviour.FLEX:
            contentRootClass = "p-d-flex"
            break;
        case LayoutBehaviour.FLEX_COL:
            contentRootClass = "p-d-flex p-flex-column"
            break;
    }

    return (
        <div className="p-d-flex p-flex-column" style={{width: "100%", overflow: "auto"}}>
            <ContentBar contentElements={props.contentElements} backgroundColorContentBar={props.backgroundColorContentBar}/>
            <div className={contentRootClass} style={{
                height: "100%",
                backgroundColor: (props.backgroundColorContent ? props.backgroundColorContent : GRAY1),
                overflow: "auto"
            }}>
                {props.children}
            </div>
        </div>
    )
}

export enum LayoutBehaviour {
    /**
     * parent div of content will have no specific layout class
     */
    NONE,
    /**
     * parent div will be prime react grid
     */
    GRID,
    /**
     * parent will be flexbox
     */
    FLEX,
    /**
     * parent will be flexbox column
     */
    FLEX_COL,
}
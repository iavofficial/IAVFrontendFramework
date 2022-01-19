import React, {CSSProperties, PropsWithChildren} from "react";
import {WHITE} from "../../constants";

export enum CellPaddings {
    FULL,
    VERT_RIGHT,
    BOT_HOR,
    BOT_RIGHT,
    NONE
}

export interface Props {
    height?: string,
    colWidth?: number,
    clearStyle?: boolean,
    paddings: CellPaddings,
}

export function ContentCell(props: PropsWithChildren<Props>) {
    let paddings = ""
    switch (props.paddings) {
        case CellPaddings.FULL:
            paddings = "p-p-3"
            break;
        case CellPaddings.VERT_RIGHT:
            paddings = "p-py-3 p-pr-3"
            break;
        case CellPaddings.BOT_HOR:
            paddings = "p-pb-3 p-px-3"
            break;
        case CellPaddings.BOT_RIGHT:
            paddings = "p-pb-3 p-pr-3"
            break;
    }
    let columnClass : string;
    if (props.colWidth) {
        columnClass = "p-col-" + props.colWidth;
    } else {
        columnClass = "p-col";
    }

    let innerDivStyle: CSSProperties = {
        width: "100%"
    };
    if (!props.clearStyle) {
        innerDivStyle.backgroundColor = WHITE;
    }
    return (
        <div className={columnClass}>
            <div className={"p-d-flex " + paddings} style={{height: "100%"}}>
                <div style={innerDivStyle}>
                    {props.children}
                </div>
            </div>
        </div>
    )
}
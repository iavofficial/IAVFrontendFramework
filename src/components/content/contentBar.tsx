import React, { ReactElement } from "react";

import { TAB_HEIGHT, WHITE } from "../../constants";

interface Props {
    contentElements: ReactElement[];
    style: {
        backgroundColor?: string;
    }
    
}

export const ContentBar = (props: Props) => (
    <div className="p-d-flex" style={{ height: TAB_HEIGHT, minHeight: TAB_HEIGHT, backgroundColor: (props.style.backgroundColor ? props.style.backgroundColor : WHITE) }}>
        {props.contentElements}
    </div>
);
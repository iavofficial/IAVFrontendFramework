import React, { ReactElement } from "react";

import { TAB_HEIGHT, WHITE } from "../../constants";

interface Props {
    contentElements: ReactElement[];
    backgroundColorContentBar?: string;
}

export const ContentBar = (props: Props) => (
    <div className="p-d-flex" style={{ height: TAB_HEIGHT, minHeight: TAB_HEIGHT, backgroundColor: (props.backgroundColorContentBar ? props.backgroundColorContentBar : WHITE) }}>
        {props.contentElements}
    </div>
);
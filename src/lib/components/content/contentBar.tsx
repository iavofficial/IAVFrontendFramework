import React, { ReactElement } from "react";

import { TAB_HEIGHT } from "../../constants";

interface Props {
    contentElements: ReactElement[]
}

export const ContentBar = (props: Props) => (
    <div className="p-d-flex" style={{ height: TAB_HEIGHT, minHeight: TAB_HEIGHT }}>
        {props.contentElements}
    </div>
);
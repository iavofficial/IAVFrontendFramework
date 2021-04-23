import React from "react";

import { DISATABHEIGHT } from "../constants";

interface Props {
    contentElements: React.Component[]
}

export const Contentbar = (props: Props) => (
    <div className="p-d-flex" style={{ height: DISATABHEIGHT }}>
        {props.contentElements}
    </div>
);
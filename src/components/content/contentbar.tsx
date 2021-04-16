import React from "react";

import { DISATABHEIGHT } from "../constants";

interface Props {
    contentElements: React.Component[]
}

const Contentbar = (props: Props) => (
    <div className="p-d-flex" style={{ height: DISATABHEIGHT }}>
        {props.contentElements}
    </div>
);

export default Contentbar;
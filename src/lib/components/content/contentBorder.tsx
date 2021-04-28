import React from "react";
import { GRAY1 } from "../constants"

export const ContentBorder = (props: React.PropsWithChildren<any>) => (
    <div className="p-d-flex p-flex-column" style={{ height: "100%" }}>
        <div style={{ height: "100%", borderStyle: "solid", borderWidth: "15px 0px 0px 15px", borderColor: GRAY1 }}>
            {props.children}
        </div>
    </div>
);
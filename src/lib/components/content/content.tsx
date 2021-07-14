import React, { Component } from "react";

import { Contentbar } from "./contentbar";
import { GRAY1 } from "../constants";

export interface Props {
    contentElements: React.Component[]
}

export class Content extends Component<React.PropsWithChildren<Props>> {
    constructor(props: Props) {
        super(props);
    }

    render() {
        return (
            <div className="p-d-flex p-dir-col" style={{ width: "100%", flexDirection: "column" }}>
                <div>
                    <Contentbar contentElements={this.props.contentElements} />
                </div>
                <div className="p-d-flex p-flex-column" style={{
                    height: "100%", borderStyle: "solid", borderWidth: "15px 15px 15px 15px",
                    borderColor: GRAY1
                }}>
                    {this.props.children}
                </div>
            </div>
        );
    }
}
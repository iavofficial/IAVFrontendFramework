import React, { Component } from "react";

import { Contentbar } from "./contentbar";
import { ContentBorder } from "./contentBorder";

export interface Props {
    contentElements: React.Component[]
}

export class Content extends Component<React.PropsWithChildren<Props>> {
    constructor(props: Props) {
        super(props);
    }

    render() {
        return (
            <div className="p-d-flex p-flex-column" style={{ width: "100%" }}>
                <Contentbar contentElements={this.props.contentElements} />
                <div style={{ height: "100%" }}>
                    <ContentBorder>
                        {this.props.children}
                    </ContentBorder>
                </div>
            </div>
        );
    }
}
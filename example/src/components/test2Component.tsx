import React, { Component } from "react";
import { FirstContext } from "../contexts/FirstContext";
import { Content } from "disa-framework/content";

export class Test2Component extends Component {
    constructor(props: any) {
        super(props);
    }

    render() {
        return (
            <Content contentElements={this.context.contentTabs}>
                <div>Example data <b>global</b> context: {this.context.test1}</div>
            </Content>
        );
    }
}

Test2Component.contextType = FirstContext;
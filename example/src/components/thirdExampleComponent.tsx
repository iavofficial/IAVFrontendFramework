import React, { Component } from "react";
import { FirstExampleContext } from "../contexts/FirstExampleContext";
import { Content } from "disa-framework/content";

export class ThirdExampleComponent extends Component {
    constructor(props: any) {
        super(props);
    }

    render() {
        return (
            <Content contentElements={this.context.contentTabs}>
                <div>Example data <b>global</b> context: {this.context.exampleData}</div>
            </Content>
        );
    }
}

ThirdExampleComponent.contextType = FirstExampleContext;
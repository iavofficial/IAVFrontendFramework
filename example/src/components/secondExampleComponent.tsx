import React, { Component } from "react";
import { SecondExampleContext } from "../contexts/SecondExampleContext";
import { Content } from "disa-framework/content";

export class SecondExampleComponent extends Component {
    constructor(props: any) {
        super(props);
    }

    render() {
        return (
            <Content contentElements={this.context.contentTabs}>
                <div>This is an example component.</div>
            </Content>
        );
    }
}

SecondExampleComponent.contextType = SecondExampleContext;
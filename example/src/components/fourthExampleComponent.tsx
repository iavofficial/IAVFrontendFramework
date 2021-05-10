import React, { Component } from "react";
import { Content } from "disa-framework/content";
import { SecondExampleContext } from "../contexts/SecondExampleContext";

export class FourthExampleComponent extends Component {
    constructor(props: string) {
        super(props);
    }

    render() {
        return (
            <Content contentElements={this.context.contentTabs}>
                <div>This component is deactivated.</div>
            </Content>
        );
    }
}

FourthExampleComponent.contextType = SecondExampleContext;
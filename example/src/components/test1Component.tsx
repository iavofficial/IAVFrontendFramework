import React, { Component } from "react";
import { SecondContext } from "../contexts/SecondContext";
import { Content } from "disa-framework/content";

export class Test1Component extends Component {
    constructor(props: any) {
        super(props);
    }

    render() {
        return (
            <Content contentElements={this.context.contentTabs}>
                <div>Test</div>
            </Content>
        );
    }
}

Test1Component.contextType = SecondContext;
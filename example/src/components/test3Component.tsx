import { Component } from "react";
import { Content } from "@td-d/disa-framework/content";

export class Test3Component extends Component {
    constructor(props: any) {
        super(props);
    }

    render() {
        return (
            <Content contentElements={this.context.contentTabs}>
                <div>"This is the third test."</div>
            </Content>
        );
    }
}
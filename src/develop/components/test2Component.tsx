import { Component } from "react";
import { FirstContext } from "../contexts/FirstContext";
import { Content } from "../../components/content/content";

export class Test2Component extends Component {
    constructor(props: any) {
        super(props);
    }

    render() {
        return (
            <Content contentElements={this.context.contentTabs}>
                <div>
                    This is the second test.<br />
                    {this.context.test1}
                </div>
            </Content>
        );
    }
}

Test2Component.contextType = FirstContext;
import { Component } from "react";
import Content from "../../components/content/content";

class Test3Component extends Component {
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

export default Test3Component;
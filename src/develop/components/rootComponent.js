import { Component } from 'react';
import { FirstContext } from "../contexts/FirstContext.js";
import Content from '../../components/content.js';

class RootComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            localState: "default",
            contentTabs: [
                <div style={{ backgroundColor: "grey", padding: "4px", marginRight: "10px" }}>Test field local state</div>,
                <div style={{ backgroundColor: "grey", padding: "4px", marginRight: "10px" }}>Test field local state 2</div>
            ]
        }
    }

    render() {
        return (
            <Content contentElements={[...this.context.contentTabs, ...this.state.contentTabs]}>
                <div>This is the root. Example data: {this.context.test1}</div>
                <button onClick={function () { this.context.updateTest1("changed") }.bind(this)}>Click here to test the context</button>
                <div>This is the root. Example data: {this.state.localState}</div>
                <button onClick={function () { this.setState({ localState: "changed local state" }) }.bind(this)}>Click here to test the context</button>
            </Content>
        );
    }
}

RootComponent.contextType = FirstContext;

export default RootComponent;
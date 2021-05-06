import React, { Component } from "react";
import { FirstContext } from "../contexts/FirstContext";
import { Content } from "disa-framework/content";
import { Button } from "primereact/button";

interface State {
    localState: String,
    contentTabs: JSX.Element[]
}

export class RootComponent extends Component<any, State> {
    constructor(props: any) {
        super(props);
        this.state = {
            localState: "default",
            contentTabs: [
                <div style={{ backgroundColor: "#5daedb", color: "white", padding: "4px", marginRight: "5px", display: "flex", alignItems: "center" }}>
                    <span>Test field <b>local</b> element 1</span></div>,
                <div style={{ backgroundColor: "#5daedb", color: "white", padding: "4px", marginRight: "5px", display: "flex", alignItems: "center" }}>
                    <span>Test field <b>local</b> element 2</span></div>,
            ]
        }
    }

    render() {
        return (
            <Content contentElements={[...this.context.contentTabs, ...this.state.contentTabs]}>
                <div>Example data <b>global</b> context: {this.context.test1}</div>
                <div>Example data <b>local</b> context: {this.state.localState}</div>
                <div style={{ margin: "20px 0px 20px 0px" }}>
                    <Button onClick={function (this: RootComponent) { this.context.updateTest1("changed with local element") }.bind(this)}>
                        <span>Change <b>global</b> context</span>
                    </Button>
                </div>
                <div>
                    <Button onClick={function (this: RootComponent) { this.setState({ localState: "changed local state" }) }.bind(this)}>
                        <span>Change <b>local</b> context</span>
                    </Button>
                </div>
            </Content>
        );
    }
}

RootComponent.contextType = FirstContext;
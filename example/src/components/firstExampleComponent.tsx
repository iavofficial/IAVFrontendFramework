import React, { Component } from "react";
import { FirstExampleContext } from "../contexts/FirstExampleContext";
import { Content } from "disa-framework/content";
import { Button } from "primereact/button";
import { WithTranslation, withTranslation } from "react-i18next";

interface State {
    localState: String,
    contentTabs: JSX.Element[]
}

class FirstExampleComponentUnprocessed extends Component<WithTranslation, State> {

    constructor(props: WithTranslation) {
        super(props);
        this.state = {
            localState: "default",
            contentTabs: [
                <div style={{ backgroundColor: "#5daedb", color: "white", padding: "4px", marginRight: "5px", display: "flex", alignItems: "center" }}>
                    <span>{this.props.t("Example_field_local", { count: 1 })}</span></div>,
                <div style={{ backgroundColor: "#5daedb", color: "white", padding: "4px", marginRight: "5px", display: "flex", alignItems: "center" }}>
                    <span>{this.props.t("Example_field_local", { count: 2 })}</span></div>,
            ]
        }
    }

    render() {
        return (
            <Content contentElements={[...this.context.contentTabs, ...this.state.contentTabs]}>
                <div>{this.props.t("Example_global_context")}: {this.context.exampleData}</div>
                <div>{this.props.t("Example_local_context")}: {this.state.localState}</div>
                <div style={{ margin: "20px 0px 20px 0px" }}>
                    <Button onClick={function (this: FirstExampleComponentUnprocessed) { this.context.updateExampleData(this.props.t("changed_with_local_element")) }.bind(this)}>
                        <span>{this.props.t("Change_global_context")}</span>
                    </Button>
                </div>
                <div>
                    <Button onClick={function (this: FirstExampleComponentUnprocessed) { this.setState({ localState: this.props.t("changed_local_state") }) }.bind(this)}>
                        <span>{this.props.t("Change_local_data")}</span>
                    </Button>
                </div>
            </Content>
        );
    }
}

FirstExampleComponentUnprocessed.contextType = FirstExampleContext;

export const FirstExampleComponent = withTranslation()(FirstExampleComponentUnprocessed);
import React, { Component } from "react";
import { SecondExampleContext } from "../contexts/SecondExampleContext";
import { Content } from "disa-framework/content";
import { WithTranslation, withTranslation } from "react-i18next";

class SecondExampleComponentUnprocessed extends Component<WithTranslation> {

    constructor(props: WithTranslation) {
        super(props);
    }

    render() {
        return (
            <Content contentElements={this.context.contentTabs}>
                <div>{this.props.t("Example_component")}</div>
            </Content>
        );
    }
}

SecondExampleComponentUnprocessed.contextType = SecondExampleContext;

export const SecondExampleComponent = withTranslation()(SecondExampleComponentUnprocessed);
import React, { Component } from "react";
import { Content } from "disa-framework/content";
import { SecondExampleContext } from "../contexts/SecondExampleContext";
import { WithTranslation, withTranslation } from "react-i18next";

class FourthExampleComponentUnprocessed extends Component<WithTranslation> {

    constructor(props: WithTranslation) {
        super(props);
    }

    render() {
        return (
            <Content contentElements={this.context.contentTabs}>
                <div>{this.props.t("component_deactivated")}</div>
            </Content>
        );
    }
}

FourthExampleComponentUnprocessed.contextType = SecondExampleContext;

export const FourthExampleComponent = withTranslation()(FourthExampleComponentUnprocessed);
import React, { Component } from "react";
import { Content } from "disa-framework/content";
import { SecondExampleContext } from "../contexts/SecondExampleContext";
import { AppliedTranslationProps, applyTranslation } from "disa-framework/applyTranslation";

class FourthExampleComponentUnprocessed extends Component<AppliedTranslationProps> {

    constructor(props: AppliedTranslationProps) {
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

export const FourthExampleComponent = applyTranslation(FourthExampleComponentUnprocessed);
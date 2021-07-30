import React, { Component } from "react";
import { SecondExampleContext } from "../contexts/SecondExampleContext";
import { Content } from "disa-framework/content";
import { AppliedTranslationProps, applyTranslation } from "disa-framework/applyTranslation";

class SecondExampleComponentUnprocessed extends Component<AppliedTranslationProps> {

    constructor(props: AppliedTranslationProps) {
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

export const SecondExampleComponent = applyTranslation(SecondExampleComponentUnprocessed);
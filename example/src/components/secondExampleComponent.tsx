import React, { Component } from "react";
import { SecondExampleContext } from "../contexts/SecondExampleContext";
import {Content, LayoutBehaviour} from "disa-framework/content";
import { applyTranslation, AppliedTranslationProps } from "disa-framework/translators";
import { DARK2 } from "../testConstants";

class SecondExampleComponentUnprocessed extends Component<AppliedTranslationProps> {

    constructor(props: AppliedTranslationProps) {
        super(props);
    }

    render() {
        return (
            <Content layoutBehaviour={LayoutBehaviour.FLEX} contentElements={this.context.contentTabs}>
                <div>{this.props.t("Example_component")}</div>
            </Content>
        );
    }
}

SecondExampleComponentUnprocessed.contextType = SecondExampleContext;

export const SecondExampleComponent = applyTranslation(SecondExampleComponentUnprocessed);
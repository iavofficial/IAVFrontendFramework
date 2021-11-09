import React from "react";
import { AppliedTranslationProps, applyTranslation } from "disa-framework/translators";

interface Props extends AppliedTranslationProps {
    keyOfText: string;
}

class ExampleInternationalizationClassComponentUnprocessed extends React.Component<Props> {

    constructor(props: Props) {
        super(props);
    }

    render() {
        return (
            <div style={{ width: "100%" }}>
                {this.props.t(this.props.keyOfText)}
            </div>
        );
    }
}

export const ExampleInternationalizationClassComponent = applyTranslation(ExampleInternationalizationClassComponentUnprocessed);
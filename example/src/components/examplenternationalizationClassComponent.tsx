import React from "react";
import { AppliedTranslationProps, applyTranslation } from "disa-framework/translators";

interface Props {
    keyOfText: string;
}

class ExampleInternationalizationClassComponentUnprocessed extends React.Component<Props & AppliedTranslationProps> {

    constructor(props: Props & AppliedTranslationProps) {
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

export const ExampleInternationalizationClassComponent = applyTranslation<Props>(ExampleInternationalizationClassComponentUnprocessed);
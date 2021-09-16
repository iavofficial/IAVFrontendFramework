import React, { Component } from "react";
import { AppliedTranslationProps, applyTranslation } from "disa-framework/translators";

export const SecondExampleContext = React.createContext({});

export class SecondExampleContextComponentUnprocessed extends Component<React.PropsWithChildren<AppliedTranslationProps>> {
    constructor(props: React.PropsWithChildren<AppliedTranslationProps>) {
        super(props);
        this.state = {
            exampleData: "default",
            contentTabs: [
                <div key="example_global3" style={{ backgroundColor: "#5daedb", color: "white", padding: "4px", marginRight: "5px", display: "flex", alignItems: "center" }}>
                    <span>{this.props.t("Another_global_element")}</span></div>,
            ]
        }
    }

    render() {
        return (
            <SecondExampleContext.Provider value={this.state}>
                {this.props.children}
            </SecondExampleContext.Provider>
        );
    }
}

export const SecondExampleContextComponent = applyTranslation(SecondExampleContextComponentUnprocessed);
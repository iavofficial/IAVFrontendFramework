import React, { Component, ReactElement } from "react";
import { Button } from "primereact/button";
import { AppliedTranslationProps, applyTranslation } from "disa-framework/applyTranslation";

interface State {
    exampleData: string,
    contentTabs: ReactElement[]
}

interface ContextType extends State {
    updateExampleData: (string: string) => void
}

export const FirstExampleContext = React.createContext<ContextType | undefined>(undefined);

class FirstExampleContextComponentUnprocessed extends Component<React.PropsWithChildren<AppliedTranslationProps>, State> {
    constructor(props: React.PropsWithChildren<AppliedTranslationProps>) {
        super(props);
        this.state = {
            exampleData: "default",
            contentTabs: [
                <Button style={{ width: "200px", height: "40px", margin: "5px", alignSelf: "center" }}
                    onClick={function (this: FirstExampleContextComponentUnprocessed) { this.updateExampleData(this.props.t("changed_with_global_button")) }.bind(this)}>
                    <span>{this.props.t("Change_global_context")}</span>
                </Button>,
                <div style={{
                    backgroundColor: "#5daedb", color: "white", marginRight: "5px", display: "flex", alignItems: "center",
                    justifyContent: "center", flexDirection: "column"
                }}>
                    <div>Elocity - E1 - B X 1234</div>
                    <div>ELOZZZE1ZLP002525</div>
                </div>
            ]
        }
    }

    updateExampleData = (string: string) => {
        this.setState({ ...this.state, exampleData: string });
    }

    render() {
        return (
            <FirstExampleContext.Provider value={{ ...this.state, updateExampleData: this.updateExampleData }}>
                {this.props.children}
            </FirstExampleContext.Provider>
        );
    }
}

export const FirstExampleContextComponent = applyTranslation(FirstExampleContextComponentUnprocessed);
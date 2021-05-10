import React, { Component } from "react";

export const SecondExampleContext = React.createContext({});

export class SecondContextComponent extends Component<React.PropsWithChildren<any>> {
    constructor(props: React.PropsWithChildren<any>) {
        super(props);
        this.state = {
            exampleData: "default",
            contentTabs: [
                <div style={{ backgroundColor: "#5daedb", color: "white", padding: "4px", marginRight: "5px", display: "flex", alignItems: "center" }}>
                    <span>Another <b>global</b> element</span></div>,
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
import React, { Component } from "react";

export const SecondContext = React.createContext({});

export class SecondContextClass extends Component<React.PropsWithChildren<any>> {
    constructor(props: React.PropsWithChildren<any>) {
        super(props);
        this.state = {
            test3: "default",
            contentTabs: [
                <div style={{ backgroundColor: "#5daedb", color: "white", padding: "4px", marginRight: "5px", display: "flex", alignItems: "center" }}>
                    <span>Another <b>global</b> element</span></div>,
            ]
        }
    }

    render() {
        return (
            <SecondContext.Provider value={this.state}>
                {this.props.children}
            </SecondContext.Provider>
        );
    }
}
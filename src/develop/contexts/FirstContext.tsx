import React, { Component } from "react";

export const FirstContext = React.createContext({});

export class FirstContextClass extends Component<React.PropsWithChildren<any>> {
    constructor(props: React.PropsWithChildren<any>) {
        super(props);
        this.state = {
            test1: "default",
            test2: "default",
            contentTabs: [
                <div style={{ backgroundColor: "grey", padding: "4px", marginRight: "10px" }}
                    onClick={function (this: FirstContextClass) { this.updateTest1("changed with tab") }.bind(this)}>Test field global state 1</div>,
                <div style={{ backgroundColor: "grey", padding: "4px", marginRight: "10px" }}>Test field global state 2</div>
            ]
        }
    }

    updateTest1 = (string: string) => {
        this.setState({ ...this.state, test1: string });
    }

    render() {
        return (
            <FirstContext.Provider value={{ ...this.state, updateTest1: this.updateTest1 }}>
                {this.props.children}
            </FirstContext.Provider>
        );
    }
}
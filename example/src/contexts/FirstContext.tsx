import React, { Component } from "react";
import { Button } from "primereact/button";

export const FirstContext = React.createContext({});

export class FirstContextClass extends Component<React.PropsWithChildren<any>> {
    constructor(props: React.PropsWithChildren<any>) {
        super(props);
        this.state = {
            test1: "default",
            test2: "default",
            contentTabs: [
                <Button style={{ width: "200px", height: "40px", margin: "5px", alignSelf: "center" }} onClick={function (this: FirstContextClass) { this.updateTest1("changed with global element") }.bind(this)}>
                    <span>Change <b>global</b> Context</span></Button>,
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
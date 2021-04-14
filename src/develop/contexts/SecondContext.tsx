import React, { Component } from "react";

export const SecondContext = React.createContext({});

class SecondContextClass extends Component {
    constructor(props: any) {
        super(props);
        this.state = {
            test3: "default",
            contentTabs: [
                <div style={{ backgroundColor: "grey", padding: "4px", marginRight: "10px" }}>Another element</div>
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

export default SecondContextClass;
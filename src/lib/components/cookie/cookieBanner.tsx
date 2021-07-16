import React, { Component } from "react";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";

import { RED, BLUE1, GRAY3 } from "../constants";
import { acceptedCookiesName } from "./cookieHandler";

interface State {
    visible: boolean;
}

export class CookieBanner extends Component<any, State> {
    constructor(props: any) {
        super(props);
        this.state = {
            visible: true,
        }
    }

    acceptCookies = () => {
        let exprireDate = new Date();
        exprireDate.setUTCFullYear(exprireDate.getUTCFullYear() + 1);
        document.cookie = acceptedCookiesName + "=true; expires=" + exprireDate.toUTCString();
        this.setState({ visible: false });
    }

    // Dialog has to have the onHide property. Otherwise the typescript compiler will throw an error.
    render() {
        return (
            <Dialog header="This website uses cookies." position={"bottom"} visible={this.state.visible} modal dismissableMask={false} closable={false} onHide={() => ""}
                footer={
                    <div style={{ display: "flex", justifyContent: "flex-end" }}>
                        <Button icon="pi pi-check" label="Allow cookies" onClick={this.acceptCookies} style={{ backgroundColor: BLUE1, border: "none" }} />
                    </div>
                }>
                <div style={{ display: "flex", alignItems: "center" }}>
                    <span className={"pi pi-info-circle"} style={{ marginRight: "10px", fontSize: "xx-large", color: "black" }} />
                    <span>This website needs you to allow cookies for proper functionality.</span>
                </div>
            </Dialog>
        );
    }
}
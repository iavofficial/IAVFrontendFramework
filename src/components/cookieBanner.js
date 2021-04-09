import React, { Component } from "react";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";

import { RED, BLUE1, GRAY3 } from "./constants";
import { acceptedCookiesName } from "./cookieHandler";

class CookieBanner extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: true,
            icon: "pi pi-info-circle",
            iconColor: "black",
            message: "This website needs you to allow cookies for proper functionality."
        }
        this.acceptCookies = this.acceptCookies.bind(this);
        this.rejectCookies = this.rejectCookies.bind(this);
    }

    acceptCookies() {
        let exprireDate = new Date();
        exprireDate.setUTCFullYear(exprireDate.getUTCFullYear() + 1);
        document.cookie = acceptedCookiesName + "=true; expires=" + exprireDate.toUTCString();
        this.setState({ visible: false });
    }

    rejectCookies() {
        this.setState({ visible: true, icon: "pi pi-times-circle", iconColor: RED, message: "You have to accept cookies. Otherwise you can't use this website." });
    }

    render() {
        return (
            <Dialog header="This website uses cookies." position={"bottom"} visible={this.state.visible} modal dismissableMask={false} closable={false}
                footer={
                    <div style={{ display: "flex", justifyContent: "flex-end" }}>
                        <Button icon="pi pi-times" className="p-button-secondary" label="Reject cookies" onClick={this.rejectCookies}
                            style={{ backgroundColor: GRAY3, border: "none" }} />
                        <Button icon="pi pi-check" label="Allow cookies" onClick={this.acceptCookies} style={{ backgroundColor: BLUE1, border: "none" }} />
                    </div>
                }>
                <div style={{ display: "flex", alignItems: "center" }}>
                    <span className={this.state.icon} style={{ marginRight: "10px", fontSize: "xx-large", color: this.state.iconColor }} />
                    <span>{this.state.message}</span>
                </div>
            </Dialog>
        );
    }
}

export default CookieBanner;
import React, { Component } from 'react';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';

import { DARK_RED } from './constants';

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
        this.setState({ visible: false });
    }

    rejectCookies() {
        this.setState({ visible: true, icon: "pi pi-times-circle", iconColor: DARK_RED, message: "You have to accept cookies. Otherwise you can't use this website." });
    }

    render() {
        return (
            <Dialog header="This website uses cookies." position={"bottom"} visible={this.state.visible} modal dismissableMask={false} closable={false}
                footer={
                    <div style={{ display: "flex", justifyContent: "flex-end" }}>
                        <Button icon="pi pi-times" className="p-button-secondary" label="Reject cookies" onClick={this.rejectCookies} />
                        <Button icon="pi pi-check" label="Allow cookies" onClick={this.acceptCookies} />
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
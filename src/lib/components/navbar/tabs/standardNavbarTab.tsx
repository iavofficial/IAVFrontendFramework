import React, { Component } from "react";
import Radium from "radium";
import { Link } from "react-router-dom";

import { BLUE1, GRAY2, DISATABHEIGHT } from "../../constants";
import { navbarTabProps } from "./navbarTab";

interface State {
    hovering: Boolean
}

class StandardNavbarTabUnprocessed extends Component<navbarTabProps, State> {

    constructor(props: navbarTabProps) {
        super(props);
        this.state = {
            hovering: false
        }
    }

    setHovering = (hovering: Boolean) => {
        this.setState({ hovering: hovering });
    }

    render() {
        let tabStyle = {
            height: DISATABHEIGHT,
            cursor: this.props.active || this.props.disabled ? "default" : "pointer",
            backgroundColor: this.props.active && !this.props.disabled ? BLUE1 : "white",
            color: this.props.active && !this.props.disabled ? "white" : "black",
            opacity: this.props.disabled ? 0.5 : 1,
            ":hover": {
                backgroundColor: this.props.disabled ? "white" : BLUE1
            }
        }
        const tab = (
            <div style={{ borderStyle: "solid", borderWidth: "0px 0px 1px 0px", borderColor: GRAY2 }}
                onMouseEnter={() => this.setHovering(true)} onMouseLeave={() => this.setHovering(false)}>
                <div className="p-d-flex p-align-center" style={tabStyle}>
                    <img src={(this.props.active || this.state.hovering) && !this.props.disabled ? this.props.selectedIcon.valueOf() : this.props.deselectedIcon.valueOf()}
                        style={{ marginLeft: "5%" }} alt="" />
                    <span style={{ fontWeight: "bold" }}>{this.props.name}</span>
                </div>
            </div>
        );
        return (
            this.props.disabled ? tab :
                <Link style={{ textDecoration: "none" }} to={this.props.to.valueOf()}>
                    {tab}
                </Link>
        );
    }
}

export const StandardNavbarTab = Radium(StandardNavbarTabUnprocessed);
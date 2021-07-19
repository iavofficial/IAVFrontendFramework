import React from "react";
import { Route } from "react-router";
import { TabAndContentWrapper } from "./tabAndContentWrapper";

export class View implements TabAndContentWrapper {
    constructor(private _navbarTab: React.ReactElement, private _component: React.ComponentType<any>) {
    }

    getRoutes = () => {
        return [
            <Route exact path={this._navbarTab.props.to.valueOf()} component={this._component} />
        ];
    }

    getNavbarComponent = () => {
        return this._navbarTab;
    }
}
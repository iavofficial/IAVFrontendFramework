import React from "react";
import { ReactElement } from "react";
import { RouteProps } from "react-router-dom";

import { View } from "./view";
import { TabGroup } from "../tabGroup";

export class Group {
    constructor(private _name: string, private _logo: string, private _views: View[]) {
    }

    getRoutes = () => {
        let routes: ReactElement<RouteProps>[] = [];
        this._views.forEach(view =>
            view.getRoutes().forEach(route => routes.push(route))
        );
        return routes;
    }

    getNavbarComponent = () => {
        return (
            <TabGroup name={this._name} logo={this._logo}>
                {this._views.map(view => view.getNavbarComponent())}
            </TabGroup>
        )
    }

    get name() {
        return this._name;
    }
}
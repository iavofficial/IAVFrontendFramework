import React from "react";
import { ReactElement } from "react";
import { RouteProps } from "react-router-dom";

import { View } from "./view";
import { TabGroup } from "../tabs/tabGroup";
import { TranslateFunctionType } from "../../../contexts/language";
import { generateHashForValues } from "../../../services/hash";

export class Group {
    constructor(private _name: string | ((t: TranslateFunctionType) => string), private _logo: string, private _views: View[]) {
    }

    // Generate unique key based on the keys of the views.
    getKey = () => {
        return generateHashForValues(this._views.map(view => view.getKey()));
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
            <TabGroup key={this.getKey()} name={this._name} logo={this._logo}>
                {this._views.map(view => view.getNavbarComponent())}
            </TabGroup>
        );
    }

    get name() {
        return this._name;
    }
}
import React from "react";
import { ReactElement } from "react";
import { RouteProps } from "react-router-dom";

import { View } from "./view";
import { TabGroup } from "../tabGroup";

export class Group {
    constructor(private _views: View[]) {
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
            <TabGroup>
                {this._views.map(view => view.getNavbarComponent())}
            </TabGroup>
        )
    }
}
import React, { ReactElement } from "react";
import { RouteProps } from "react-router-dom";

export interface TabAndContentWrapper {
    getRoutes(): ReactElement<RouteProps>[]
    getNavbarComponent(): ReactElement
}
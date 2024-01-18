import React from "react";
import { Route } from "react-router";
import { generateHash } from "../../../utils/hash";
import { groupableNavbarTabProps, navbarTabProps } from "../tabs/navbarTab";
import { TabAndContentWrapper } from "./tabAndContentWrapper";

export class BasicContentWrapper implements TabAndContentWrapper {
  constructor(
    protected _navbarTab: React.ReactElement<
      navbarTabProps | groupableNavbarTabProps
    >,
    protected _component: React.ComponentType<any>
  ) {}

  // Generate unique key based on the view's url.
  getKey = () => {
    return generateHash(this._navbarTab.props.to);
  };

  getRoutes = () => {
    return [
      <Route
        key={this.getKey()}
        path={this._navbarTab.props.to.valueOf()}
        element={<this._component />}
      />,
    ];
  };

  getChildrenWrapper = () => {
    let emptyArray: TabAndContentWrapper[] = [];
    return emptyArray;
  };

  getNavbarComponent = (navbarCollapsed: boolean) => {
    return React.cloneElement(this._navbarTab, {
      key: this.getKey(),
      navbarCollapsed: navbarCollapsed,
    });
  };
}

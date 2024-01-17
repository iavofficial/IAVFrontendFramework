import React, { ReactElement } from "react";
import { RouteProps } from "react-router-dom";
import { TabGroup } from "../tabs/tabGroup/tabGroup";
import { generateHashForValues } from "../../../utils/hash";
import { TabAndContentWrapper } from "./tabAndContentWrapper";
import { TranslateFunctionType } from "../../../types/translationFunction";

export class Group implements TabAndContentWrapper {
  constructor(
    private _name: string | ((t: TranslateFunctionType) => string),
    private _logo: ReactElement,
    private _collapsible: boolean,
    private _contentWrappers: TabAndContentWrapper[]
  ) {}

  // Generate unique key based on the keys of the views.
  getKey = () => {
    return generateHashForValues(
      this._contentWrappers.map((view) => view.getKey())
    );
  };

  getRoutes = () => {
    let routes: ReactElement<RouteProps>[] = [];
    this._contentWrappers.forEach((view) => {
      view.getRoutes().forEach((route) => {
        routes.push(route);
      });
    });
    return routes;
  };

  getChildrenWrapper = () => {
    return this._contentWrappers;
  };

  getNavbarComponent = (navbarCollapsed: boolean) => {
    return (
      <TabGroup
        navbarCollapsed={navbarCollapsed}
        key={this.getKey()}
        name={this._name}
        logo={this._logo ? this._logo : undefined}
        collapsible={this._collapsible}
      >
        {this._contentWrappers.map((view) =>
          view.getNavbarComponent(navbarCollapsed)
        )}
      </TabGroup>
    );
  };

  get name() {
    return this._name;
  }
}

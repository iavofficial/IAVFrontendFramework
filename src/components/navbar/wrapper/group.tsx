import React, { ReactElement } from "react";
import { RouteProps } from "react-router-dom";
import { TabGroup } from "../tabs/tabGroup/tabGroup";
import { generateHashForValues } from "../../../utils/hash";
import { TranslateFunctionType } from "../../../types/translationFunction";
import { groupableNavbarTabPropsFrameworkInjectedOptions } from "../tabs/typesNavbarTab";
import { GroupableTabAndContentWrapper } from "./typesTabAndContentWrapper";
import { navbarInjectedOptions } from "../typesNavbar";

export class Group implements GroupableTabAndContentWrapper {
  private _insideGroup = false;

  constructor(
    private _name: string | ((t: TranslateFunctionType) => string),
    private _logo: ReactElement,
    private _collapsible: boolean,
    private _contentWrappers: GroupableTabAndContentWrapper[]
  ) {
    _contentWrappers.forEach((contentWrapper) => {
      contentWrapper.setInsideGroup(true);
    });
  }

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

  getNavbarComponent = (
    frameworkInjectedOptions:
      | navbarInjectedOptions
      | groupableNavbarTabPropsFrameworkInjectedOptions
  ) => {
    const injectedProperties = {
      navbarCollapsed: frameworkInjectedOptions.navbarCollapsed,
      insideGroup: this.getInsideGroup(),
      groupActive:
        "groupActive" in frameworkInjectedOptions
          ? frameworkInjectedOptions.groupActive
          : false,
    };

    return (
      <TabGroup
        navbarCollapsed={frameworkInjectedOptions.navbarCollapsed}
        key={this.getKey()}
        name={this._name}
        logo={this._logo ? this._logo : undefined}
        collapsible={this._collapsible}
        frameworkInjectedOptions={injectedProperties}
        wrappers={this._contentWrappers}
      />
    );
  };

  get name() {
    return this._name;
  }

  getInsideGroup() {
    return this._insideGroup;
  }

  setInsideGroup(insideGroup: boolean) {
    this._insideGroup = insideGroup;
  }
}

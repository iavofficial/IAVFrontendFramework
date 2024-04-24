import React, { ReactElement } from "react";
import { RouteProps } from "react-router-dom";
import { TabGroup } from "../tabs/tabGroup/tabGroup";
import { generateHashForValues } from "../../../utils/hash";
import { TranslateFunctionType } from "../../../types/translationFunction";
import { GroupableTabAndContentWrapper } from "./typesWrappers";
import {
  InjectedOptionsByGroupToWrapper,
  InjectedOptionsByNavbarToWrapper,
} from "../types/typesInjectedOptions";

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

  // If this wrapper is located at the top of a group hierarchie (meaning without a parent group)
  // the options will be injected directly by the navbar component. Because of this frameworkInjectedOptions
  // can be of type InjectedOptionsByNavbarToWrapper.
  getNavbarComponent = (
    frameworkInjectedOptions:
      | InjectedOptionsByNavbarToWrapper
      | InjectedOptionsByGroupToWrapper
  ) => {
    const injectedProperties = {
      navbarCollapsed: frameworkInjectedOptions.navbarCollapsed,
      insideGroup: this.getInsideGroup(),
      // As the options origin can be the navbar component itself it has to be checked whether this
      // wrapper is located inside a group.
      groupActive: this.getInsideGroup()
        ? // @ts-ignore If insideGroup is true groupActive will be contained.
          frameworkInjectedOptions.groupActive
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

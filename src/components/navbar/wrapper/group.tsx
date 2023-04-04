import React, { ReactElement } from 'react';
import { RouteProps } from 'react-router-dom';
import { TabGroup } from '../tabs/tabGroup';
import { TranslateFunctionType } from '../../../contexts/language';
import { generateHashForValues } from '../../../services/hash';
import { TabAndContentWrapper } from './tabAndContentWrapper';

export class Group implements TabAndContentWrapper {
  constructor(
    private _name: string | ((t: TranslateFunctionType) => string),
    private _logo: string | undefined,
    private _accordionHeaderTextColor: string | undefined,
    private _fontWeightBold: boolean,
    private _collapsible: boolean,
    private _collapsed: boolean,
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

  getNavbarComponent = (navbarCollapsed: boolean) => {
    return (
      <TabGroup
        navbarCollapsed={navbarCollapsed}
        key={this.getKey()}
        name={this._name}
        logo={this._logo ? this._logo : undefined}
        collapsible={this._collapsible}
        collapsed={this._collapsed}
        accordionHeaderTextColor={
          this._accordionHeaderTextColor
            ? this._accordionHeaderTextColor
            : undefined
        }
        fontWeightBold={this._fontWeightBold}
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

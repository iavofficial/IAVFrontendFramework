import React, { ReactElement } from 'react';
import { RouteProps } from 'react-router-dom';
import { TabGroup } from '../tabs/tabGroup';
import { TranslateFunctionType } from '../../../contexts/language';
import { generateHashForValues } from '../../../services/hash';
import { TabAndContentWrapper } from './tabAndContentWrapper';
import { LAYER } from '../tabs/tabLayer';

export class Group implements TabAndContentWrapper {
  private layer: number | undefined;
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

  setLayer = (layer: LAYER) => {
    this.layer = layer;
  };

  getChildrenWrapper = () => {
    return this._contentWrappers;
  };

  setCollapsed = (collapsed: boolean) => {
    this._collapsed = collapsed;
    this.getNavbarComponent(true);
  };

  // setNavbarCollapsed = (navbarCollapsed: boolean) => {
  //   this.navbarCollapsed = navbarCollapsed;
  // }

  // getNavbarCollapsed =()=>{
  //   return this.navbarCollapsed;
  // }

  getNavbarComponent = (navbarCollapsed: boolean) => {
    return (
      <TabGroup
        navbarCollapsed={navbarCollapsed}
        key={this.getKey()}
        name={this._name}
        logo={this._logo ? this._logo : undefined}
        collapsible={this._collapsible}
        collapsed={this._collapsed}
        layer={this.layer}
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

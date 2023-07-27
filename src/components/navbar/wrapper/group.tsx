import React, { ReactElement } from 'react';
import { RouteProps } from 'react-router-dom';
import { TabGroup } from '../tabs/tabGroup';
import { generateHashForValues } from '../../../utils/hash';
import { TabAndContentWrapper } from './tabAndContentWrapper';
import { LAYER } from '../tabs/tabLayer';
import { TranslateFunctionType } from '../../../types/translationFunction';

export class Group implements TabAndContentWrapper {
  private layer: number | undefined;
  private isLastElementOfLayer: boolean | undefined;

  constructor(
    private _name: string | ((t: TranslateFunctionType) => string),
    private _logo: ReactElement,
    private _collapsible: boolean,
    private _contentWrappers: TabAndContentWrapper[]
  ) {}

  setIsLastElementOfLayer(isLastElementOfLayer: boolean): void {
    this.isLastElementOfLayer = isLastElementOfLayer;
  }

  // Generate unique key based on the keys of the views.
  getKey = () => {
    return generateHashForValues(
      this._contentWrappers.map((view) => view.getKey())
    );
  };

  getRoutes = () => {
    let routes: ReactElement<RouteProps>[] = [];
    if (this.layer === LAYER.ONE || this.layer === LAYER.TWO) {
      this._contentWrappers.forEach((view) => {
        view.getRoutes().forEach((route) => {
          routes.push(route);
        });
      });
    }
    return routes;
  };

  setLayer = (layer: LAYER) => {
    this.layer = layer;
  };

  getChildrenWrapper = () => {
    return this._contentWrappers;
  };

  getNavbarComponent = (navbarCollapsed: boolean) => {
    if (this.layer === LAYER.ONE || this.layer === LAYER.TWO) {
      return (
        <TabGroup
          navbarCollapsed={navbarCollapsed}
          key={this.getKey()}
          name={this._name}
          logo={this._logo ? this._logo : undefined}
          collapsible={this._collapsible}
          layer={this.layer}
          isLastElementOfLayer={this.isLastElementOfLayer}
        >
          {this._contentWrappers.map((view) =>
            view.getNavbarComponent(navbarCollapsed)
          )}
        </TabGroup>
      );
    } else {
      return <></>;
    }
  };

  get name() {
    return this._name;
  }
}

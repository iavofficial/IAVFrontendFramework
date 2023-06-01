import React from 'react';
import { Route } from 'react-router';
import { generateHash } from '../../../services/hash';
import { navbarTabProps } from '../tabs/navbarTab';
import { LAYER } from '../tabs/tabLayer';
import { TabAndContentWrapper } from './tabAndContentWrapper';

export class BasicContentWrapper implements TabAndContentWrapper {
  private layer: LAYER | undefined = undefined;
  private isLastElementOfLayer: boolean | undefined;
  constructor(
    private _navbarTab: React.ReactElement<navbarTabProps>,
    private _component: React.ComponentType<any>
  ) {}

  setIsLastElementOfLayer(isLastElementOfLayer: boolean): void {
    this.isLastElementOfLayer = isLastElementOfLayer;
  }

  // Generate unique key based on the view's url.
  getKey = () => {
    return generateHash(this._navbarTab.props.to);
  };

  setLayer = (layer: LAYER) => {
    this.layer = layer;
  };

  getRoutes = () => {
    if (
      this.layer === LAYER.ONE ||
      this.layer === LAYER.TWO ||
      this.layer === LAYER.THREE
    ) {
      return [
        <Route
          key={this.getKey()}
          path={this._navbarTab.props.to.valueOf()}
          element={<this._component />}
        />,
      ];
    } else {
      return [<></>];
    }
  };

  getChildrenWrapper = () => {
    let emptyArray: TabAndContentWrapper[] = [];
    return emptyArray;
  };

  getNavbarComponent = (navbarCollapsed: boolean) => {
    if (
      this.layer === LAYER.ONE ||
      this.layer === LAYER.TWO ||
      this.layer === LAYER.THREE
    ) {
      return React.cloneElement(this._navbarTab, {
        key: this.getKey(),
        navbarCollapsed: navbarCollapsed,
        layer: this.layer,
        isLastElementOfLayer: this.isLastElementOfLayer,
      });
    } else {
      return <></>;
    }
  };
}

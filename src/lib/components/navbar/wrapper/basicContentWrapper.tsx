import React from 'react';
import { Route } from 'react-router';
import { generateHash } from '../../../services/hash';
import { navbarTabProps } from '../tabs/navbarTab';
import { TabAndContentWrapper } from './tabAndContentWrapper';

export class BasicContentWrapper implements TabAndContentWrapper {
  constructor(
    private _navbarTab: React.ReactElement<navbarTabProps>,
    private _component: React.ComponentType<any>,
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

  getNavbarComponent = () => {
    return React.cloneElement(this._navbarTab, { key: this.getKey() });
  };
}

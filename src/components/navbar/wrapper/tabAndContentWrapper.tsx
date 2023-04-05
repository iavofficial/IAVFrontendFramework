import React, { ReactElement } from 'react';
import { RouteProps } from 'react-router-dom';
import { LAYER } from '../tabs/tabLayer';

export interface TabAndContentWrapper {
  getRoutes(): ReactElement<RouteProps>[];
  getNavbarComponent(value: boolean): ReactElement;
  getKey(): string;
  setLayer(layer: LAYER): void;
  getChildrenWrapper(): TabAndContentWrapper[];
}

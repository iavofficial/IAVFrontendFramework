import { WHITE, BLUE0 } from './../constants';
import {
  LAYER,
  COLLAPSEDLAYERMARKER,
} from './../components/navbar/tabs/tabLayer';

export const calculateSecondLineColorGroupTop = (
  layer: LAYER,
  collapsed: boolean,
  parentCollapsed?: boolean
) => {
  if (layer === LAYER.TWO && collapsed) {
    return BLUE0;
  } else {
    return WHITE;
  }
};

export const calculateFirstLineColorGroupBottom = (
  collapsed: boolean,
  parentCollapsed: boolean,
  isLastElementOfLayer: boolean
) => {
  if (collapsed) {
    return BLUE0;
  } else if (parentCollapsed && !isLastElementOfLayer) {
    return BLUE0;
  } else {
    return WHITE;
  }
};

export const calculateFirstLineColorGroupTop = (
  layer: LAYER,
  collapsed: boolean,
  parentCollapsed?: boolean
) => {
  if (collapsed) {
    return BLUE0;
  } else if (layer === LAYER.TWO && parentCollapsed) {
    return BLUE0;
  } else {
    return WHITE;
  }
};

export const revertColor = (
  actualColor: string,
  color1: string,
  color2: string
) => {
  if (actualColor === color1) {
    return color2;
  } else {
    return color1;
  }
};

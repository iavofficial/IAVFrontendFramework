import { WHITE, BLUE0 } from '../constants';
import {
  LAYER,
  COLLAPSEDLAYERMARKER,
} from '../components/navbar/tabs/tabLayer';

export const calculateSecondLineColorGroupTop = (
  highlightColor: string,
  mainColor: string,
  layer: LAYER,
  collapsed: boolean,
  parentCollapsed?: boolean
) => {
  if (layer === LAYER.TWO && collapsed) {
    return highlightColor;
  } else {
    return mainColor;
  }
};

export const calculateFirstLineColorGroupBottom = (
  highlightColor: string,
  mainColor: string,
  collapsed: boolean,
  parentCollapsed: boolean,
  isLastElementOfLayer: boolean
) => {
  if (collapsed) {
    return highlightColor;
  } else if (parentCollapsed && !isLastElementOfLayer) {
    return highlightColor;
  } else {
    return mainColor;
  }
};

export const calculateFirstLineColorGroupTop = (
  highlightColor: string,
  mainColor: string,
  layer: LAYER,
  collapsed: boolean,
  parentCollapsed?: boolean
) => {
  if (collapsed) {
    return highlightColor;
  } else if (layer === LAYER.TWO && parentCollapsed) {
    return highlightColor;
  } else {
    return mainColor;
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

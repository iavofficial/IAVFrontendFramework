import { LAYER } from '../components/navbar/tabs/tabLayer';
import { BLUE0, WHITE } from '../constants';

export const calculateFirstLineTabLayer = (
  highlightColor: string,
  mainColor: string,
  layer: LAYER,
  parentCollapsed?: boolean
): string => {
  if (layer === LAYER.TWO && parentCollapsed) {
    return highlightColor;
  } else if (layer === LAYER.THREE && parentCollapsed) {
    return highlightColor;
  } else {
    return mainColor;
  }
};

export const calculateSecondLineTabLayer = (
  highlightColor: string,
  mainColor: string,
  layer: LAYER,
  parentCollapsed?: boolean
) => {
  if (layer === LAYER.THREE && parentCollapsed) {
    return highlightColor;
  } else {
    return mainColor;
  }
};

export const calculateFirstLineTabLayerBottom = (
  highlightColor: string,
  mainColor: string,
  parentCollapsed: boolean,
  isLastChildOfLayer: boolean,
  layer: LAYER
) => {
  if (parentCollapsed && !isLastChildOfLayer) {
    return highlightColor;
  } else if (layer === LAYER.THREE && isLastChildOfLayer) {
    return highlightColor;
  } else {
    return mainColor;
  }
};

export const calculateSecondLineTabLayerBottom = (
  highlightColor: string,
  mainColor: string,
  parentCollapsed: boolean,
  isLastChildOfLayer: boolean,
  layer: LAYER
) => {
  if (LAYER.THREE === layer && parentCollapsed && !isLastChildOfLayer) {
    return highlightColor;
  } else {
    return mainColor;
  }
};

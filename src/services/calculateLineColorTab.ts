import { LAYER } from '../components/navbar/tabs/tabLayer';
import { BLUE0, WHITE } from '../constants';

export const calculateFirstLineTabLayer = (
  layer: LAYER,
  parentCollapsed?: boolean
): string => {
  if (layer === LAYER.TWO && parentCollapsed) {
    return BLUE0;
  } else if (layer === LAYER.THREE && parentCollapsed) {
    return BLUE0;
  } else {
    return WHITE;
  }
};

export const calculateSecondLineTabLayer = (
  layer: LAYER,
  parentCollapsed?: boolean
) => {
  if (layer === LAYER.THREE && parentCollapsed) {
    return BLUE0;
  } else {
    return WHITE;
  }
};

export const calculateFirstLineTabLayerBottom = (
  parentCollapsed: boolean,
  isLastChildOfLayer: boolean,
  layer: LAYER
) => {
  console.log('hier dein lastelement: ', isLastChildOfLayer);
  console.log('layer: ', layer);

  if (parentCollapsed && !isLastChildOfLayer) {
    return BLUE0;
  } else if (layer === LAYER.THREE && isLastChildOfLayer) {
    return BLUE0;
  } else {
    return WHITE;
  }
};

export const calculateSecondLineTabLayerBottom = (
  parentCollapsed: boolean,
  isLastChildOfLayer: boolean,
  layer: LAYER
) => {
  if (LAYER.THREE === layer && parentCollapsed && !isLastChildOfLayer) {
    return BLUE0;
  } else {
    return WHITE;
  }
};

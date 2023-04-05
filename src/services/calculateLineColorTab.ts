import { LAYER } from '../components/navbar/tabs/tabLayer';
import { BLUE0, WHITE } from '../constants';
export const calculateLineColor = (hovering: boolean, collabsed: boolean) => {
  if (!hovering && collabsed) {
    return BLUE0;
  } else if (hovering && collabsed) {
    return WHITE;
  } else if (hovering && !collabsed) {
    return BLUE0;
  } else {
    return WHITE;
  }
};

export const calculateLineColorForTabs = (
  hovering: boolean,
  active: boolean,
  collabsed: boolean,
  layer: LAYER
) => {
  if (!hovering && !active && collabsed) {
    return BLUE0;
  } else if (hovering && !active && !collabsed) {
    return BLUE0;
  } else if (!hovering && active && !collabsed) {
    return BLUE0;
  } else if (hovering && active && !collabsed) {
    return BLUE0;
  } else {
    return WHITE;
  }
};

export const calculateLineForFirstTabLayer = (
  hovering: boolean,
  active: boolean
) => {
  if (hovering || active) {
    return BLUE0;
  } else {
    return WHITE;
  }
};

export const calculateLineForTabBottom = (layer: LAYER) => {
  if (layer === 1) {
    return WHITE;
  } else {
    return BLUE0;
  }
};

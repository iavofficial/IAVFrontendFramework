import { BLUE0, WHITE } from './../constants';
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
  collabsed: boolean
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

import { WHITE, BLUE0 } from './../constants';
import {
  LAYER,
  COLLAPSEDLAYERMARKER,
} from './../components/navbar/tabs/tabLayer';
export const calculateLineColorGroupBottom = (layer: LAYER) => {
  if (LAYER.ONE === 1) {
    return WHITE;
  }
};

// export const calculateFirstLineColorGroupTop = (layer: LAYER, hovering: boolean)=>{
//   if(layer === LAYER.ONE && !hovering){
//     return
//   }
// }

export const calculateSecondLineColorGroupTop = (
  layer: LAYER,
  hovering: boolean
) => {
  if (layer === LAYER.ONE && hovering) {
    return BLUE0;
  } else if (layer === LAYER.TWO) {
    return BLUE0;
  } else {
    return WHITE;
  }
};

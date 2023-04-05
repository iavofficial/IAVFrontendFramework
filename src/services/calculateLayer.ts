import { LAYER } from '../components/navbar/tabs/tabLayer';
import { TabAndContentWrapper } from './../components/navbar/wrapper/tabAndContentWrapper';
export const calculateLayer = (
  tabAndContentWrapper: TabAndContentWrapper[]
) => {
  tabAndContentWrapper.forEach(
    (wrapperElementFirstLayer: TabAndContentWrapper) => {
      wrapperElementFirstLayer.setLayer(LAYER.ONE);
      wrapperElementFirstLayer
        .getChildrenWrapper()
        .forEach((wrapperElementSecondLayer: TabAndContentWrapper) => {
          wrapperElementSecondLayer.setLayer(LAYER.TWO);
          wrapperElementSecondLayer
            .getChildrenWrapper()
            .forEach((wrapperElementThirdLayer: TabAndContentWrapper) => {
              wrapperElementThirdLayer.setLayer(LAYER.THREE);
            });
        });
    }
  );

  return tabAndContentWrapper;
};

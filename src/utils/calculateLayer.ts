import { LAYER } from '../components/navbar/tabs/tabLayer';
import { TabAndContentWrapper } from '../components/navbar/wrapper/tabAndContentWrapper';
export const calculateLayer = (
  tabAndContentWrapper: TabAndContentWrapper[]
) => {
  tabAndContentWrapper.forEach(
    (
      wrapperElementFirstLayer: TabAndContentWrapper,
      indexFirstLayer: number
    ) => {
      wrapperElementFirstLayer.setLayer(LAYER.ONE);
      wrapperElementFirstLayer.setIsLastElementOfLayer(
        tabAndContentWrapper.length - 1 === indexFirstLayer
      );
      wrapperElementFirstLayer
        .getChildrenWrapper()
        .forEach(
          (
            wrapperElementSecondLayer: TabAndContentWrapper,
            indexSecondLayer: number
          ) => {
            wrapperElementSecondLayer.setLayer(LAYER.TWO);
            wrapperElementSecondLayer.setIsLastElementOfLayer(
              wrapperElementFirstLayer.getChildrenWrapper().length - 1 ===
                indexSecondLayer
            );
            wrapperElementSecondLayer
              .getChildrenWrapper()
              .forEach(
                (
                  wrapperElementThirdLayer: TabAndContentWrapper,
                  indexThirdLayer: number
                ) => {
                  wrapperElementThirdLayer.setLayer(LAYER.THREE);
                  wrapperElementThirdLayer.setIsLastElementOfLayer(
                    wrapperElementSecondLayer.getChildrenWrapper().length -
                      1 ===
                      indexThirdLayer
                  );
                }
              );
          }
        );
    }
  );

  return tabAndContentWrapper;
};

import { ContentAreaColorOptions } from "../colorOptionTypes";
import {
  DARK_CONTENT_AREA_BACKGROUND_COLOR,
  LIGHT_CONTENT_AREA_BACKGROUND_COLOR,
} from "../defaultColors";
import { determineSelectedColorHof } from "./determineSelectedColor";

export const getCurrentColorsContentArea = (
  darkmodeIsEnabled: boolean,
  customColorsDisabledInCurrentMode: boolean,
  contentAreaColorOptions: ContentAreaColorOptions
) => {
  const determineColor = determineSelectedColorHof(
    darkmodeIsEnabled,
    customColorsDisabledInCurrentMode
  );

  return {
    backgroundColor: determineColor(
      LIGHT_CONTENT_AREA_BACKGROUND_COLOR,
      DARK_CONTENT_AREA_BACKGROUND_COLOR,
      contentAreaColorOptions.backgroundColor
    ),
  };
};

import { ContentAreaColorOptions } from "../colorOptionTypes";
import {
  DARK_CONTENT_AREA_BACKGROUND_COLOR,
  LIGHT_CONTENT_AREA_BACKGROUND_COLOR,
} from "../defaultColors";
import { determineSelectedColorHOF } from "./determineSelectedColor";

export const getCurrentColorsContentArea = (
  darkmodeIsEnabled: boolean,
  customColorsDisabledInCurrentMode: boolean,
  contentAreaColorOptions: ContentAreaColorOptions
) => {
  const determineColor = determineSelectedColorHOF(
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

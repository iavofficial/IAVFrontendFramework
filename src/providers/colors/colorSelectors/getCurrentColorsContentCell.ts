import { ContentCellColorOptions } from "../colorOptionTypes";
import {
  DARK_CONTENT_CELL_BACKGROUND_COLOR,
  LIGHT_CONTENT_CELL_BACKGROUND_COLOR,
} from "../defaultColors";
import { determineSelectedColorHOF } from "./determineSelectedColor";

export const getCurrentColorsContentCell = (
  darkmodeIsEnabled: boolean,
  customColorsDisabledInCurrentMode: boolean,
  contentCellColorOptions: ContentCellColorOptions
) => {
  const determineColor = determineSelectedColorHOF(
    darkmodeIsEnabled,
    customColorsDisabledInCurrentMode
  );

  return {
    backgroundColor: determineColor(
      LIGHT_CONTENT_CELL_BACKGROUND_COLOR,
      DARK_CONTENT_CELL_BACKGROUND_COLOR,
      contentCellColorOptions.backgroundColor
    ),
  };
};

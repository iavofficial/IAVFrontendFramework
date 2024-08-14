import { ContentCellColorOptions } from "../colorOptionTypes";
import {
  DARK_CONTENT_CELL_BACKGROUND_COLOR,
  LIGHT_CONTENT_CELL_BACKGROUND_COLOR,
} from "../defaultColors";
import { determineSelectedColorHof } from "./determineSelectedColor";

export const getCurrentColorsContentCell = (
  darkmodeIsEnabled: boolean,
  customColorsDisabledInCurrentMode: boolean,
  contentCellColorOptions: ContentCellColorOptions
) => {
  const determineColor = determineSelectedColorHof(
    darkmodeIsEnabled,
    customColorsDisabledInCurrentMode
  );

  return {
    backgroundColor: determineColor(
      LIGHT_CONTENT_CELL_BACKGROUND_COLOR,
      DARK_CONTENT_CELL_BACKGROUND_COLOR,
      contentCellColorOptions.backgroundColor
    )
  };
};

import { HeaderColorOptions } from "../colorOptionTypes";
import {
  DARK_HEADER_BACKGROUND_COLOR,
  DARK_HEADER_SETTINGS_ICON_COLOR,
  DARK_HEADER_USER_ICON_COLOR,
  LIGHT_HEADER_BACKGROUND_COLOR,
  LIGHT_HEADER_SETTINGS_ICON_COLOR,
  LIGHT_HEADER_USER_ICON_COLOR,
} from "../defaultColors";
import { determineSelectedColorHOF } from "./determineSelectedColor";

export const getCurrentColorsHeader = (
  darkmodeIsEnabled: boolean,
  customColorsDisabledInCurrentMode: boolean,
  headerColorOptions: HeaderColorOptions
) => {
  const determineColor = determineSelectedColorHOF(
    darkmodeIsEnabled,
    customColorsDisabledInCurrentMode
  );

  return {
    backgroundColor: determineColor(
      LIGHT_HEADER_BACKGROUND_COLOR,
      DARK_HEADER_BACKGROUND_COLOR,
      headerColorOptions.backgroundColor
    ),
    settingsIconColor: determineColor(
      LIGHT_HEADER_SETTINGS_ICON_COLOR,
      DARK_HEADER_SETTINGS_ICON_COLOR,
      headerColorOptions.settingsIconColor
    ),
    userIconColor: determineColor(
      LIGHT_HEADER_USER_ICON_COLOR,
      DARK_HEADER_USER_ICON_COLOR,
      headerColorOptions.userIconColor
    ),
  };
};

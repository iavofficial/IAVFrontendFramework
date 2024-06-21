// This function returns the color to be used.
export const determineSelectedColorHOF = (
  darkmodeIsEnabled: boolean,
  customColorsDisabledInCurrentMode: boolean
) => {
  return (lightDef: string, darkDef: string, custom?: string) => {
    if (custom && !customColorsDisabledInCurrentMode) {
      return custom;
    }
    if (darkmodeIsEnabled) {
      return darkDef;
    }
    return lightDef;
  };
};

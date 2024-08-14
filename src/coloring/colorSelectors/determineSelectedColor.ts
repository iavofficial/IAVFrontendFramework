export const determineSelectedColorHof = (
  darkmodeIsEnabled: boolean,
  customColorsDisabledInCurrentMode: boolean
) => {
  // The returned function returns the color to be used.
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

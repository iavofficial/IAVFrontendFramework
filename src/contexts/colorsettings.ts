import React from "react";
import {
  ColorOptions,
  SelectedColors,
} from "../providers/colors/colorOptionTypes";

export interface ColorsettingsType {
  darkmode: boolean;
  setDarkmode: (darkmode: boolean) => void;
  colorOptions: ColorOptions;
  currentColors: SelectedColors;
}

export const ColorSettingsContext = React.createContext<ColorsettingsType>(
  {} as ColorsettingsType
);

import React from 'react';
import { ColorObject } from '../types/colorObjectType';
import { CurrentColorsType } from '../providers/colors/colorProvider';

export interface ColorsettingsType {
  darkmode: boolean;
  setDarkmode: (darkmode: boolean) => void;
  colorOptions: ColorObject;
  currentColors: CurrentColorsType
}

export const ColorSettingsContext = React.createContext<ColorsettingsType>({} as ColorsettingsType);
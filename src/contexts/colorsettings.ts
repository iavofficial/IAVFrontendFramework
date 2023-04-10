import React from 'react';
export interface ColorsettingsType {
  darkmode: boolean;
  setDarkmode: (darkmode: boolean) => void;
}

export const ColorSettingsContext = React.createContext<
  ColorsettingsType | undefined
>(undefined);

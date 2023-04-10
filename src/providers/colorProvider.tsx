import React, { useState } from 'react';
import { ColorSettingsContext } from '../contexts/colorsettings';

export const ColorProvider = (props: React.PropsWithChildren<{}>) => {
  const [darkmode, setDarkmode] = useState(() =>
    localStorage.getItem('darkmode')
      ? Boolean(JSON.parse(localStorage.getItem('darkmode') as string))
      : false
  );

  const setDarkmodeToLocalStorage = (darkmode: boolean) => {
    localStorage.setItem('darkmode', JSON.stringify(darkmode));
    setDarkmode(darkmode);
  };

  let returnObject = {
    darkmode: darkmode,
    setDarkmode: setDarkmodeToLocalStorage,
  };
  return (
    <ColorSettingsContext.Provider value={returnObject}>
      {props.children}
    </ColorSettingsContext.Provider>
  );
};

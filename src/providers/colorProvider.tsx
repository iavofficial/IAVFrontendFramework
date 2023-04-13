import React, { useState } from 'react';
import { ColorObject } from '../components/colorObjectType';
import { ColorSettingsContext } from '../contexts/colorsettings';

export interface Props {
  colorOptions?: ColorObject;
}

export const ColorProvider = (props: React.PropsWithChildren<Props>) => {
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
    headerColorOptions: props.colorOptions?.headerColorOptions,
    navbarColorOptions: props.colorOptions?.navbarColorOptions,
    contentColorOptions: props.colorOptions?.contentColorOptions,
    contentbarColorOptions: props.colorOptions?.contentbarColorOptions,
    contentbarTabColorOptions: props.colorOptions?.contentbarTabColorOptions,
    authenticationColorOptions: props.colorOptions?.authenticationColorOptions,
  };
  return (
    <ColorSettingsContext.Provider value={returnObject}>
      {props.children}
    </ColorSettingsContext.Provider>
  );
};

import React, { useEffect, useState } from 'react';
import { ColorObject } from '../types/colorObjectType';
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

  useEffect(() => {
    if (darkmode) {
      // TODO: Remove line for data-theme in the next major version as it is deprecated.
      document.querySelector('body')?.setAttribute('data-theme', 'dark');
      document.querySelector('body')?.setAttribute('color-theme', 'dark');
    }
  }, []);

  const setDarkmodeToLocalStorage = (darkmodeValue: boolean) => {
    if (darkmodeValue) {
      // TODO: Remove line for data-theme in the next major version as it is deprecated.
      document.querySelector('body')?.setAttribute('data-theme', 'dark');
      document.querySelector('body')?.setAttribute('color-theme', 'dark');
    } else {
      // TODO: Remove line for data-theme in the next major version as it is deprecated.
      document.querySelector('body')?.setAttribute('data-theme', 'light');
      document.querySelector('body')?.setAttribute('color-theme', 'light');
    }

    localStorage.setItem('darkmode', JSON.stringify(darkmodeValue));
    setDarkmode(darkmodeValue);
  };

  let colorObject = {
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
    <ColorSettingsContext.Provider value={colorObject}>
      {props.children}
    </ColorSettingsContext.Provider>
  );
};

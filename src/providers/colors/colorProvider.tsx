import React, { useEffect, useState } from "react";
import { ColorSettingsContext } from "../../contexts/colorsettings";
import { getCurrentColors_Navbar } from "./color_getter/getCurrentColors_Navbar";
import { ColorOptions } from "../../components/navbar/typesNavbarColor";

export interface ColorProviderProps {
  colorOptions?: ColorOptions;
  disableCustomColorsForLightMode?: boolean;
  disableCustomColorsForDarkMode?: boolean;
}

export const ColorProvider = (props: React.PropsWithChildren<ColorProviderProps>) => {
  const [darkmode, setDarkmode] = useState(() =>
    localStorage.getItem("darkmode")
      ? Boolean(JSON.parse(localStorage.getItem("darkmode") as string))
      : false
  );

  useEffect(() => {
    if (darkmode) {
      document.querySelector("body")?.setAttribute("color-theme", "dark");
    }
  }, []);

  const setDarkmodeToLocalStorage = (darkmodeValue: boolean) => {
    if (darkmodeValue) {
      document.querySelector("body")?.setAttribute("color-theme", "dark");
    } else {
      document.querySelector("body")?.setAttribute("color-theme", "light");
    }

    localStorage.setItem("darkmode", JSON.stringify(darkmodeValue));
    setDarkmode(darkmodeValue);
  };

  const customColorsDisabledInCurrentMode =
    (!darkmode && !!props.disableCustomColorsForLightMode) ||
    (darkmode && !!props.disableCustomColorsForDarkMode);

  // TODO: For navbar colors the currently selected colors are provided. For other options this may be added in the future.
  return (
    <ColorSettingsContext.Provider
      value={{
        darkmode: darkmode,
        setDarkmode: setDarkmodeToLocalStorage,
        colorOptions: props.colorOptions ?? {},
        currentColors: {
          navbar: getCurrentColors_Navbar(
            darkmode,
            customColorsDisabledInCurrentMode,
            props.colorOptions?.navbarColorOptions ?? {}
          ),
        },
      }}
    >
      {props.children}
    </ColorSettingsContext.Provider>
  );
};

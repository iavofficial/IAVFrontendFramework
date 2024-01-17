import React, { useEffect, useState } from "react";
import { ColorObject } from "../../types/colorObjectType";
import { ColorSettingsContext } from "../../contexts/colorsettings";
import { getCurrentColors_Navbar } from "./color_getter/getCurrentColors_Navbar";
import { CurrentColosTabColorType } from "../../components/navbar/tabs/tabColorType";

export interface Props {
  colorOptions?: ColorObject;
}

export interface CurrentColorsType {
  navbarColors: {
    backgroundColor: string;
    legalDocumentsIconColor: string;
    navbarCollapseArrowColor: string;
    scrollbarColor: string;
    tabColors: CurrentColosTabColorType;
  }
}

export const ColorProvider = (props: React.PropsWithChildren<Props>) => {
  const [darkmode, setDarkmode] = useState(() =>
    localStorage.getItem("darkmode")
      ? Boolean(JSON.parse(localStorage.getItem("darkmode") as string))
      : false
  );

  useEffect(() => {
    if (darkmode) {
      // TODO: Remove line for data-theme in the next major version as it is deprecated.
      document.querySelector("body")?.setAttribute("data-theme", "dark");
      document.querySelector("body")?.setAttribute("color-theme", "dark");
    }
  }, []);

  const setDarkmodeToLocalStorage = (darkmodeValue: boolean) => {
    if (darkmodeValue) {
      // TODO: Remove line for data-theme in the next major version as it is deprecated.
      document.querySelector("body")?.setAttribute("data-theme", "dark");
      document.querySelector("body")?.setAttribute("color-theme", "dark");
    } else {
      // TODO: Remove line for data-theme in the next major version as it is deprecated.
      document.querySelector("body")?.setAttribute("data-theme", "light");
      document.querySelector("body")?.setAttribute("color-theme", "light");
    }

    localStorage.setItem("darkmode", JSON.stringify(darkmodeValue));
    setDarkmode(darkmodeValue);
  };

  // TODO: For navbar colors the currently selected colors are provided. For other options this may be added in the future.
  return (
    <ColorSettingsContext.Provider
      value={{
        darkmode: darkmode,
        setDarkmode: setDarkmodeToLocalStorage,
        colorOptions: props.colorOptions ?? {},
        currentColors: {
          navbarColors: getCurrentColors_Navbar(
            darkmode,
            props.colorOptions?.navbarColorOptions ?? {}
          ),
        },
      }}
    >
      {props.children}
    </ColorSettingsContext.Provider>
  );
};

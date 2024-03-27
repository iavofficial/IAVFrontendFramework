import React, { useEffect, useState } from "react";
import { ColorObject } from "../../types/colorObjectType";
import { ColorSettingsContext } from "../../contexts/colorsettings";
import { getCurrentColors_Navbar } from "./color_getter/getCurrentColors_Navbar";
import { CurrentColorsTabColorType } from "../../components/navbar/tabs/typesTabColor";

export interface Props {
  colorOptions?: ColorObject;
}

export interface CurrentColorsType {
  navbar: {
    backgroundColor: string;
    legalDocumentsIconColor: string;
    navbarCollapseArrowColor: string;
    scrollbarColor: string;
    content: CurrentColorsTabColorType;
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
            props.colorOptions?.navbarColorOptions ?? {}
          ),
        },
      }}
    >
      {props.children}
    </ColorSettingsContext.Provider>
  );
};

import React, { useEffect, useState } from "react";
import { ColorSettingsContext } from "../../contexts/colorsettings";
import { getCurrentColorsNavbar } from "./colorSelectors/getCurrentColorsNavbar";
import { getCurrentColorsHeader } from "./colorSelectors/getCurrentColorsHeader";
import { getCurrentColorsContentArea } from "./colorSelectors/getCurrentColorsContentArea";
import { getCurrentColorsContentbar } from "./colorSelectors/getCurrentColorsContentbar";
import { getCurrentColorsContentCell } from "./colorSelectors/getCurrentColorsContentCell";
import { getCurrentColorsAuthenticationView } from "./colorSelectors/getCurrentColorsAuthenticationView";
import { ColorOptions } from "./colorOptionTypes";

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
          header: getCurrentColorsHeader(
            darkmode,
            customColorsDisabledInCurrentMode,
            props.colorOptions?.header ?? {}
          ),
          navbar: getCurrentColorsNavbar(
            darkmode,
            customColorsDisabledInCurrentMode,
            props.colorOptions?.navbar ?? {}
          ),
          contentArea: getCurrentColorsContentArea(
            darkmode,
            customColorsDisabledInCurrentMode,
            props.colorOptions?.contentArea ?? {}
          ),
          contentbar: getCurrentColorsContentbar(
            darkmode,
            customColorsDisabledInCurrentMode,
            props.colorOptions?.contentbar ?? {}
          ),
          contentCell: getCurrentColorsContentCell(
            darkmode,
            customColorsDisabledInCurrentMode,
            props.colorOptions?.contentCell ?? {}
          ),
          authenticationView: getCurrentColorsAuthenticationView(
            darkmode,
            customColorsDisabledInCurrentMode,
            props.colorOptions?.authenticationView ?? {}
          ),
        },
      }}
    >
      {props.children}
    </ColorSettingsContext.Provider>
  );
};

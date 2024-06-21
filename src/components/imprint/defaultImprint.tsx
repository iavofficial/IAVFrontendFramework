import React, { useContext } from "react";
import { ColorSettingsContext } from "../../contexts/colorsettings";
import { ImprintText } from "./imprintText";
import "../css/globalColors.css";

export const DefaultImprint = () => {
  const colorSettingsContext = useContext(ColorSettingsContext);

  return (
    <div
      className={
        (colorSettingsContext?.darkmode ? "bg-black" : "bg-grey-1") +
        " flex p-3"
      }
      style={{
        height: "100%",
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        className={
          (colorSettingsContext?.darkmode
            ? "bg-grey-5 color-white"
            : "bg-white-1 color-black") + " flex p-3"
        }
        style={{
          height: "100%",
          width: "100%",
        }}
      >
        <ImprintText />
      </div>
    </div>
  );
};

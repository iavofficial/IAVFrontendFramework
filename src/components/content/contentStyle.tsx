import React from "react";
import { PropsWithChildren, useContext } from "react";
import { ColorSettingsContext } from "../../contexts/colorsettings";

export interface ContentStyleProps {
  disableStyling?: boolean;
}

export const ContentStyle = (props: PropsWithChildren<ContentStyleProps>) => {
  const colorSettingsContext = useContext(ColorSettingsContext);

  const backgroundColor =
    colorSettingsContext.currentColors.contentArea.backgroundColor;

  return props.disableStyling ? (
    props.children
  ) : (
    <div
      className="w-full h-full"
      style={{
        backgroundColor: backgroundColor,
      }}
    >
      {props.children}
    </div>
  );
};

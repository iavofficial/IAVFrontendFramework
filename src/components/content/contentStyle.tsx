import React from "react";
import { PropsWithChildren, useContext } from "react";
import { useStyleMap } from "./style_options/useStyleMap";
import { ColorSettingsContext } from "../../contexts/colorsettings";
import { StyleProps, StylesArray } from "./style_options/styleTypes";

export const ContentStyleStyles = {
  WRAPPER_FULL_WIDTH: "WRAPPER_FULL_WIDTH",
  WRAPPER_FULL_HEIGHT: "WRAPPER_FULL_HEIGHT",
  SPACING: "SPACING",
  SET_SPACING_COLOR: "SET_SPACING_COLOR",
};

export type ContentStyleStylesArray = StylesArray<typeof ContentStyleStyles>;

export type ContentStyleProps = StyleProps<typeof ContentStyleStyles>;

export const ContentStyleTemplates = {
  DEFAULT: [
    ContentStyleStyles.WRAPPER_FULL_WIDTH,
    ContentStyleStyles.WRAPPER_FULL_HEIGHT,
    ContentStyleStyles.SPACING,
    ContentStyleStyles.SET_SPACING_COLOR,
  ],
  CONTENT_CELLS: [
    ContentStyleStyles.WRAPPER_FULL_WIDTH,
    ContentStyleStyles.WRAPPER_FULL_HEIGHT,
  ],
};

export const ContentStyle = (props: PropsWithChildren<ContentStyleProps>) => {
  const colorSettingsContext = useContext(ColorSettingsContext);

  const backgroundColor =
    colorSettingsContext.currentColors.contentArea.backgroundColor;

  const classesMap = {
    [ContentStyleStyles.WRAPPER_FULL_WIDTH]: "w-full",
    [ContentStyleStyles.WRAPPER_FULL_HEIGHT]: "h-full",
    [ContentStyleStyles.SPACING]: "p-3",
  };

  const stylesMap = {
    [ContentStyleStyles.SET_SPACING_COLOR]: { backgroundColor },
  };

  const [classNames, styles] = useStyleMap(
    ContentStyleStyles,
    classesMap,
    stylesMap,
    props.appliedStyles,
    props.applyAllStyles
  );

  return (
    <div className={classNames} style={styles}>
      {props.children}
    </div>
  );
};

/**
 * Copyright © 2024 IAV GmbH Ingenieurgesellschaft Auto und Verkehr, All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import {PropsWithChildren, useContext} from "react";
import {useStyleMap} from "./style_options/useStyleMap";
import {ColorSettingsContext} from "../../contexts/colorsettings";
import {StyleProps, StylesArray} from "./style_options/styleTypes";

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
    ContentStyleStyles.SET_SPACING_COLOR,
  ],
};

export const ContentStyle = (props: PropsWithChildren<ContentStyleProps>) => {
  const colorSettingsContext = useContext(ColorSettingsContext);

  const contentAreaBackgroundColor =
    colorSettingsContext.currentColors.contentArea.backgroundColor;

  const classesMap = {
    [ContentStyleStyles.WRAPPER_FULL_WIDTH]: "w-full",
    [ContentStyleStyles.WRAPPER_FULL_HEIGHT]: "h-full",
    [ContentStyleStyles.SPACING]: "p-3",
  };

  const stylesMap = {
    [ContentStyleStyles.SET_SPACING_COLOR]: {
      backgroundColor: contentAreaBackgroundColor,
    },
  };

  const [classNames, styles] = useStyleMap(
    classesMap,
    stylesMap,
    props.appliedStyles,
  );

  return (
    <div className={classNames} style={styles}>
      {props.children}
    </div>
  );
};

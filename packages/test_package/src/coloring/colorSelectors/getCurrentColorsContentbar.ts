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

import {ContentbarColorOptions} from "../colorOptionTypes";
import {
  DARK_CONTENT_BAR_BACKGROUND_COLOR,
  DARK_CONTENT_BAR_BUTTON_DEFAULT_COLOR,
  DARK_CONTENT_BAR_BUTTON_HOVER_COLOR,
  DARK_CONTENT_BAR_ICON_DEFAULT_COLOR,
  DARK_CONTENT_BAR_ICON_HOVER_COLOR,
  DARK_CONTENT_TAB_BACKGROUND_ACTIVE_COLOR,
  DARK_CONTENT_TAB_BACKGROUND_DEFAULT_COLOR,
  DARK_CONTENT_TAB_BACKGROUND_HOVER_COLOR,
  DARK_CONTENT_TAB_ICON_ACTIVE_COLOR,
  DARK_CONTENT_TAB_ICON_DEFAULT_COLOR,
  DARK_CONTENT_TAB_ICON_HOVER_COLOR,
  DARK_CONTENT_TAB_TEXT_ACTIVE_COLOR,
  DARK_CONTENT_TAB_TEXT_DEFAULT_COLOR,
  DARK_CONTENT_TAB_TEXT_HOVER_COLOR,
  LIGHT_CONTENT_BAR_BACKGROUND_COLOR,
  LIGHT_CONTENT_BAR_BUTTON_DEFAULT_COLOR,
  LIGHT_CONTENT_BAR_BUTTON_HOVER_COLOR,
  LIGHT_CONTENT_BAR_ICON_DEFAULT_COLOR,
  LIGHT_CONTENT_BAR_ICON_HOVER_COLOR,
  LIGHT_CONTENT_TAB_BACKGROUND_ACTIVE_COLOR,
  LIGHT_CONTENT_TAB_BACKGROUND_DEFAULT_COLOR,
  LIGHT_CONTENT_TAB_BACKGROUND_HOVER_COLOR,
  LIGHT_CONTENT_TAB_ICON_ACTIVE_COLOR,
  LIGHT_CONTENT_TAB_ICON_DEFAULT_COLOR,
  LIGHT_CONTENT_TAB_ICON_HOVER_COLOR,
  LIGHT_CONTENT_TAB_TEXT_ACTIVE_COLOR,
  LIGHT_CONTENT_TAB_TEXT_DEFAULT_COLOR,
  LIGHT_CONTENT_TAB_TEXT_HOVER_COLOR,
} from "../defaultColors";
import {determineSelectedColorHof} from "./determineSelectedColor";

export const getCurrentColorsContentbar = (
  darkmodeIsEnabled: boolean,
  customColorsDisabledInCurrentMode: boolean,
  contentBarColorOptions: ContentbarColorOptions,
) => {
  const determineColor = determineSelectedColorHof(
    darkmodeIsEnabled,
    customColorsDisabledInCurrentMode,
  );

  return {
    backgroundColor: determineColor(
      LIGHT_CONTENT_BAR_BACKGROUND_COLOR,
      DARK_CONTENT_BAR_BACKGROUND_COLOR,
      contentBarColorOptions.backgroundColor,
    ),
    iconDefaultColor: determineColor(
      LIGHT_CONTENT_BAR_ICON_DEFAULT_COLOR,
      DARK_CONTENT_BAR_ICON_DEFAULT_COLOR,
      contentBarColorOptions.iconDefaultColor,
    ),
    iconHoverColor: determineColor(
      LIGHT_CONTENT_BAR_ICON_HOVER_COLOR,
      DARK_CONTENT_BAR_ICON_HOVER_COLOR,
      contentBarColorOptions.iconHoverColor,
    ),
    buttonDefaultColor: determineColor(
      LIGHT_CONTENT_BAR_BUTTON_DEFAULT_COLOR,
      DARK_CONTENT_BAR_BUTTON_DEFAULT_COLOR,
      contentBarColorOptions.buttonDefaultColor,
    ),
    buttonHoverColor: determineColor(
      LIGHT_CONTENT_BAR_BUTTON_HOVER_COLOR,
      DARK_CONTENT_BAR_BUTTON_HOVER_COLOR,
      contentBarColorOptions.buttonHoverColor,
    ),
    tabs: {
      backgroundDefaultColor: determineColor(
        LIGHT_CONTENT_TAB_BACKGROUND_DEFAULT_COLOR,
        DARK_CONTENT_TAB_BACKGROUND_DEFAULT_COLOR,
        contentBarColorOptions.tabs?.backgroundDefaultColor,
      ),
      backgroundHoverColor: determineColor(
        LIGHT_CONTENT_TAB_BACKGROUND_HOVER_COLOR,
        DARK_CONTENT_TAB_BACKGROUND_HOVER_COLOR,
        contentBarColorOptions.tabs?.backgroundHoverColor,
      ),
      backgroundActiveColor: determineColor(
        LIGHT_CONTENT_TAB_BACKGROUND_ACTIVE_COLOR,
        DARK_CONTENT_TAB_BACKGROUND_ACTIVE_COLOR,
        contentBarColorOptions.tabs?.backgroundActiveColor,
      ),
      textDefaultColor: determineColor(
        LIGHT_CONTENT_TAB_TEXT_DEFAULT_COLOR,
        DARK_CONTENT_TAB_TEXT_DEFAULT_COLOR,
        contentBarColorOptions.tabs?.textDefaultColor,
      ),
      textHoverColor: determineColor(
        LIGHT_CONTENT_TAB_TEXT_HOVER_COLOR,
        DARK_CONTENT_TAB_TEXT_HOVER_COLOR,
        contentBarColorOptions.tabs?.textHoverColor,
      ),
      textActiveColor: determineColor(
        LIGHT_CONTENT_TAB_TEXT_ACTIVE_COLOR,
        DARK_CONTENT_TAB_TEXT_ACTIVE_COLOR,
        contentBarColorOptions.tabs?.textActiveColor,
      ),
      iconDefaultColor: determineColor(
        LIGHT_CONTENT_TAB_ICON_DEFAULT_COLOR,
        DARK_CONTENT_TAB_ICON_DEFAULT_COLOR,
        contentBarColorOptions.tabs?.iconDefaultColor,
      ),
      iconHoverColor: determineColor(
        LIGHT_CONTENT_TAB_ICON_HOVER_COLOR,
        DARK_CONTENT_TAB_ICON_HOVER_COLOR,
        contentBarColorOptions.tabs?.iconHoverColor,
      ),
      iconActiveColor: determineColor(
        LIGHT_CONTENT_TAB_ICON_ACTIVE_COLOR,
        DARK_CONTENT_TAB_ICON_ACTIVE_COLOR,
        contentBarColorOptions.tabs?.iconActiveColor,
      ),
    },
  };
};

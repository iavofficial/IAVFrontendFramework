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

import {NavbarColorOptions} from "../colorOptionTypes";
import {
  DARK_NAVBAR_BACKGROUND_INSIDE_ACTIVE_GROUP_COLOR,
  DARK_NAV_BACKGROUND_COLOR,
  DARK_NAV_COLLAPSE_ARROW_COLOR,
  DARK_NAV_GROUP_ARROW_ACTIVE_COLOR,
  DARK_NAV_GROUP_ARROW_HOVER_COLOR,
  DARK_NAV_GROUP_BACKGROUND_ACTIVE_COLOR,
  DARK_NAV_GROUP_BACKGROUND_HOVER_COLOR,
  DARK_NAV_GROUP_BACKGROUND_DEFAULT_COLOR,
  DARK_NAV_GROUP_FONT_ACTIVE_COLOR,
  DARK_NAV_GROUP_FONT_HOVER_COLOR,
  DARK_NAV_GROUP_FONT_DEFAULT_COLOR,
  DARK_NAV_GROUP_ICON_ACTIVE_COLOR,
  DARK_NAV_GROUP_ICON_HOVER_COLOR,
  DARK_NAV_GROUP_ICON_DEFAULT_COLOR,
  DARK_NAV_LEGAL_DOCS_ICON_COLOR,
  DARK_NAV_SCROLLBAR_COLOR,
  DARK_NAV_TAB_BACKGROUND_ACTIVE_COLOR,
  DARK_NAV_TAB_BACKGROUND_HOVER_COLOR,
  DARK_NAV_TAB_BACKGROUND_DEFAULT_COLOR,
  DARK_NAV_TAB_FONT_ACTIVE_COLOR,
  DARK_NAV_TAB_FONT_HOVER_COLOR,
  DARK_NAV_TAB_FONT_DEFAULT_COLOR,
  DARK_NAV_TAB_ICON_ACTIVE_COLOR,
  DARK_NAV_TAB_ICON_HOVER_COLOR,
  DARK_NAV_TAB_ICON_DEFAULT_COLOR,
  LIGHT_NAV_BACKGROUND_COLOR,
  LIGHT_NAV_BACKGROUND_INSIDE_ACTIVE_GROUP_COLOR,
  LIGHT_NAV_COLLAPSE_ARROW_COLOR,
  LIGHT_NAV_GROUP_ARROW_ACTIVE_COLOR,
  LIGHT_NAV_GROUP_ARROW_HOVER_COLOR,
  LIGHT_NAV_GROUP_BACKGROUND_ACTIVE_COLOR,
  LIGHT_NAV_GROUP_BACKGROUND_HOVER_COLOR,
  LIGHT_NAV_GROUP_BACKGROUND_DEFAULT_COLOR,
  LIGHT_NAV_GROUP_FONT_ACTIVE_COLOR,
  LIGHT_NAV_GROUP_FONT_HOVER_COLOR,
  LIGHT_NAV_GROUP_FONT_DEFAULT_COLOR,
  LIGHT_NAV_GROUP_ICON_ACTIVE_COLOR,
  LIGHT_NAV_GROUP_ICON_HOVER_COLOR,
  LIGHT_NAV_GROUP_ICON_DEFAULT_COLOR,
  LIGHT_NAV_LEGAL_DOCS_ICON_COLOR,
  LIGHT_NAV_SCROLLBAR_COLOR,
  LIGHT_NAV_TAB_BACKGROUND_ACTIVE_COLOR,
  LIGHT_NAV_TAB_BACKGROUND_HOVER_COLOR,
  LIGHT_NAV_TAB_BACKGROUND_DEFAULT_COLOR,
  LIGHT_NAV_TAB_FONT_ACTIVE_COLOR,
  LIGHT_NAV_TAB_FONT_HOVER_COLOR,
  LIGHT_NAV_TAB_FONT_DEFAULT_COLOR,
  LIGHT_NAV_TAB_ICON_ACTIVE_COLOR,
  LIGHT_NAV_TAB_ICON_HOVER_COLOR,
  LIGHT_NAV_TAB_ICON_DEFAULT_COLOR,
  LIGHT_NAV_GROUP_ARROW_DEFAULT_COLOR,
  DARK_NAV_GROUP_ARROW_DEFAULT_COLOR,
} from "../defaultColors";
import {determineSelectedColorHof} from "./determineSelectedColor";

export const getCurrentColorsNavbar = (
  darkmodeIsEnabled: boolean,
  customColorsDisabledInCurrentMode: boolean,
  navbarColorOptions: NavbarColorOptions,
) => {
  const determineColor = determineSelectedColorHof(
    darkmodeIsEnabled,
    customColorsDisabledInCurrentMode,
  );

  return {
    backgroundColor: determineColor(
      LIGHT_NAV_BACKGROUND_COLOR,
      DARK_NAV_BACKGROUND_COLOR,
      navbarColorOptions.backgroundColor,
    ),
    legalDocumentsIconColor: determineColor(
      LIGHT_NAV_LEGAL_DOCS_ICON_COLOR,
      DARK_NAV_LEGAL_DOCS_ICON_COLOR,
      navbarColorOptions.legalDocumentsIconColor,
    ),
    navbarCollapseArrowColor: determineColor(
      LIGHT_NAV_COLLAPSE_ARROW_COLOR,
      DARK_NAV_COLLAPSE_ARROW_COLOR,
      navbarColorOptions.navbarCollapseArrowColor,
    ),
    scrollbarColor: determineColor(
      LIGHT_NAV_SCROLLBAR_COLOR,
      DARK_NAV_SCROLLBAR_COLOR,
      navbarColorOptions.navbarCollapseArrowColor,
    ),
    content: {
      insideActiveGroupColor: determineColor(
        LIGHT_NAV_BACKGROUND_INSIDE_ACTIVE_GROUP_COLOR,
        DARK_NAVBAR_BACKGROUND_INSIDE_ACTIVE_GROUP_COLOR,
        navbarColorOptions.content?.insideActiveGroupColor,
      ),
      default: {
        tabBackgroundDefaultColor: determineColor(
          LIGHT_NAV_TAB_BACKGROUND_DEFAULT_COLOR,
          DARK_NAV_TAB_BACKGROUND_DEFAULT_COLOR,
          navbarColorOptions.content?.default?.tabBackgroundDefaultColor,
        ),
        tabFontDefaultColor: determineColor(
          LIGHT_NAV_TAB_FONT_DEFAULT_COLOR,
          DARK_NAV_TAB_FONT_DEFAULT_COLOR,
          navbarColorOptions.content?.default?.tabFontDefaultColor,
        ),
        tabIconDefaultColor: determineColor(
          LIGHT_NAV_TAB_ICON_DEFAULT_COLOR,
          DARK_NAV_TAB_ICON_DEFAULT_COLOR,
          navbarColorOptions.content?.default?.tabIconDefaultColor,
        ),
        groupBackgroundDefaultColor: determineColor(
          LIGHT_NAV_GROUP_BACKGROUND_DEFAULT_COLOR,
          DARK_NAV_GROUP_BACKGROUND_DEFAULT_COLOR,
          navbarColorOptions.content?.default?.groupBackgroundDefaultColor,
        ),
        groupFontDefaultColor: determineColor(
          LIGHT_NAV_GROUP_FONT_DEFAULT_COLOR,
          DARK_NAV_GROUP_FONT_DEFAULT_COLOR,
          navbarColorOptions.content?.default?.groupFontDefaultColor,
        ),
        groupIconDefaultColor: determineColor(
          LIGHT_NAV_GROUP_ICON_DEFAULT_COLOR,
          DARK_NAV_GROUP_ICON_DEFAULT_COLOR,
          navbarColorOptions.content?.default?.groupIconDefaultColor,
        ),
        groupArrowDefaultColor: determineColor(
          LIGHT_NAV_GROUP_ARROW_DEFAULT_COLOR,
          DARK_NAV_GROUP_ARROW_DEFAULT_COLOR,
          navbarColorOptions.content?.default?.groupArrowDefaultColor,
        ),
      },
      hover: {
        tabBackgroundHoverColor: determineColor(
          LIGHT_NAV_TAB_BACKGROUND_HOVER_COLOR,
          DARK_NAV_TAB_BACKGROUND_HOVER_COLOR,
          navbarColorOptions.content?.hover?.tabBackgroundHoverColor,
        ),
        tabFontHoverColor: determineColor(
          LIGHT_NAV_TAB_FONT_HOVER_COLOR,
          DARK_NAV_TAB_FONT_HOVER_COLOR,
          navbarColorOptions.content?.hover?.tabFontHoverColor,
        ),
        tabIconHoverColor: determineColor(
          LIGHT_NAV_TAB_ICON_HOVER_COLOR,
          DARK_NAV_TAB_ICON_HOVER_COLOR,
          navbarColorOptions.content?.hover?.tabIconHoverColor,
        ),
        groupBackgroundHoverColor: determineColor(
          LIGHT_NAV_GROUP_BACKGROUND_HOVER_COLOR,
          DARK_NAV_GROUP_BACKGROUND_HOVER_COLOR,
          navbarColorOptions.content?.hover?.groupBackgroundHoverColor,
        ),
        groupFontHoverColor: determineColor(
          LIGHT_NAV_GROUP_FONT_HOVER_COLOR,
          DARK_NAV_GROUP_FONT_HOVER_COLOR,
          navbarColorOptions.content?.hover?.groupFontHoverColor,
        ),
        groupIconHoverColor: determineColor(
          LIGHT_NAV_GROUP_ICON_HOVER_COLOR,
          DARK_NAV_GROUP_ICON_HOVER_COLOR,
          navbarColorOptions.content?.hover?.groupIconHoverColor,
        ),
        groupArrowHoverColor: determineColor(
          LIGHT_NAV_GROUP_ARROW_HOVER_COLOR,
          DARK_NAV_GROUP_ARROW_HOVER_COLOR,
          navbarColorOptions.content?.hover?.groupArrowHoverColor,
        ),
      },
      active: {
        tabBackgroundActiveColor: determineColor(
          LIGHT_NAV_TAB_BACKGROUND_ACTIVE_COLOR,
          DARK_NAV_TAB_BACKGROUND_ACTIVE_COLOR,
          navbarColorOptions.content?.active?.tabBackgroundActiveColor,
        ),
        tabFontActiveColor: determineColor(
          LIGHT_NAV_TAB_FONT_ACTIVE_COLOR,
          DARK_NAV_TAB_FONT_ACTIVE_COLOR,
          navbarColorOptions.content?.active?.tabFontActiveColor,
        ),
        tabIconActiveColor: determineColor(
          LIGHT_NAV_TAB_ICON_ACTIVE_COLOR,
          DARK_NAV_TAB_ICON_ACTIVE_COLOR,
          navbarColorOptions.content?.active?.tabIconActiveColor,
        ),
        groupBackgroundActiveColor: determineColor(
          LIGHT_NAV_GROUP_BACKGROUND_ACTIVE_COLOR,
          DARK_NAV_GROUP_BACKGROUND_ACTIVE_COLOR,
          navbarColorOptions.content?.active?.groupBackgroundActiveColor,
        ),
        groupFontActiveColor: determineColor(
          LIGHT_NAV_GROUP_FONT_ACTIVE_COLOR,
          DARK_NAV_GROUP_FONT_ACTIVE_COLOR,
          navbarColorOptions.content?.active?.groupFontActiveColor,
        ),
        groupIconActiveColor: determineColor(
          LIGHT_NAV_GROUP_ICON_ACTIVE_COLOR,
          DARK_NAV_GROUP_ICON_ACTIVE_COLOR,
          navbarColorOptions.content?.active?.groupIconActiveColor,
        ),
        groupArrowActiveColor: determineColor(
          LIGHT_NAV_GROUP_ARROW_ACTIVE_COLOR,
          DARK_NAV_GROUP_ARROW_ACTIVE_COLOR,
          navbarColorOptions.content?.active?.groupArrowActiveColor,
        ),
      },
    },
  };
};

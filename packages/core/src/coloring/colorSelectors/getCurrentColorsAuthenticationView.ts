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

import {AuthenticationViewColorOptions} from "../colorOptionTypes";
import {
  DARK_AUTH_COMPANY_TEXT_COLOR,
  DARK_AUTH_FULL_SCREEN_BACKGROUND_COLOR,
  DARK_AUTH_HEADER_BACKGROUND_COLOR,
  DARK_AUTH_INPUT_FIELD_BACKGROUND_COLOR,
  DARK_AUTH_INPUT_FIELD_DESCRIPTION_COLOR,
  DARK_AUTH_INPUT_FIELD_TEXT_COLOR,
  DARK_AUTH_LEGAL_NOTICE_ICON_COLOR,
  DARK_AUTH_LOGIN_BUTTON_BACKGROUND_COLOR,
  DARK_AUTH_LOGIN_BUTTON_TEXT_COLOR,
  DARK_AUTH_LOGIN_FORM_BACKGROUND_COLOR,
  DARK_AUTH_PW_REQUIREMENTS_COLOR,
  DARK_AUTH_THEME_TOGGLER_COLOR,
  LIGHT_AUTH_COMPANY_TEXT_COLOR,
  LIGHT_AUTH_FULL_SCREEN_BACKGROUND_COLOR,
  LIGHT_AUTH_HEADER_BACKGROUND_COLOR,
  LIGHT_AUTH_INPUT_FIELD_BACKGROUND_COLOR,
  LIGHT_AUTH_INPUT_FIELD_DESCRIPTION_COLOR,
  LIGHT_AUTH_INPUT_FIELD_TEXT_COLOR,
  LIGHT_AUTH_LEGAL_NOTICE_ICON_COLOR,
  LIGHT_AUTH_LOGIN_BUTTON_BACKGROUND_COLOR,
  LIGHT_AUTH_LOGIN_BUTTON_TEXT_COLOR,
  LIGHT_AUTH_LOGIN_FORM_BACKGROUND_COLOR,
  LIGHT_AUTH_PW_REQUIREMENTS_COLOR,
  LIGHT_AUTH_THEME_TOGGLER_COLOR,
} from "../defaultColors";
import {determineSelectedColorHof} from "./determineSelectedColor";

export const getCurrentColorsAuthenticationView = (
  darkmodeIsEnabled: boolean,
  customColorsDisabledInCurrentMode: boolean,
  authViewColorOptions: AuthenticationViewColorOptions,
) => {
  const determineColor = determineSelectedColorHof(
    darkmodeIsEnabled,
    customColorsDisabledInCurrentMode,
  );

  return {
    headerBackgroundColor: determineColor(
      LIGHT_AUTH_HEADER_BACKGROUND_COLOR,
      DARK_AUTH_HEADER_BACKGROUND_COLOR,
      authViewColorOptions.headerBackgroundColor,
    ),
    loginButtonBackgroundColor: determineColor(
      LIGHT_AUTH_LOGIN_BUTTON_BACKGROUND_COLOR,
      DARK_AUTH_LOGIN_BUTTON_BACKGROUND_COLOR,
      authViewColorOptions.loginButtonBackgroundColor,
    ),
    loginButtonTextColor: determineColor(
      LIGHT_AUTH_LOGIN_BUTTON_TEXT_COLOR,
      DARK_AUTH_LOGIN_BUTTON_TEXT_COLOR,
      authViewColorOptions.loginButtonTextColor,
    ),
    legalNoticeIconColor: determineColor(
      LIGHT_AUTH_LEGAL_NOTICE_ICON_COLOR,
      DARK_AUTH_LEGAL_NOTICE_ICON_COLOR,
      authViewColorOptions.legalNoticeIconColor,
    ),
    loginFormBackgroundColor: determineColor(
      LIGHT_AUTH_LOGIN_FORM_BACKGROUND_COLOR,
      DARK_AUTH_LOGIN_FORM_BACKGROUND_COLOR,
      authViewColorOptions.loginFormBackgroundColor,
    ),
    fullScreenBackgroundColor: determineColor(
      LIGHT_AUTH_FULL_SCREEN_BACKGROUND_COLOR,
      DARK_AUTH_FULL_SCREEN_BACKGROUND_COLOR,
      authViewColorOptions.fullScreenBackgroundColor,
    ),
    companyTextColor: determineColor(
      LIGHT_AUTH_COMPANY_TEXT_COLOR,
      DARK_AUTH_COMPANY_TEXT_COLOR,
      authViewColorOptions.companyTextColor,
    ),
    inputFieldDescriptionTextColor: determineColor(
      LIGHT_AUTH_INPUT_FIELD_DESCRIPTION_COLOR,
      DARK_AUTH_INPUT_FIELD_DESCRIPTION_COLOR,
      authViewColorOptions.inputFieldDescriptionTextColor,
    ),
    inputFieldBackgroundColor: determineColor(
      LIGHT_AUTH_INPUT_FIELD_BACKGROUND_COLOR,
      DARK_AUTH_INPUT_FIELD_BACKGROUND_COLOR,
      authViewColorOptions.inputFieldBackgroundColor,
    ),
    inputFieldTextColor: determineColor(
      LIGHT_AUTH_INPUT_FIELD_TEXT_COLOR,
      DARK_AUTH_INPUT_FIELD_TEXT_COLOR,
      authViewColorOptions.inputFieldTextColor,
    ),
    passwortRequirementsTextColor: determineColor(
      LIGHT_AUTH_PW_REQUIREMENTS_COLOR,
      DARK_AUTH_PW_REQUIREMENTS_COLOR,
      authViewColorOptions.passwortRequirementsTextColor,
    ),
    themeTogglerColor: determineColor(
      LIGHT_AUTH_THEME_TOGGLER_COLOR,
      DARK_AUTH_THEME_TOGGLER_COLOR,
      authViewColorOptions.themeTogglerColor,
    ),
  };
};

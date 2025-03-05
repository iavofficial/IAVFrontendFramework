/**
 * Copyright © 2025 IAV GmbH Ingenieurgesellschaft Auto und Verkehr, All Rights Reserved.
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

import {DeepRequired} from "../util-types/requiredMutable";

//# Header color options
export interface HeaderColorOptions {
  backgroundColor?: string;
  settingsIconColor?: string;
  userIconColor?: string;
}

//# Navbar color options
export interface NavbarColorOptions {
  backgroundColor?: string;
  navbarCollapseArrowColor?: string;
  legalDocumentsIconColor?: string;
  scrollbarColor?: string;
  content?: TabColorOptionsOptional;
}

export interface TabColorOptionsOptional {
  insideActiveGroupColor?: string;
  default?: {
    tabBackgroundDefaultColor?: string;
    tabFontDefaultColor?: string;
    tabIconDefaultColor?: string;
    groupBackgroundDefaultColor?: string;
    groupFontDefaultColor?: string;
    groupIconDefaultColor?: string;
    groupArrowDefaultColor?: string;
  };
  hover?: {
    tabBackgroundHoverColor?: string;
    tabFontHoverColor?: string;
    tabIconHoverColor?: string;
    groupBackgroundHoverColor?: string;
    groupFontHoverColor?: string;
    groupIconHoverColor?: string;
    groupArrowHoverColor?: string;
  };
  active?: {
    tabBackgroundActiveColor?: string;
    tabFontActiveColor?: string;
    tabIconActiveColor?: string;
    groupBackgroundActiveColor?: string;
    groupFontActiveColor?: string;
    groupIconActiveColor?: string;
    groupArrowActiveColor?: string;
  };
}

export type TabColorOptionsMandatory = DeepRequired<TabColorOptionsOptional>;

//# Content Area color options
export interface ContentAreaColorOptions {
  backgroundColor?: string;
}

//# Content Bar color options
export interface ContentbarColorOptions {
  backgroundColor?: string;
  iconDefaultColor?: string;
  iconHoverColor?: string;
  buttonDefaultColor?: string;
  buttonHoverColor?: string;
  tabs?: ContentbarTabColorType;
}

export interface ContentbarTabColorType {
  backgroundDefaultColor?: string;
  backgroundHoverColor?: string;
  backgroundActiveColor?: string;
  textDefaultColor?: string;
  textHoverColor?: string;
  textActiveColor?: string;
  iconDefaultColor?: string;
  iconHoverColor?: string;
  iconActiveColor?: string;
}

//# Content Cell color options
export interface ContentCellColorOptions {
  backgroundColor?: string;
}

//# Authentication View color options
export interface AuthenticationViewColorOptions {
  headerBackgroundColor?: string;
  loginButtonBackgroundColor?: string;
  loginButtonTextColor?: string;
  legalNoticeIconColor?: string;
  loginFormBackgroundColor?: string;
  fullScreenBackgroundColor?: string;
  companyTextColor?: string;
  inputFieldDescriptionTextColor?: string;
  inputFieldBackgroundColor?: string;
  inputFieldTextColor?: string;
  passwortRequirementsTextColor?: string;
  themeTogglerColor?: string;
}

//# Aggregated color options
export interface ColorOptions {
  header?: HeaderColorOptions;
  navbar?: NavbarColorOptions;
  contentArea?: ContentAreaColorOptions;
  contentbar?: ContentbarColorOptions;
  contentCell?: ContentCellColorOptions;
  authenticationView?: AuthenticationViewColorOptions;
}

export type SelectedColors = DeepRequired<ColorOptions>;

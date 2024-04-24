import { DeepRequired } from "../../types/requiredMutable";

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
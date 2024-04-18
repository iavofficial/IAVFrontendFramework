import { DeepRequired, RequiredMutable } from '../../types/requiredMutable';
import { AuthenticationColorType } from '../authentication/authenticationColorType';
import { ContentColorType, ContentbarColorType, ContentbarTabColorType } from '../content/contentColorType';
import { HeaderColorType } from '../header/appHeaderColor';

export interface ColorOptions {
  headerColorOptions?: HeaderColorType;
  navbarColorOptions?: NavbarColorOptions;
  contentColorOptions?: ContentColorType;
  contentbarColorOptions?: ContentbarColorType;
  contentbarTabColorOptions?: ContentbarTabColorType;
  authenticationColorOptions?: AuthenticationColorType;
}

export interface SelectedColors {
  navbar: {
    backgroundColor: string;
    legalDocumentsIconColor: string;
    navbarCollapseArrowColor: string;
    scrollbarColor: string;
    content: TabColorOptionsMandatory;
  }
}

export interface NavbarColorOptions {
  navbarBackgroundColor?: string;
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
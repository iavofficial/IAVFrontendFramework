import { RequiredMutable } from "../../../types/requiredMutable";

export interface TabColorType {
  main?: {
    tabBackgroundMainColor?: string;
    tabFontMainColor?: string;
    tabIconMainColor?: string;
    groupBackgroundMainColor?: string;
    groupFontMainColor?: string;
    groupIconMainColor?: string;
    groupArrowMainColor?: string;
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
  insideActiveGroupColor: string;
}

export type CurrentColorsTabColorType = RequiredMutable<TabColorType>;
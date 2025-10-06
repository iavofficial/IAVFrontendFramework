// interfaces.ts
import React from "react";

export interface StyleProps<T> {
  appliedStyles?: StylesArray<T>;
}

// Array of values of a type T
export type StylesArray<T> = T[keyof T][];

export const ContentBarStyles = {
  SPACING: "SPACING",
  SET_SPACING_COLOR: "SET_SPACING_COLOR",
} as const;

export type ContentBarStylesArray =
  (typeof ContentBarStyles)[keyof typeof ContentBarStyles][];
export type ContentStyleStylesArray = StylesArray<typeof ContentBarStyles>;

export type ContentBarElement = {
  getId: () => string;
  getContentbarElement: (
    width: number,
    selectedId?: string,
    firstId?: string,
  ) => React.ReactNode;
};

export type UIContentBarProps = StyleProps<typeof ContentBarStyles> & {
  contentElements: ContentBarElement[];
  addable?: boolean;
  jumpToEndOfContentBar?: boolean;
  selectedId?: string;
  onClickAddButton?: () => void;
  onClickLeftSlideButton?: () => void;
  onClickRightSlideButton?: () => void;
};

export type ContentBarViewProps = {
  visibleElements: ContentBarElement[];
  elementWidth: number;
  canSlideLeft: boolean;
  canSlideRight: boolean;
  slideLeft: () => void;
  slideRight: () => void;
  addable: boolean;
  onAdd?: () => void;
  selectedId?: string;
  firstId?: string;
  containerBg?: string;
  barBg?: string;
  hasSpacing: boolean;
};

export type UIModuleContentBarProps = UIContentBarProps & {
  uiComponent?: React.ComponentType<ContentBarViewProps>;
};

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

import React from "react";
import {BasicContentbarWrapper} from "./wrapper/basicContentbarWrapper";

export interface StyleProps<T> {
  appliedStyles?: StylesArray<T>;
}

export type StylesArray<T> = T[keyof T][];

export const ContentBarStyles = {
  SPACING: "SPACING",
  SET_SPACING_COLOR: "SET_SPACING_COLOR",
} as const;

export type ContentBarStylesArray =
  (typeof ContentBarStyles)[keyof typeof ContentBarStyles][];

export type ContentBarElement = {
  getId: () => string;
  getContentbarElement: (
    width: number,
    selectedId?: string,
    firstId?: string,
  ) => React.ReactNode;
};

export type UIContentBarProps = StyleProps<typeof ContentBarStyles> & {
  contentWrappers: BasicContentbarWrapper[];
  addable?: boolean;
  jumpToEndOfContentBar?: boolean;
  selectedId?: string;
  onClickAddButton?: () => void;
  onClickLeftSlideButton?: () => void;
  onClickRightSlideButton?: () => void;
};

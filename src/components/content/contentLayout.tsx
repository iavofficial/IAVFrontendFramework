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

import React, {PropsWithChildren} from "react";
import {ContentStyle, ContentStyleProps} from "./contentStyle";

export enum LayoutBehaviour {
  // Parent div of content will have no specific layout class
  NONE = "",
  // Parent div will be prime react grid
  GRID = "grid grid-nogutter",
  // Parent will be flexbox
  FLEX = "flex",
  // Parent will be flexbox column
  FLEX_COL = "flex flex-column",
}

export interface ContentLayoutProps {
  layoutBehaviour?: LayoutBehaviour;
}

export type ContentLayoutAndStyleProps = ContentLayoutProps & {
  contentStyle?: ContentStyleProps;
};

const DEFAULT_LAYOUT_BEHAVIOUR = LayoutBehaviour.NONE;

export const ContentLayout = (
  props: PropsWithChildren<ContentLayoutAndStyleProps>,
) => {
  const layoutBehaviour = props.layoutBehaviour ?? DEFAULT_LAYOUT_BEHAVIOUR;

  return (
    <ContentStyle {...props.contentStyle}>
      <div className={`h-full w-full ${layoutBehaviour}`}>{props.children}</div>
    </ContentStyle>
  );
};

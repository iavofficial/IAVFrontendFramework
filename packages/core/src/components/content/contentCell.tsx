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

import React, {CSSProperties, PropsWithChildren, useContext} from "react";
import "../css/globalColors.css";
import {ColorSettingsContext} from "../../contexts/colorsettings";

import "./contentCell.css";

export enum CellPaddings {
  FULL,
  VERT_RIGHT,
  BOT_HOR,
  BOT_RIGHT,
  NONE,
}

export interface Props {
  height?: string;
  colWidth?: number;
  clearStyle?: boolean;
  paddings: CellPaddings;
}

export function ContentCell(props: PropsWithChildren<Props>) {
  const colorSettingsContext = useContext(ColorSettingsContext);
  let paddings = "";
  switch (props.paddings) {
    case CellPaddings.FULL:
      paddings = "p-3";
      break;
    case CellPaddings.VERT_RIGHT:
      paddings = "py-3 pr-3";
      break;
    case CellPaddings.BOT_HOR:
      paddings = "pb-3 px-3";
      break;
    case CellPaddings.BOT_RIGHT:
      paddings = "pb-3 pr-3";
      break;
  }
  let columnClass: string;
  if (props.colWidth) {
    columnClass = "col-" + props.colWidth;
  } else {
    columnClass = "col";
  }

  const innerDivStyle: CSSProperties = {
    width: "100%",
  };

  if (!props.clearStyle) {
    innerDivStyle.backgroundColor =
      colorSettingsContext.currentColors.contentCell.backgroundColor;
  }

  return (
    <div className={`content-cell ${columnClass}`}>
      <div className={"flex " + paddings} style={{height: "100%"}}>
        <div
          style={innerDivStyle}
          className={
            colorSettingsContext?.darkmode ? "color-white" : "color-black"
          }
        >
          {props.children}
        </div>
      </div>
    </div>
  );
}

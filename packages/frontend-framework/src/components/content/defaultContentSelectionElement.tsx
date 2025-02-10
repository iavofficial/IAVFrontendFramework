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

import React, {useContext, useState} from "react";
import {DEFAULT_ELEMENTSIZE, GREY5, WHITE} from "../../constants";
import {generateHashOfLength} from "../../utils/hash";
import {Tooltip} from "primereact/tooltip";
import "./contentbar.css";
import {ColorSettingsContext} from "../../contexts/colorsettings";
import {TranslationFunction} from "../../types/translationFunction";
import {useTranslator} from "../internationalization/translators";
import {determineCurrentColor} from "../../utils/determineCurrentColor";

export interface Props {
  displayName: string | TranslationFunction;
  width: number;
  id: string;
  selected?: boolean;
  closable?: boolean;
  onClose?: (id: string, idOfFirstElement: string) => void;
  onClick: (id: string) => any;
  idOfFirstElement: string;
}

export const DefaultContentSelectionElement = (props: Props) => {
  const [hovering, setHovering] = useState(false);
  const translationFunction = useTranslator();
  const colorSettingsContext = useContext(ColorSettingsContext);

  const tabBackgroundDefaultColor =
    colorSettingsContext.currentColors.contentbar.tabs.backgroundDefaultColor;
  const tabBackgroundHoverColor =
    colorSettingsContext.currentColors.contentbar.tabs.backgroundHoverColor;
  const tabBackgroundActiveColor =
    colorSettingsContext.currentColors.contentbar.tabs.backgroundActiveColor;
  const textDefaultColor =
    colorSettingsContext.currentColors.contentbar.tabs.textDefaultColor;
  const textHoverColor =
    colorSettingsContext.currentColors.contentbar.tabs.textHoverColor;
  const textActiveColor =
    colorSettingsContext.currentColors.contentbar.tabs.textActiveColor;
  const iconDefaultColor =
    colorSettingsContext.currentColors.contentbar.tabs.iconDefaultColor;
  const iconHoverColor =
    colorSettingsContext.currentColors.contentbar.tabs.iconHoverColor;
  const iconActiveColor =
    colorSettingsContext.currentColors.contentbar.tabs.iconActiveColor;

  const tabState = {
    isActive: !!props.selected,
    isHovering: hovering,
    isDisabled: false,
  };

  const name =
    typeof props.displayName === "string"
      ? props.displayName
      : props.displayName(translationFunction);

  const tabStyle = {
    cursor: props.selected ? "default" : "pointer",
    backgroundColor: determineCurrentColor(tabState, {
      defaultColor: tabBackgroundDefaultColor,
      hoverColor: tabBackgroundHoverColor,
      activeColor: tabBackgroundActiveColor,
    }),
    color: determineCurrentColor(tabState, {
      defaultColor: textDefaultColor,
      hoverColor: textHoverColor,
      activeColor: textActiveColor,
    }),
    height: `${DEFAULT_ELEMENTSIZE}px`,
    width: `${props.width}px`,
    alignItems: "center",
    borderRight:
      "1px solid " + (colorSettingsContext?.darkmode ? GREY5 : WHITE),
  };

  const closingIconStyle = {
    color: determineCurrentColor(tabState, {
      defaultColor: iconDefaultColor,
      hoverColor: iconHoverColor,
      activeColor: iconActiveColor,
    }),
    marginRight: "8px",
  };

  const handleOnCloseEvent = (e: any) => {
    e.stopPropagation();
    if (props.onClose) {
      props.onClose(props.id, props.idOfFirstElement);
    }
  };

  const handleOnClickEvent = () => {
    if (props.onClick) {
      props.onClick(props.id);
    }
  };

  const identifier = generateHashOfLength(4);
  const identifierLegal = "a" + identifier;
  const identifierWithDot = "." + identifierLegal;

  return (
    <>
      <div
        className={"flex align-items-center element-hover"}
        style={tabStyle}
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
        onClick={handleOnClickEvent}
      >
        {props.displayName.length >= 20 ? (
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            className={identifierLegal}
          >
            <span className={"m-auto font-semibold "}>
              {name.slice(0, 20) + "..."}
            </span>
            <Tooltip
              id="change-color"
              content={name}
              target={identifierWithDot}
            />
          </div>
        ) : (
          <div className={"m-auto font-semibold "}>{name}</div>
        )}
        {props.closable === true ? (
          <div style={{position: "absolute", right: "5px"}}>
            <i
              onClick={(event) => handleOnCloseEvent(event)}
              style={closingIconStyle}
              className="pi pi-times tabelements-only"
            />
          </div>
        ) : (
          <></>
        )}
      </div>
    </>
  );
};

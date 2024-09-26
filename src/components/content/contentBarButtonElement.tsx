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
import {ColorSettingsContext} from "../../contexts/colorsettings";
import {DEFAULT_ELEMENTSIZE} from "../../constants";

export interface Props {
  handleOnClickEvent: () => void;
  icon: string;
  isVisible?: boolean;
}

export const ContentBarButtonElement = ({
  handleOnClickEvent,
  icon,
  isVisible,
}: Props) => {
  const [hover, setHover] = useState(false);
  const colorSettingsContext = useContext(ColorSettingsContext);

  const buttonDefaultColor =
    colorSettingsContext.currentColors.contentbar.buttonDefaultColor;
  const buttonHoverColor =
    colorSettingsContext.currentColors.contentbar.buttonHoverColor;
  const iconDefaultColor =
    colorSettingsContext.currentColors.contentbar.iconDefaultColor;
  const iconHoverColor =
    colorSettingsContext.currentColors.contentbar.iconHoverColor;

  return isVisible === true ? (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={handleOnClickEvent}
      style={{
        height: `${DEFAULT_ELEMENTSIZE}px`,
        width: `${DEFAULT_ELEMENTSIZE}px`,
        cursor: "pointer",
        backgroundColor: hover ? buttonHoverColor : buttonDefaultColor,
      }}
      className="flex justify-content-center align-items-center"
    >
      <i
        className={icon}
        style={{
          color: hover ? iconHoverColor : iconDefaultColor,
        }}
      />
    </div>
  ) : (
    <></>
  );
};

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
import {GeneralGroupTabProps} from "./typesTabGroup";
import {SvgIcon} from "../svgIcon";

import "./tabGroupUnfolded.css";
import {DefaultIcon} from "../defaultIcon";

interface AdditionalProps {
  colors: {
    iconColor: string;
    arrowColor: string;
  };
}

export const TabGroupUnfolded = (
  props: GeneralGroupTabProps & AdditionalProps,
) => {
  return (
    <div className="default-nav-element-unfolded default-nav-group-unfolded flex h-full w-full">
      <div className="unfolded-group-wrapper">
        {props.logo ? (
          <SvgIcon color={props.colors.iconColor} element={props.logo} />
        ) : (
          <DefaultIcon color={props.colors.iconColor} />
        )}
        <div className="unfolded-group-name-arrow-wrapper">
          <span id="navbar-tab-name">{props.name}</span>
          <i
            style={{
              cursor: "pointer",
              fontSize: "16px",
              color: props.colors.arrowColor,
            }}
            className={
              props.groupTabCollapsed
                ? "pi pi-chevron-left"
                : "pi pi-chevron-down"
            }
          />
        </div>
      </div>
    </div>
  );
};

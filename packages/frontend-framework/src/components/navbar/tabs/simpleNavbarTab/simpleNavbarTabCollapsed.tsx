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

import React, {useRef} from "react";
import {SvgIcon} from "../svgIcon";
import {Tooltip} from "primereact/tooltip";
import {NestedNavbarTabProps} from "./simpleNavbarTab";
import "../tabs.css";
import makeStyles from "../../../content/style_options/makeStyles";
import {DefaultIcon} from "../defaultIcon";

const useStyles = makeStyles(({iconColor}) => ({
  icon: {
    color: iconColor,
  },
}));

export const SimpleNavbarTabCollapsed = (props: NestedNavbarTabProps) => {
  const ref = useRef<HTMLDivElement>(null);

  const {classes} = useStyles({iconColor: props.iconColor});

  let className =
    "default-nav-element-collapsed default-tab-collapsed flex align-items-center justify-content-center";

  if (props.additionalClassNames) {
    className += props.additionalClassNames;
  }

  return (
    <div
      ref={ref}
      onMouseEnter={() => props.setHovering(true)}
      onMouseLeave={() => props.setHovering(false)}
      className={className}
      style={props.style}
    >
      {props.icon ? (
        <SvgIcon color={props.iconColor} element={props.icon} />
      ) : (
        <DefaultIcon color={props.iconColor} />
      )}
      <Tooltip content={props.name} target={ref} id="hover-image" />
    </div>
  );
};

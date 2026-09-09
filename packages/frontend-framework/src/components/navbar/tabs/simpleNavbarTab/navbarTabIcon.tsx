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

import React, {ReactElement} from "react";
import {DefaultIcon} from "../defaultIcon";
import {SvgIcon} from "../svgIcon";
import {NavbarTabAnimationOptions} from "../typesNavbarTab";

interface Props {
  icon?: ReactElement;
  iconColor: string;
  dataTestId?: string;
  animation?: NavbarTabAnimationOptions;
}

export const NavbarTabIcon = (props: Props) => {
  const icon = props.icon ? (
    <SvgIcon
      dataTestId={props.dataTestId}
      color={props.iconColor}
      element={props.icon}
    />
  ) : (
    <DefaultIcon dataTestId={props.dataTestId} color={props.iconColor} />
  );

  if (!props.animation || props.animation.type !== "pulse") {
    return icon;
  }

  const duration = Math.max(300, props.animation.duration ?? 1800);

  return (
    <span
      className="navbar-tab-icon-pulse"
      style={
        {
          "--navbar-tab-pulse-color": props.animation.color ?? "#fff3a3",
          "--navbar-tab-pulse-duration": `${duration}ms`,
        } as React.CSSProperties
      }
    >
      {icon}
    </span>
  );
};

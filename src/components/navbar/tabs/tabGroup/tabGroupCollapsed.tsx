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

import React, {useRef} from "react";
import {Tooltip} from "primereact/tooltip";
import {GeneralGroupTabProps} from "./typesTabGroup";

interface AdditionalProps {
  colors: {
    arrowColor: string;
  };
}

export const TabGroupCollapsed = (
  props: GeneralGroupTabProps & AdditionalProps,
) => {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={ref}
      className="default-nav-element-collapsed default-nav-group-collapsed w-full flex align-items-center"
      style={{width: "100%"}}
    >
      <i
        style={{
          cursor: "pointer",
          fontSize: "16px",
          color: props.colors.arrowColor,
        }}
        className={
          props.groupTabCollapsed ? "pi pi-chevron-left" : "pi pi-chevron-down"
        }
      />
      <Tooltip content={props.name} target={ref} id="hover-image" />
    </div>
  );
};

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

import React, {useContext} from "react";
import {ColorSettingsContext} from "../../contexts/colorsettings";
import {ImprintText} from "./imprintText";
import "../css/globalColors.css";

export const DefaultImprint = () => {
  const colorSettingsContext = useContext(ColorSettingsContext);

  return (
    <div
      className={
        (colorSettingsContext?.darkmode ? "bg-black" : "bg-grey-1") +
        " flex p-3"
      }
      style={{
        height: "100%",
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        className={
          (colorSettingsContext?.darkmode
            ? "bg-grey-5 color-white"
            : "bg-white-1 color-black") + " flex p-3"
        }
        style={{
          height: "100%",
          width: "100%",
        }}
      >
        <ImprintText />
      </div>
    </div>
  );
};

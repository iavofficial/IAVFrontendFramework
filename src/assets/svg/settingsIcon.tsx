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

interface Props {
  fill: string;
}

const SettingsIcon: React.FC<Props> = (props) => {
  const {fill} = props;

  return (
    <svg
      id="B-icon_settings"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <rect id="Rechteck_309" width="24" height="24" fill="none" />
      <path
        id="settings_FILL1_wght300_GRAD0_opsz24"
        d="M9.7,21.5l-.4-3.05a3.7,3.7,0,0,1-.812-.375,7.621,7.621,0,0,1-.763-.525L4.9,18.75l-2.3-4L5.05,12.9a2.745,2.745,0,0,1-.062-.45q-.013-.225-.013-.45,0-.2.013-.425A3.332,3.332,0,0,1,5.05,11.1L2.6,9.25,4.9,5.275,7.725,6.45a6.34,6.34,0,0,1,.763-.512A5.461,5.461,0,0,1,9.3,5.55L9.7,2.5h4.6l.4,3.05a5.679,5.679,0,0,1,.812.387,6.255,6.255,0,0,1,.738.513L19.1,5.275,21.4,9.25l-2.475,1.875a2.317,2.317,0,0,1,.05.45V12q0,.2-.013.412a4.034,4.034,0,0,1-.062.488l2.45,1.85-2.3,4-2.8-1.2a6.251,6.251,0,0,1-.762.525,5.233,5.233,0,0,1-.788.375l-.4,3.05ZM12,15a2.988,2.988,0,0,0,3-3,2.988,2.988,0,0,0-3-3,2.988,2.988,0,0,0-3,3,2.988,2.988,0,0,0,3,3Z"
        fill={fill}
      />
    </svg>
  );
};

export default SettingsIcon;

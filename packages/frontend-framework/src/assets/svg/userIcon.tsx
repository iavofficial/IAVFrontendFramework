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

import React from "react";

interface Props {
  fill: string;
}

const UserIcon: React.FC<Props> = (props) => {
  const {fill} = props;

  return (
    <svg
      id="B-icon_user"
      xmlns="http://www.w3.org/2000/svg"
      width="31.666"
      height="31.666"
      viewBox="0 0 31.666 31.666"
    >
      <path
        id="account_circle_FILL1_wght300_GRAD0_opsz40"
        d="M9.792,29.25a21.887,21.887,0,0,1,4.854-2.458A15.975,15.975,0,0,1,20,25.917a15.975,15.975,0,0,1,5.354.875,21.887,21.887,0,0,1,4.854,2.458,14.546,14.546,0,0,0,2.646-4.292A13.493,13.493,0,0,0,33.75,20,13.588,13.588,0,0,0,20,6.25,13.588,13.588,0,0,0,6.25,20a13.493,13.493,0,0,0,.9,4.958A14.546,14.546,0,0,0,9.792,29.25ZM20,21.042A5.221,5.221,0,0,1,16.188,19.5a5.168,5.168,0,0,1-1.563-3.833,5.119,5.119,0,0,1,1.563-3.792A5.221,5.221,0,0,1,20,10.333a5.337,5.337,0,0,1,5.375,5.375A5.119,5.119,0,0,1,23.812,19.5,5.221,5.221,0,0,1,20,21.042Zm0,14.791a15.446,15.446,0,0,1-6.188-1.25,16.055,16.055,0,0,1-5.041-3.4A15.817,15.817,0,0,1,5.4,26.167,15.523,15.523,0,0,1,4.167,20a15.439,15.439,0,0,1,1.25-6.187,15.8,15.8,0,0,1,3.4-5.021,16.294,16.294,0,0,1,5.021-3.375A15.3,15.3,0,0,1,20,4.167a15.446,15.446,0,0,1,6.188,1.25,15.726,15.726,0,0,1,8.4,8.4A15.439,15.439,0,0,1,35.833,20a15.3,15.3,0,0,1-1.25,6.167,16.294,16.294,0,0,1-3.375,5.021,15.8,15.8,0,0,1-5.02,3.4A15.446,15.446,0,0,1,20,35.833Z"
        transform="translate(-4.167 -4.167)"
        fill={fill}
      />
    </svg>
  );
};

export default UserIcon;

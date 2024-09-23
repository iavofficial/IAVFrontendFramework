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
import {Route} from "react-router";
import {generateHash} from "../../../utils/hash";

/**
 * This class is the base for all simple content wrappers.
 */
export class ContentWrapperGeneralization {
  constructor(
    protected _path: string,
    protected _component: React.ComponentType<any>,
  ) {}

  // Generate unique key based on the view's url.
  getKey = () => {
    return generateHash(this._path);
  };

  getRoutes = () => {
    return [
      <Route
        key={this.getKey()}
        path={`${this._path}*`}
        element={<this._component />}
      />,
    ];
  };
}

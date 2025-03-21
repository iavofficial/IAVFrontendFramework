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

import {useLocation as useLocationReactRouter} from "react-router";
import {RouterModule} from "../../../types/modules/router/routerModule";
import {UILayerRouter} from "./components/uiLayerRouter";
import {MainViewRouter} from "./components/mainViewRouter";
import {Link} from "./components/link";

export class ReactRouterRouter implements RouterModule {
  public UiLayerRouter;
  public MainViewRouter;
  public Link;
  public useLocation;
  public useIsTabActive;

  constructor() {
    this.UiLayerRouter = UILayerRouter;
    this.MainViewRouter = MainViewRouter;
    this.Link = Link;

    this.useLocation = () => {
      const location = useLocationReactRouter();
      return {
        pathName: location.pathname,
      };
    };

    this.useIsTabActive = (tabPath: string) => {
      const location = this.useLocation();

      let regexString = tabPath;
      // Escape slashes
      regexString = regexString.replaceAll("/", "\\/");
      // Add start (^) and boundary condition with trailing /.*
      regexString = `^${regexString}(\\/.*)?$`;

      const regex = new RegExp(regexString);

      let isActive = regex.test(location.pathName);

      return {
        isActive,
      };
    };
  }
}

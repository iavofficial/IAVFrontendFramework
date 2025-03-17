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

import {PropsWithChildren, ReactElement} from "react";
import {FFModule} from "../generalModule";

export type BasicRoute = {
  path: string;
  element: ReactElement;
  disabled?: boolean;
  key?: string;
} & Record<string, unknown>;

export type LinkProps = PropsWithChildren<
  {
    to: string;
    style: Record<string, unknown>;
    target?: string;
  } & Record<string, unknown>
>;

export type UILayerRouterProps = {
  routes: BasicRoute[];
  initialPath: string;
  disableLogin: boolean;
};

export type MainViewRouterProps = {
  routes: BasicRoute[];
};

export type useLocationType = () => {
  pathName: string;
};

export type useIsTabActiveType = (tabPath: string) => {
  isActive: boolean;
};

export type RouterModule = {
  UiLayerRouter: React.ComponentType<UILayerRouterProps>;
  MainViewRouter: React.ComponentType<MainViewRouterProps>;
  Link: React.ComponentType<LinkProps>;
  useLocation: useLocationType;
  useIsTabActive: useIsTabActiveType;
} & FFModule;

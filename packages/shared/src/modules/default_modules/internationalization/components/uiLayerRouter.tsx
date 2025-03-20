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
import {Fragment} from "react/jsx-dev-runtime";
import {useEffect} from "react";
import {Route, Routes, useLocation, useNavigate} from "react-router";
import {generateHash} from "../../../../utils/hash";
import {useDefaultSelector} from "../../../module_orchestration/moduleDefaults";
import {BrowserRouter} from "react-router-dom";
import {UILayerRouterProps} from "../../../../types/modules/router/routerModule";

export const UILayerRouter = (props: UILayerRouterProps) => {
  const enabledRoutes = props.routes.filter((route) => !route.disabled);
  return (
    <BrowserRouter>
      <Redirector
        initialPath={props.initialPath}
        disableLogin={props.disableLogin}
      />

      <Routes>
        {enabledRoutes.map((route) => (
          <Route
            key={route.key ?? generateHash(route.path)}
            path={route.path}
            element={route.element}
          />
        ))}
      </Routes>
    </BrowserRouter>
  );
};

interface RedirectorProps {
  initialPath: string;
  disableLogin?: boolean;
}

/**
 * This component is needed because the useLocation hook can only be used inside a Router-component
 * environment.
 * @param props
 * @constructor
 */
const Redirector = (props: RedirectorProps) => {
  const {hasAuthenticated} = useDefaultSelector((state) => state.auth);

  const disableLogin = props.disableLogin;

  const currentPath = useLocation().pathname;
  const navigate = useNavigate();

  useEffect(() => {
    if (!hasAuthenticated) {
      if (currentPath !== "/documents") {
        navigate("/login");
      }
    } else {
      if (currentPath === "/login" || currentPath === "/") {
        navigate(props.initialPath.valueOf());
      }
    }
  }, [
    disableLogin,
    currentPath,
    hasAuthenticated,
    navigate,
    props.initialPath,
  ]);

  return <Fragment />;
};

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
import {FunctionComponent} from "react";

export type PathRoute = {
    path: string;
    label: string;
    element: FunctionComponent;
    isNew?: boolean;
};

export type GroupRoute = {
    title: string;
    routes: PathRoute[];
    isNew?: boolean;
};

export const mergeRoutes = (
    ...routeGroups: (PathRoute[] | GroupRoute[])[]
): PathRoute[] => {
    return routeGroups.flatMap((group) =>
        group.flatMap((route) => (isGroupRoute(route) ? route.routes : [route])),
    );
};

const isGroupRoute = (route: PathRoute | GroupRoute): route is GroupRoute => {
    return (route as GroupRoute).routes !== undefined;
};

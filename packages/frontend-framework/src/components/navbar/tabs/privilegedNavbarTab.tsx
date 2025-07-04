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

import React, {useContext} from "react";
import {AuthContext} from "../../../contexts/auth";
import {containsOneOrMoreGroups} from "../../../utils/groupChecker";
import {SimpleNavbarTab} from "./simpleNavbarTab/simpleNavbarTab";
import {GroupableNavbarTab, NavbarTabProps} from "./typesNavbarTab";
import {InjectedOptionsGroupableByWrapperToTab} from "../types/typesInjectedOptions";

export interface Props {
  permittedGroups: string[];
}

export const PrivilegedNavbarTab: GroupableNavbarTab<Props> = (
  props: NavbarTabProps<InjectedOptionsGroupableByWrapperToTab> & Props,
) => {
  const authContext = useContext(AuthContext);
  const permitted = containsOneOrMoreGroups(
    authContext?.getUserGroups() ?? [],
    props.permittedGroups,
  );
  return permitted ? (
    <SimpleNavbarTab
      icon={props.icon}
      disabled={props.disabled}
      name={props.name}
      frameworkInjectedOptions={props.frameworkInjectedOptions}
    />
  ) : (
    <></>
  );
};

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
import {ComponentTypeMinProps} from "../../../types/typesReact";
import {SimpleNavbarTab} from "../tabs/simpleNavbarTab/simpleNavbarTab";
import {InjectedOptionsObject} from "../types/typesInjectedOptions";

export const generalizedTabFactoryFactory = <OptionType,>(
  NavbarTabComponent: ComponentTypeMinProps<InjectedOptionsObject<OptionType>>,
) => {
  return (
    tabProps: Omit<
      React.ComponentProps<typeof SimpleNavbarTab>,
      "frameworkInjectedOptions"
    >,
  ) => {
    //eslint-disable-next-line
    return (props: {frameworkInjectedOptions: OptionType}) => {
      return (
        <NavbarTabComponent
          frameworkInjectedOptions={props.frameworkInjectedOptions}
          {...tabProps}
        />
      );
    };
  };
};

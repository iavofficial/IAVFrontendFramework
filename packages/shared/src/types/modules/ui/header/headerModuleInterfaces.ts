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

import {ReactElement} from "react";
import {SettingsMenuOptions} from "../../../../modules/default_modules/ui/header/components/settingsMenu";
import {UserMenuOptions} from "../../../../modules/default_modules/ui/header/components/userMenu";

export interface HeaderOptions {
  reactElementRight?: ReactElement;
  reactElementLeft?: ReactElement;
  hideLeft?: boolean;
  hideRight?: boolean;
  userIcon?: ReactElement;
  hideUserIcon?: boolean;
  headerElements?: ReactElement[];
}

export interface UIHeaderProps {
  headerOptions?: HeaderOptions;
  settingsMenuOptions?: SettingsMenuOptions;
  userMenuOptions?: UserMenuOptions;
}

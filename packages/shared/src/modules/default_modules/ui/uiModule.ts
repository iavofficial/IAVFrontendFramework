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

import {HeaderOrchestrator} from "./header/headerOrchestrator";
import {ContentWithBarOrchestrator} from "./contentWithBar/contentWithBarOrchestrator";
import {CookieBannerOrchestrator} from "./cookieBanner/cookieBannerOrchestrator";
import {UIModule} from "../../../types/modules/ui/uiModuleInterfaces";
import {NavbarOrchestrator} from "./navbar/navbarOrchestrator";

export class DefaultUIModule implements UIModule {
  public UiLayerHeader;
  public UiLayerContentWithBar;
  public UiLayerCookieBanner;
  public UILayerNavbar;

  constructor() {
    this.UiLayerHeader = HeaderOrchestrator;
    this.UiLayerContentWithBar = ContentWithBarOrchestrator;
    this.UiLayerCookieBanner = CookieBannerOrchestrator;
    this.UILayerNavbar = NavbarOrchestrator;
  }
}

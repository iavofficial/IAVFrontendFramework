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

import Page from '../../../common/page/page';
import { ModuleProfile } from '../../../common/page/text/module/moduleProfile';
import Text from '../../../common/page/text/text';
import Title from '../../../common/page/text/title';
import React from 'react';

const PageDefaultCookieBanner: React.FC = () => (
  <Page>
    <Title>UICookieBanner</Title>
    <ModuleProfile
      moduleKey='cookieBanner'
      isDefaultModule
      shortDescription='This module provides the default cookie consent banner following the required contract.'
    />
    <Text>
      As the default Cookie Banner module, this implementation provides the
      required <i>UiLayerCookieBanner</i> component as outlined on the general
      structure page.
    </Text>
  </Page>
);

export default PageDefaultCookieBanner;

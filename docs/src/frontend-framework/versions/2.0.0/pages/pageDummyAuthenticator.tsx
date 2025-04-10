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

import Page from "../../../common/page/page";
import Title from "../../../common/page/text/title";
import Text from "../../../common/page/text/text";
import { ModuleProfile } from "../../../common/page/text/module/moduleProfile";
import React from "react";

const DESCRIPTION = `The DummyAuthenticator module is a place holder for real
authentication. By using this default implementation you can begin developing
your application while you don't have to provide an authentication implementation
from the start. This is useful for presentations early in the project as the user
still has to authenticate and thus creating the impression of how the interaction
will be designed later on.`;

const PageDummyAuthenticator: React.FC = () => {
  return (
    <Page>
      <Title>DummyAuthenticator</Title>
      <ModuleProfile
        moduleKey="auth"
        isDefaultModule
        shortDescription={DESCRIPTION}
      />
      <Text>
        Hint: This module provides only the necessary state values and methods.
      </Text>
    </Page>
  );
};

export default PageDummyAuthenticator;

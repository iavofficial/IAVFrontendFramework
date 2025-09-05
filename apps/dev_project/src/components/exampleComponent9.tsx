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

import { generateHashOfLength } from "@iavofficial/frontend-framework/hash";
import { useModule } from "@iavofficial/frontend-framework/moduleContext";
import { MandatoryModuleNames } from "@iavofficial/frontend-framework-shared/moduleNames";
import { CustomContentbarWrapper } from "@iavofficial/frontend-framework/customContentbarWrapper";
import React, { useState } from "react";
import { Typography } from "antd";

export const ExampleComponent9 = () => {
  const contentWithBarModule = useModule(
    MandatoryModuleNames.UI,
  ).UiLayerContentWithBar;
  const ContentWithBar = contentWithBarModule.UiLayerContentWithBar;

  const initialTabs: CustomContentbarWrapper[] = [];
  let initialId = "";
  for (let i = 0; i < 3; i++) {
    const id = generateHashOfLength(6);
    if (i === 0) initialId = id;
    initialTabs.push(
      new CustomContentbarWrapper(
        id,
        <div style={{ padding: 8, minWidth: 75 }}>Tab {i + 1}</div>,
        (
          <div key={id}>
            <h1>Content for tab {i + 1}</h1>
            <Typography>
              This is a minimalistic example of how to use the ContentWithBar
              module.
            </Typography>
          </div>
        ),
      ),
    );
  }
  const [tabs] = useState<CustomContentbarWrapper[]>(initialTabs);
  const [selectedId, setSelectedId] = useState(initialId);

  return (
    <ContentWithBar
      contentWrappers={tabs}
      selectedId={selectedId}
      onSelect={setSelectedId}
    />
  );
};

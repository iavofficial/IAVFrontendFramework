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
import { Button, Space, Tag, Typography } from "antd";
import { useModule } from "@iavofficial/frontend-framework/moduleContext";
import { MandatoryModuleNames } from "@iavofficial/frontend-framework-shared/moduleNames";

export const ExampleComponent10 = () => {
  const Header = useModule(MandatoryModuleNames.UI).UILayerHeader;

  if (!Header) {
    return (
      <div style={{ padding: 16 }}>
        <Typography.Title level={4}>
          Header-Modul nicht gefunden
        </Typography.Title>
        <Typography.Paragraph>
          Prüfe, ob das Header-Modul korrekt registriert ist und{" "}
          <code>UILayerHeader</code> exportiert.
        </Typography.Paragraph>
      </div>
    );
  }

  const headerOptions = {
    reactElementLeft: (
      <Space size={8}>
        <Tag>IAV</Tag>
        <Typography.Text strong>Frontend Framework</Typography.Text>
      </Space>
    ),
    headerElements: [
      <Typography.Text key="title">Demo Header</Typography.Text>,
    ],
    reactElementRight: (
      <Space>
        <Button type="link">Docs</Button>
        <Button type="primary">Primary</Button>
      </Space>
    ),
  };

  const settingsMenuOptions = {
    items: [
      { key: "prefs", label: "Preferences" },
      { key: "help", label: "Help" },
    ],
  };

  const userMenuOptions = {
    items: [
      { key: "profile", label: "Profile" },
      { key: "logout", label: "Logout" },
    ],
  };

  /*
  TODO
  settingsMenuOptions={settingsMenuOptions}
  userMenuOptions={userMenuOptions}
  */
  return (
    <div>
      <Header
        headerOptions={headerOptions}
      />
      <div style={{ padding: 16 }}>
        <Typography.Title level={2}>Example Component 10</Typography.Title>
        <Typography.Paragraph>
          Dieses Beispiel zeigt den Header mit einfachem Seiteninhalt.
        </Typography.Paragraph>
      </div>
    </div>
  );
};

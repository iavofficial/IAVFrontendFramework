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
import { Layout, Button } from "antd";
import { UICookieBannerProps } from "@iavofficial/frontend-framework-shared/uiModuleInterfaces";

const { Footer } = Layout;

export const AntDesignCookieBanner: React.FC<UICookieBannerProps> = ({
  header,
  message,
  acceptButtonLabel,
  onAccept,
  visible,
  styles,
  darkMode,
}) => {
  if (!visible) return null;

  return (
    <Footer
      style={{
        backgroundColor: darkMode ? "#001529" : "#f0f2f5",
        color: darkMode ? "#fff" : "#000",
        textAlign: "center",
        ...styles?.dialog,
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div>
          {header && (
            <div style={{ fontWeight: 600, marginBottom: 4 }}>{header}</div>
          )}
          <span>{message}</span>
        </div>
        <Button type="primary" onClick={onAccept} style={{ ...styles?.button }}>
          {acceptButtonLabel}
        </Button>
      </div>
    </Footer>
  );
};

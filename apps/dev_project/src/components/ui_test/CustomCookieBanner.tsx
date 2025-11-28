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
import { Button, Space, theme, Typography } from "antd";
import { UICookieBannerProps } from "@iavofficial/frontend-framework-shared/cookieBannerModuleInterfaces";

export const CustomCookieBanner = (props: UICookieBannerProps) => {
  const { header, message, acceptButtonLabel, visible, onAccept, styles } =
    props;
  const { token } = theme.useToken();

  if (!visible) return null;

  /*
  TODO
  aria-label={header ?? "Cookie Hinweis"}
  */
  return (
    <div
      role="region"
      style={{
        position: "fixed",
        left: 16,
        right: 16,
        bottom: 16,
        padding: 12,
        background: styles?.backgroundColor ?? token.colorBgElevated,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: 12,
        zIndex: 9999,
      }}
    >
      <Space direction="vertical" size={0} style={{ lineHeight: 1.3 }}>
        <Typography.Text strong>{header ?? "Cookies"}</Typography.Text>
        <Typography.Text>{message ?? "Wir verwenden Cookies."}</Typography.Text>
      </Space>

      <Button
        type="primary"
        aria-label={acceptButtonLabel ?? "Cookies akzeptieren"}
        onClick={onAccept}
      >
        {acceptButtonLabel ?? "OK"}
      </Button>
    </div>
  );
};

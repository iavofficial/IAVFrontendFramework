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
import type { MenuProps } from "antd";
import { Avatar, Button, Dropdown, Layout, Space } from "antd";
import { SettingOutlined, UserOutlined } from "@ant-design/icons";
import { UIHeaderProps } from "@iavofficial/frontend-framework-shared/headerModuleInterfaces";

const { Header } = Layout;
type AnyMenuOptions = {
  items?: {
    key: string;
    label: React.ReactNode;
    onClick?: () => void;
    children?: AnyMenuOptions["items"];
  }[];
  onOpenChange?: (openKeys: string[]) => void;
  onItemClick?: (key: string) => void;
};

const toAntdItems = (opts?: AnyMenuOptions): MenuProps["items"] =>
  opts?.items?.map((it) => ({
    key: it.key,
    label: (
      <span
        onClick={(e) => {
          e.stopPropagation();
          it.onClick?.();
          (opts as AnyMenuOptions)?.onItemClick?.(it.key);
        }}
      >
        {it.label}
      </span>
    ),
    children: toAntdItems({ items: it.children }),
  }));

export const AntDesignHeader: React.FC<UIHeaderProps> = ({
  headerOptions,
  settingsMenuOptions,
  userMenuOptions,
}) => {
  const left = headerOptions?.reactElementLeft;
  const right = headerOptions?.reactElementRight;
  const userIcon = headerOptions?.userIcon ?? (
    <Avatar icon={<UserOutlined />} size="small" />
  );
  const settingsItems = toAntdItems(
    settingsMenuOptions as unknown as AnyMenuOptions,
  );
  const userItems = toAntdItems(userMenuOptions as unknown as AnyMenuOptions);

  return (
    <Header
      style={{
        position: "relative",
        width: "100%",
        zIndex: 1000,
        display: "flex",
        alignItems: "center",
        padding: "0 16px",
        background: "#fff",
        boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
        gap: 16,
      }}
    >
      {!headerOptions?.hideLeft && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            minWidth: 0,
          }}
        >
          {left}
        </div>
      )}

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          flex: 1,
          overflow: "hidden",
        }}
      >
        {headerOptions?.headerElements?.map((el, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center" }}>
            {el}
          </div>
        ))}
      </div>

      {!headerOptions?.hideRight && (
        <Space align="center" size={8} style={{ flex: "0 0 auto" }}>
          {right}
          {settingsItems && settingsItems.length > 0 && (
            <Dropdown
              menu={{ items: settingsItems }}
              trigger={["click"]}
              placement="bottomRight"
            >
              <Button type="text" icon={<SettingOutlined />} />
            </Dropdown>
          )}
          {!headerOptions?.hideUserIcon &&
            (userItems && userItems.length > 0 ? (
              <Dropdown
                menu={{ items: userItems }}
                trigger={["click"]}
                placement="bottomRight"
              >
                <span style={{ cursor: "pointer" }}>{userIcon}</span>
              </Dropdown>
            ) : (
              <span>{userIcon}</span>
            ))}
        </Space>
      )}
    </Header>
  );
};

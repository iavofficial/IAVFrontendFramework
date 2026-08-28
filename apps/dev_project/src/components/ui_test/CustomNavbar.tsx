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

import { Button, Layout, Space, theme, Typography } from "antd";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { UINavbarProps } from "@iavofficial/frontend-framework-shared/navbarModuleInterfaces";

const { Sider } = Layout;

export const CustomNavbar = ({
  items,
  bottomItems = [],
  legalLinks = [],
  collapsed,
  collapsible,
  onToggleCollapse,
  colors,
  dims,
  arrowClassName,
}: UINavbarProps) => {
  const { token } = theme.useToken();

  return (
    <Sider
      collapsible={collapsible}
      collapsed={collapsed}
      trigger={null}
      width={dims.unfoldedWidth}
      collapsedWidth={dims.collapsedWidth}
      style={{
        background: colors.navbarBg ?? token.colorBgContainer,
        padding: collapsed ? dims.paddingCollapsed : dims.paddingUnfolded,
        overflow: "auto",
        borderRight: `1px solid ${token.colorBorderSecondary}`,
        display: "flex",
        flexDirection: "column",
        gap: 8,
      }}
    >
      {collapsible && (
        <Button
          type="text"
          onClick={onToggleCollapse}
          className={arrowClassName}
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          style={{
            alignSelf: "flex-end",
            marginBottom: 8,
          }}
        />
      )}

      <Space direction="vertical" size={6} style={{ width: "100%" }}>
        {items.map((node, i) => (
          <div key={i}>{node}</div>
        ))}
      </Space>

      {!!bottomItems.length && (
        <Space
          direction="vertical"
          size={6}
          style={{ width: "100%", marginTop: "auto" }}
        >
          {bottomItems.map((node, i) => (
            <div key={i}>{node}</div>
          ))}
        </Space>
      )}

      {!!legalLinks.length && (
        <Space
          direction="vertical"
          size={4}
          style={{
            marginTop: bottomItems.length ? 8 : "auto",
            color: colors.legalLink ?? token.colorTextSecondary,
          }}
        >
          {legalLinks.map((linkNode, i) => (
            <Typography.Text key={i}>{linkNode}</Typography.Text>
          ))}
        </Space>
      )}
    </Sider>
  );
};

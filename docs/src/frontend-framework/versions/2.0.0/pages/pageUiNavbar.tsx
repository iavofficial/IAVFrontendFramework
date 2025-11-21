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
import Page from "../../../common/page/page";
import Title from "../../../common/page/text/title";
import SubTitle from "../../../common/page/text/subTitle";
import Text from "../../../common/page/text/text";
import Code from "../../../common/page/utils/code";

const PageUiNavbar: React.FC = () => (
  <Page>
    <Title>Navbar</Title>

    <Text>
      The UI module uses a navbar orchestrator that wires framework state, color
      settings and routing to a UI component. You can replace the default
      implementation by providing your own <code>UINavbar</code> component.
    </Text>

    <SubTitle>Props</SubTitle>
    <Text>
      Custom navbar components must implement the following{" "}
      <code>UINavbarProps</code> interface:
    </Text>

    <Code language="typescript">{`export interface UINavbarProps {
  items: React.ReactNode[];
  legalLinks?: React.ReactNode[];
  collapsed: boolean;
  collapsible: boolean;
  onToggleCollapse: () => void;
  colors: {
    navbarBg: string;
    legalLink: string;
    collapseArrow: string;
    scrollbar: string;
  };
  dims: {
    collapsedWidth: number;
    unfoldedWidth: number;
    paddingCollapsed: number;
    paddingUnfolded: number;
    paddingGab: number;
  };
  arrowClassName: string;
}`}</Code>

    <SubTitle>Default implementation</SubTitle>
    <Text>
      The default <code>UINavbar</code> implementation renders the main
      navigation items, optional legal links and a collapse/expand control. It
      uses the provided color and dimension settings from the UI module and
      keeps the collapsed state in sync with the framework store.
    </Text>

    <SubTitle>Custom implementation example</SubTitle>
    <Text>
      The following example shows a navbar implementation based on Ant Design
      that can be used as a custom <code>UINavbar</code> component:
    </Text>

    <Code title={"CustomNavbar.tsx"} language="tsx">{`import React from "react";
import { Button, Layout, Space, theme, Typography } from "antd";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { UINavbarProps } from "@iavofficial/frontend-framework-shared/navbarModuleInterfaces";

const { Sider } = Layout;

const CustomNavbar: React.FC<UINavbarProps> = ({
  items,
  legalLinks = [],
  collapsed,
  collapsible,
  onToggleCollapse,
  colors,
  dims,
  arrowClassName,
}) => {
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
        borderRight: \`1px solid \${token.colorBorderSecondary}\`,
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

      {!!legalLinks.length && (
        <Space
          direction="vertical"
          size={4}
          style={{
            marginTop: "auto",
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

export default CustomNavbar;`}</Code>

    <SubTitle>Registering the custom component</SubTitle>
    <Text>
      To use a custom navbar implementation, pass it to the UI module via{" "}
      <code>UILayerNavbar</code> when creating your modules:
    </Text>

    <Code
      title={"store.ts"}
      language="tsx"
    >{`import { UIModule } from "@iavofficial/frontend-framework-shared/uiModule";
import { MandatoryModuleNames } from "@iavofficial/frontend-framework/constants";
import { createModules } from "@iavofficial/frontend-framework/store";

import CustomNavbar from "./CustomNavbar";

const customModules = {
  [MandatoryModuleNames.UI]: new UIModule({
    UILayerNavbar: CustomNavbar,
  }),
};

export const modules = createModules(customModules);`}</Code>
  </Page>
);

export default PageUiNavbar;

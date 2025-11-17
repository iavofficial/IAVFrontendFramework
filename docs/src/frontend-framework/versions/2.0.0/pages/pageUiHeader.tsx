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

const PageUiHeader: React.FC = () => (
  <Page>
    <Title>Header</Title>

    <Text>
      The header is responsible for displaying application branding, user and
      settings menus and optional custom header elements. The UI module uses a
      header orchestrator that wires framework options and menus to a UI
      component. You can replace the default implementation by providing your
      own <code>UIHeader</code> component.
    </Text>

    <SubTitle>Header options and props</SubTitle>
    <Text>
      The header behavior and content is configured via{" "}
      <code>HeaderOptions</code> and <code>UIHeaderProps</code>.
    </Text>

    <Code language="typescript">{`export interface HeaderOptions {
  reactElementRight?: ReactElement;
  reactElementLeft?: ReactElement;
  hideLeft?: boolean;
  hideRight?: boolean;
  userIcon?: ReactElement;
  hideUserIcon?: boolean;
  headerElements?: ReactElement[];
}

export interface UIHeaderProps {
  headerOptions?: HeaderOptions;
  settingsMenuOptions?: SettingsMenuOptions;
  userMenuOptions?: UserMenuOptions;
}`}</Code>

    <Text>
      The header orchestrator chooses between the default implementation and an
      optional custom UI component:
    </Text>

    <Code language="typescript">{`export type HeaderOrchestratorProps = UIHeaderProps & {
  uiComponent?: React.ComponentType<UIHeaderProps>;
};

export const HeaderOrchestrator = (props: HeaderOrchestratorProps) => {
  const { uiComponent, ...uiProps } = props;
  const UI = uiComponent ?? UIHeader;
  return <UI {...uiProps} />;
};`}</Code>

    <SubTitle>Default implementation (overview)</SubTitle>
    <Text>
      The default <code>UIHeader</code> implementation:
    </Text>
    <ul>
      <li>uses the color settings context for background and icon colors</li>
      <li>renders an application logo on the left</li>
      <li>renders settings and user menus using PrimeReact context menus</li>
      <li>
        allows custom left/right elements and additional{" "}
        <code>headerElements</code>
      </li>
      <li>supports hiding the user icon and/or right section</li>
    </ul>

    <SubTitle>Custom implementation example</SubTitle>
    <Text>
      The following example shows a simple Ant Design based header
      implementation that can be used as a custom <code>UIHeader</code>{" "}
      component:
    </Text>

    <Code language="tsx">{`import React from "react";
import { Button, Layout, Space, theme, Typography } from "antd";
import { UIHeaderProps } from "@iavofficial/frontend-framework-shared/headerModuleInterfaces";

const { Header } = Layout;

const CustomHeader = (props: UIHeaderProps) => {
  const { token } = theme.useToken();

  return (
    <Header
      style={{
        height: 64,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 16px",
        borderBottom: \`1px solid \${token.colorBorderSecondary}\`,
        background: token.colorBgContainer,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        {props.headerOptions?.reactElementLeft ?? (
          <Typography.Text strong>App</Typography.Text>
        )}
      </div>

      <Space size={12}>
        {(props.headerOptions?.headerElements ?? []).map((el, i) => (
          <span key={i}>{el}</span>
        ))}
      </Space>

      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        {props.headerOptions?.reactElementRight ?? (
          <Button type="primary">Action</Button>
        )}
      </div>
    </Header>
  );
};

export default CustomHeader;`}</Code>

    <SubTitle>Registering the custom header</SubTitle>
    <Text>
      To use a custom header implementation, pass it to the UI module via{" "}
      <code>UILayerHeader</code> when creating your modules:
    </Text>

    <Code language="tsx">{`import { UIModule } from "@iavofficial/frontend-framework-shared/uiModule";
import { MandatoryModuleNames } from "@iavofficial/frontend-framework/constants";
import { createModules } from "@iavofficial/frontend-framework/store";

import CustomHeader from "./CustomHeader";

const customModules = {
  [MandatoryModuleNames.UI]: new UIModule({
    UILayerHeader: CustomHeader,
  }),
};

export const modules = createModules(customModules);`}</Code>
  </Page>
);

export default PageUiHeader;

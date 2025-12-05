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
import Table from "../../../common/page/utils/table";
import {
  MODULE_COMPONENT_TABLE_COLUMNS,
  MODULE_METHOD_TABLE_COLUMNS,
} from "../../../common/page/text/module/moduleTableColumns";

const PageGeneralUiModule: React.FC = () => (
  <Page>
    <Title>General structure of a UI module</Title>
    <Text>
      This page describes the general structure of a UI module. A UI module is
      responsible for orchestrating the main UI building blocks like header,
      navbar, content bar and cookie banner and for providing a small UI state
      and actions to control it.
    </Text>

    <SubTitle>State and store structure</SubTitle>
    <Text>
      The UI module adds its own slice of state to the global store and exposes
      helper actions to manipulate it.
    </Text>
    <Code language="typescript">{`export type UIState = {
  navbarCollapsed: boolean;
  collapsible: boolean;
};

export type UIStoreState = {
  [MandatoryModuleNames.UI]: UIState;
};`}</Code>

    <SubTitle>Necessary components</SubTitle>
    <Text>
      A UI module has to provide a set of components that are rendered inside
      the UI layer.
    </Text>
    <Table
      columns={MODULE_COMPONENT_TABLE_COLUMNS}
      data={[
        {
          name: "UILayerHeader",
          component_type: CodeUILayerHeaderType,
          description: `This component is responsible for rendering the header
          area. It orchestrates the header logic and can delegate the concrete
          rendering to the passed uiComponent.`,
        },
        {
          name: "UILayerContentBar",
          component_type: CodeUILayerContentBarType,
          description: `This component is responsible for rendering the content
          bar. It wires the content bar orchestrator with an optional
          uiComponent implementation.`,
        },
        {
          name: "UILayerCookieBanner",
          component_type: CodeUILayerCookieBannerType,
          description: `This component is responsible for rendering the cookie
          banner. It can wrap a concrete cookie banner implementation via the
          uiComponent prop.`,
        },
        {
          name: "UILayerNavbar",
          component_type: CodeUILayerNavbarType,
          description: `This component is responsible for rendering the navbar.
          It connects the navbar orchestrator with an optional uiComponent
          implementation.`,
        },
      ]}
    />

    <SubTitle>UI module type</SubTitle>
    <Text>
      All UI modules have to implement the following type. It combines the
      required UI components, the extras object and the store integration via
      <i>FFStoreModule</i>.
    </Text>
    <Code language="typescript">{`export type UIModuleType<TState extends UIState = UIState> = {
  UILayerHeader: React.ComponentType<
    UIHeaderProps & { uiComponent?: React.ComponentType<UIHeaderProps> }
  >;
  UILayerContentBar: React.ComponentType<
    ContentBarOrchestratorProps & {
      uiComponent?: React.ComponentType<UIContentBarProps>;
    }
  >;
  UILayerCookieBanner: React.ComponentType<{
    uiComponent?: React.ComponentType<UICookieBannerProps>;
  }>;
  UILayerNavbar: React.ComponentType<
    NavbarOrchestratorProps & {
      uiComponent?: React.ComponentType<UINavbarProps>;
    }
  >;
  extras: UIExtras;
} & FFStoreModule<TState>;`}</Code>
  </Page>
);

const CodeUILayerHeaderType = (
  <Code language="typescript" center>{`React.ComponentType<
  UIHeaderProps & { uiComponent?: React.ComponentType<UIHeaderProps> }
>`}</Code>
);

const CodeUILayerContentBarType = (
  <Code language="typescript" center>{`React.ComponentType<
  ContentBarOrchestratorProps & {
    uiComponent?: React.ComponentType<UIContentBarProps>;
  }
>`}</Code>
);

const CodeUILayerCookieBannerType = (
  <Code language="typescript" center>{`React.ComponentType<{
  uiComponent?: React.ComponentType<UICookieBannerProps>;
}>`}</Code>
);

const CodeUILayerNavbarType = (
  <Code language="typescript" center>{`React.ComponentType<
  NavbarOrchestratorProps & {
    uiComponent?: React.ComponentType<UINavbarProps>;
  }
>`}</Code>
);

export default PageGeneralUiModule;

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
import { ModuleProfile } from "../../../common/page/text/module/moduleProfile";
import { SectionUiContentBar } from "./uiModule/sectionUiContentBar";
import { SectionUiNavbar } from "./uiModule/sectionUiNavbar";
import { SectionUiHeader } from "./uiModule/sectionUiHeader";
import { SectionUiCookieBanner } from "./uiModule/sectionUiCookieBanner";

const DESCRIPTION = `This module provides the default UI integration for the framework. It wires the header, navbar, content bar and cookie banner to the global store and allows you to plug in your own ui components.`;

const PageUiModule: React.FC = () => {
  const CodeUiParams = (
    <Code language="typescript" center>{`type UIParams = {
  UILayerHeader?: (props: UIHeaderProps) => React.ReactNode;
  UILayerContentBar?: (props: UIContentBarProps) => React.ReactNode;
  UILayerCookieBanner?: (props: UICookieBannerProps) => React.ReactNode;
  UILayerNavbar?: (props: UINavbarProps) => React.ReactNode;
};`}</Code>
  );

  const CodeInitialState = (
    <Code language="typescript" center>{`const KEY = "navbarCollapsed";

const initialState: UIState = {
  navbarCollapsed: safeGet(),
  collapsible: true,
};`}</Code>
  );

  return (
    <Page>
      <Title>UIModule</Title>
      <ModuleProfile
        isDefaultModule={true}
        moduleKey="ui"
        shortDescription={DESCRIPTION}
      />

      <SubTitle>Constructor parameters</SubTitle>
      <Text>
        The constructor of <code>UIModule</code> accepts an optional parameter
        object. With this object you can provide custom UI components that are
        wrapped by the framework&apos;s orchestrators.
      </Text>
      {CodeUiParams}

      <SubTitle>Behaviour</SubTitle>
      <Text>
        The <code>UIModule</code> implements the general{" "}
        <code>UIModuleType</code> contract described on the{" "}
        <i>General structure of a UI module</i> page. It adds a small slice of
        UI state to the global store and persists the navbar collapsed state in{" "}
        <code>localStorage</code>.
      </Text>
      {CodeInitialState}
      <Text>
        The actions exposed via the <code>extras</code> object (
        <code>setNavbarCollapsed</code>, <code>toggleNavbar</code>,{" "}
        <code>setCollapsible</code>) are created by the internal Redux slice.
        For details on the expected method signatures, see the general UI module
        description.
      </Text>

      <SubTitle>Example usage</SubTitle>
      <Text>
        The following example shows how to instantiate the <code>UIModule</code>{" "}
        with custom UI components, register it in the store and wrap your
        application with the <code>GlobalDataLayer</code>.
      </Text>

      <Code title={"store.ts"} language="tsx">{`import {
  createModules,
  StoreBuilder,
} from "@iavofficial/frontend-framework/store";
import { GlobalDataLayer } from "@iavofficial/frontend-framework/globalDataLayer";
import { MandatoryModuleNames } from "@iavofficial/frontend-framework/constants";
import { UIModule } from "@iavofficial/frontend-framework-shared/uiModule";

import CustomHeader from "./CustomHeader";
import CustomNavbar from "./CustomNavbar";
import CustomCookieBanner from "./CustomCookieBanner";
import CustomContentBar from "./CustomContentBar";

const customModules = {
  [MandatoryModuleNames.UI]: new UIModule({
    UILayerHeader: CustomHeader,
    UILayerNavbar: CustomNavbar,
    UILayerCookieBanner: CustomCookieBanner,
    UILayerContentBar: CustomContentBar,
  }),
  // other modules ...
};

export const modules = createModules(customModules);

export const store = new StoreBuilder(modules.storeModules)
  .setFrameworkModuleProcessor(
    MandatoryModuleNames.UI,
    (module, storeConfigBuilder) => {
      storeConfigBuilder.setReducer(
        MandatoryModuleNames.UI,
        module.slice.reducer,
      );
    },
  )
  .build();`}</Code>

      <Code title={"App.tsx"} language="tsx">{`export const App = () => (
  <GlobalDataLayer store={store} modules={modules.all}>
    <Layout />
  </GlobalDataLayer>
);`}</Code>

      <SectionUiNavbar />
      <SectionUiContentBar />
      <SectionUiHeader />
      <SectionUiCookieBanner />
    </Page>
  );
};

export default PageUiModule;

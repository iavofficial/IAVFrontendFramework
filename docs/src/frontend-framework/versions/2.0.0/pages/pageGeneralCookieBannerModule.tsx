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

import Page from "../../../common/page/page";
import BulletList from "../../../common/page/text/bulletList";
import SubSubTitle from "../../../common/page/text/subSubTitle";
import SubTitle from "../../../common/page/text/subTitle";
import Text from "../../../common/page/text/text";
import Title from "../../../common/page/text/title";
import Code from "../../../common/page/utils/code";
import Table from "../../../common/page/utils/table";
import React from "react";

const PageGeneralCookieBannerModule: React.FC = () => (
  <Page>
    <Title>General structure of a cookie banner module</Title>

    <Text>
      The Cookie Banner module displays and manages user consent for cookies and
      tracking in your application. It is a Framework Non Store Module; this
      means it does not add state to the Redux store, but can be
      customized/replaced as needed.
    </Text>
    <SubTitle>Necessary components</SubTitle>
    <Text>
      A cookie banner module must provide the following components. For detailed
      types and the default implementation, consult the <i>shared</i> package.
    </Text>
    <Table
      columns={[
        { key: "name", title: "Name" },
        { key: "component_type", title: "Component Type" },
        { key: "description", title: "Description" },
      ]}
      data={[
        {
          name: "UiLayerCookieBanner",
          component_type: CodeUiLayerCookieBannerType,
          description:
            "This component is rendered in the UILayer and displays the cookie consent banner, handling user interaction.",
        },
      ]}
    />
    <SubSubTitle>Customizing the Banner</SubSubTitle>
    <Text>
      To override the default Cookie Banner, provide your own implementation of
      the <i>UiLayerCookieBanner</i> React component. You may either:
    </Text>
    <BulletList
      bulletType="bullet"
      items={[
        "Extend the default module and override the UiLayerCookieBanner property.",
        "Implement a new class or object matching the CookieBannerModule interface.",
      ]}
    />
    <Code language="typescript" title="Custom Cookie Banner Example">
      {`class CustomCookieBanner implements CookieBannerModule {
      UiLayerCookieBanner = MySpecialCookieBanner;
      // Optionally, useModuleLifecycle if you need custom logic.
    }`}
    </Code>
    <Text>
      Then register your customized module under <i>frameworkNonStoreModules</i>
      :
    </Text>
    <Code language="typescript" title="Registering custom module">
      {`const frameworkNonStoreModules = {
      cookieBanner: new CustomCookieBanner(),
      // ...other non-store modules
    };
    
    export const modules = createModulesSeperately({
      // ...other module groups
      frameworkNonStoreModules,
    });`}
    </Code>

    <SubSubTitle>Tips & Best Practices</SubSubTitle>
    <Text>
      Most projects can use the default cookie banner out of the box. If you
      need branding or legal customization, use your own UiLayerCookieBanner,
      but preserve the interface.
    </Text>
    <SubTitle>Optional Lifecycle Hook</SubTitle>
    <Text>
      If initial consent must be handled before the application renders, provide
      a <code>useModuleLifecycle</code> hook as described in the
      modules-in-depth page. This can be used to block app rendering until
      consent logic is finished.
    </Text>
    <Code language="typescript">{`() => {renderChildren: boolean} & Record<string, unknown>`}</Code>

    <SubTitle>Other important types</SubTitle>
    <Code language="typescript">{`export interface UICookieBannerProps {
  header: React.ReactNode;
  message: React.ReactNode;
  visible: boolean;
  acceptButtonLabel: string;
  onAccept: () => void;
  styles?: Record<string, any>;
  darkMode: boolean;
};`}</Code>
    <Code language="typescript">{`export type CookieBannerModule = {
  UiLayerCookieBanner: React.ComponentType<UICookieBannerProps>;
  useModuleLifecycle?: ModuleLifecycleHook;
} & FFModule;`}</Code>
  </Page>
);

const CodeUiLayerCookieBannerType = (
  <Code
    language="typescript"
    center
  >{`React.ComponentType<UICookieBannerProps>`}</Code>
);

export default PageGeneralCookieBannerModule;

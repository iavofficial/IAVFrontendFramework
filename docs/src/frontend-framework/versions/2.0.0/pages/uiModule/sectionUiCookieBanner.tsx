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
import Title from "../../../../common/page/text/title";
import SubTitle from "../../../../common/page/text/subTitle";
import Text from "../../../../common/page/text/text";
import Code from "../../../../common/page/utils/code";

export const SectionUiCookieBanner: React.FC = () => (
  <div>
    <Title>Cookie banner</Title>

    <Text>
      The UI module includes a cookie banner orchestrator that handles cookie
      consent logic. It reads and writes the consent cookie, decides whether the
      banner should be visible and passes translations and dark mode settings to
      a UI component. You can replace the default banner by providing your own
      implementation.
    </Text>

    <SubTitle>Props</SubTitle>
    <Text>
      Any custom cookie banner used with the UI module has to implement the
      following props interface:
    </Text>

    <Code language="typescript">{`export interface UICookieBannerProps {
  header: React.ReactNode;
  message: React.ReactNode;
  visible: boolean;
  acceptButtonLabel: string;
  onAccept: () => void;
  styles?: Record<string, any>;
  darkMode: boolean;
}`}</Code>

    <SubTitle>Default implementation</SubTitle>
    <Text>
      The default cookie banner implementation renders a fixed banner at the
      bottom of the viewport when consent has not yet been given. It uses the
      header and message provided by the orchestrator, adapts to dark mode and
      hides itself automatically when the user accepts.
    </Text>

    <SubTitle>Custom implementation example</SubTitle>
    <Text>
      The following example shows a minimal cookie banner implementation based
      on Ant Design. It can be used as a drop-in replacement for the default
      implementation.
    </Text>

    <Code
      title={"CustomCookieBanner.tsx"}
      language="tsx"
    >{`import React from "react";
import { Button, Space, Typography, theme } from "antd";
import { UICookieBannerProps } from "@iavofficial/frontend-framework-shared/cookieBannerModuleInterfaces";

export const CustomCookieBanner = ({
  header,
  message,
  acceptButtonLabel,
  visible,
  onAccept,
  styles,
  darkMode,
}: UICookieBannerProps) => {
  const { token } = theme.useToken();

  if (!visible) return null;

  return (
    <div
      role="region"
      aria-label={
        typeof header === "string" ? header : "Cookie notice"
      }
      style={{
        position: "fixed",
        left: 16,
        right: 16,
        bottom: 16,
        padding: 12,
        background:
          styles?.backgroundColor ?? token.colorBgElevated,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: 12,
        zIndex: 9999,
      }}
    >
      <Space direction="vertical" size={0} style={{ lineHeight: 1.3 }}>
        <Typography.Text strong>
          {header ?? "Cookies"}
        </Typography.Text>
        <Typography.Text>
          {message ?? "We use cookies to improve your experience."}
        </Typography.Text>
      </Space>

      <Button type="primary" onClick={onAccept}>
        {acceptButtonLabel}
      </Button>
    </div>
  );
};`}</Code>

    <SubTitle>Registering the custom component</SubTitle>
    <Text>
      To use a custom cookie banner, pass it to the UI module via{" "}
      <code>UILayerCookieBanner</code> when creating your modules:
    </Text>

    <Code
      title={"store.ts"}
      language="tsx"
    >{`import { UIModule } from "@iavofficial/frontend-framework-shared/uiModule";
import { MandatoryModuleNames } from "@iavofficial/frontend-framework/constants";
import { createModules, StoreBuilder } from "@iavofficial/frontend-framework/store";

import { CustomCookieBanner } from "./CustomCookieBanner";

const customModules = {
  [MandatoryModuleNames.UI]: new UIModule({
    UILayerCookieBanner: CustomCookieBanner,
    // other UI components...
  }),
};

export const modules = createModules(customModules);

export const store = new StoreBuilder(modules.storeModules).build();`}</Code>
  </div>
);

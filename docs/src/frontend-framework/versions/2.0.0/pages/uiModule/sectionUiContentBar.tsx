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

export const SectionUiContentBar: React.FC = () => (
  <div>
    <Title>Content bar</Title>

    <Text>
      The content bar is responsible for displaying the active content tabs and
      navigation controls (left/right arrows, add button). The UI module uses a
      content bar orchestrator that wires framework state and layout logic to a
      UI component. You can replace the default implementation by providing your
      own <code>UIContentBar</code> component.
    </Text>

    <SubTitle>Props</SubTitle>
    <Text>
      The content bar supports a simple style mechanism via{" "}
      <code>ContentBarStyles</code> and receives its data and callbacks through{" "}
      <code>UIContentBarProps</code>.
    </Text>

    <Code language="typescript">{`export const ContentBarStyles = {
  SPACING: "SPACING",
  SET_SPACING_COLOR: "SET_SPACING_COLOR",
} as const;

export type ContentBarStylesArray =
  (typeof ContentBarStyles)[keyof typeof ContentBarStyles][];

export interface StyleProps<T> {
  appliedStyles?: StylesArray<T>;
}

export type StylesArray<T> = T[keyof T][];`}</Code>

    <Code language="typescript">{`export type UIContentBarProps = StyleProps<typeof ContentBarStyles> & {
  selectedId: string;
  contentWrappers: ContentbarWrapperInterface[];
  addable?: boolean;
  jumpToEndOfContentBar?: boolean;
  onClickAddButton?: () => void;
  onClickLeftSlideButton?: () => void;
  onClickRightSlideButton?: () => void;
};`}</Code>

    <Text>
      The <code>contentWrappers</code> array contains the elements that are
      rendered inside the content bar. Each wrapper provides a{" "}
      <code>getContentbarElement</code> method that is called with the computed
      element width and selection information.
    </Text>

    <SubTitle>Default implementation</SubTitle>
    <Text>
      The default <code>UIContentBar</code> implementation:
    </Text>
    <ul>
      <li>Reads the navbar collapsed state from the UI store</li>
      <li>Measures the available width and calculates the tab width</li>
      <li>Handles overflow using left/right slide buttons</li>
      <li>
        Supports styling via <code>appliedStyles</code>
      </li>
      <li>Uses the current color settings from the color context</li>
    </ul>

    <SubTitle>Custom implementation example</SubTitle>
    <Text>
      The following example shows an Ant Design based content bar implementation
      that can be used as a custom <code>UIContentBar</code> component:
    </Text>

    <Code
      title={"CustomContentBar.tsx"}
      language="tsx"
    >{`import React from "react";
import { Button, theme } from "antd";
import { LeftOutlined, PlusOutlined, RightOutlined } from "@ant-design/icons";
import { UIContentBarProps } from "@iavofficial/frontend-framework-shared/contentBarModuleInterfaces";

const CustomContentBar: React.FC<UIContentBarProps> = (props) => {
  const {
    contentWrappers = [],
    addable,
    selectedId,
    onClickAddButton,
    onClickLeftSlideButton,
    onClickRightSlideButton,
  } = props;

  const { token } = theme.useToken();
  const firstId = contentWrappers[0]?.id;
  const elementWidth = 160;

  return (
    <div
      style={{
        height: 56,
        minHeight: 56,
        padding: "12px 12px 0 12px",
        backgroundColor: token.colorBgContainer,
        display: "flex",
        alignItems: "center",
        gap: 8,
      }}
    >
      <Button
        icon={<LeftOutlined />}
        onClick={onClickLeftSlideButton}
        style={{
          height: 32,
          minWidth: 32,
          borderRadius: 8,
          background: token.colorBgElevated,
        }}
      />

      <div
        style={{
          flex: 1,
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
          gap: 8,
          padding: "0 16px",
          height: 40,
          borderRadius: 8,
        }}
      >
        {contentWrappers.map((el) =>
          el.getContentbarElement(elementWidth, selectedId, firstId),
        )}
      </div>

      {addable && (
        <Button
          icon={<PlusOutlined />}
          onClick={onClickAddButton}
          style={{
            height: 32,
            minWidth: 32,
            borderRadius: 8,
            background: token.colorBgElevated,
          }}
        />
      )}

      <Button
        icon={<RightOutlined />}
        onClick={onClickRightSlideButton}
        style={{
          height: 32,
          minWidth: 32,
          borderRadius: 8,
          background: token.colorBgElevated,
        }}
      />
    </div>
  );
};

export default CustomContentBar;`}</Code>

    <SubTitle>Registering the custom component</SubTitle>
    <Text>
      To use a custom content bar implementation, pass it to the UI module via{" "}
      <code>UILayerContentBar</code> when creating your modules:
    </Text>

    <Code
      title={"store.ts"}
      language="tsx"
    >{`import { UIModule } from "@iavofficial/frontend-framework-shared/uiModule";
import { MandatoryModuleNames } from "@iavofficial/frontend-framework/constants";
import { createModules } from "@iavofficial/frontend-framework/store";

import CustomContentBar from "./CustomContentBar";

const customModules = {
  [MandatoryModuleNames.UI]: new UIModule({
    UILayerContentBar: CustomContentBar,
  }),
};

export const modules = createModules(customModules);`}</Code>
  </div>
);

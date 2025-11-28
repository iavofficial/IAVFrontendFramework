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
import { Button, theme } from "antd";
import { LeftOutlined, PlusOutlined, RightOutlined } from "@ant-design/icons";
import { UIContentBarProps } from "@iavofficial/frontend-framework-shared/contentBarModuleInterfaces";

export const CustomContentBar = (props: UIContentBarProps) => {
  const {
    contentWrappers = [],
    addable,
    selectedId,
    onClickAddButton,
    onClickLeftSlideButton,
    onClickRightSlideButton,
  } = props;

  const { token } = theme.useToken();
  // TODO
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

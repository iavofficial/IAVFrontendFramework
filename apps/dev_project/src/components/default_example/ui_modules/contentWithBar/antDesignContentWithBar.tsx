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

import React, { useMemo, useContext } from 'react';
import { Tabs, Button, Layout } from 'antd';
import { UIContentWithBarProps } from '@iavofficial/frontend-framework-shared/contentWithBarModuleInterfaces';
import { ColorSettingsContext } from '@iavofficial/frontend-framework-shared/colorSettingsContext';
import { BasicContentbarWrapper } from '@iavofficial/frontend-framework/basicContentbarWrapper';
import { CustomContentbarWrapper } from '@iavofficial/frontend-framework/customContentbarWrapper';

const { Content } = Layout;

type Wrapper = BasicContentbarWrapper | CustomContentbarWrapper;

/* export const AntDesignContentWithBar: React.FC<UIContentWithBarProps> = ({
  contentWrappers,
  selectedId,
  onSelect,
  onClickAddButton,
  addable,
  onClickLeftSlideButton,
  onClickRightSlideButton,
}) => { */
export const AntDesignContentWithBar: React.FC<UIContentWithBarProps> = ({
  contentWrappers,
  selectedId,
  onSelect,
  onClickLeftSlideButton,
  addable,
  onClickAddButton,
  onClickRightSlideButton,
}) => {
  const colorSettingsContext = useContext(ColorSettingsContext);
  const contentAreaBackground =
    colorSettingsContext?.currentColors?.contentArea?.backgroundColor || '#fff';

  // Prepare tab items
  const tabItems = useMemo(
    () =>
      contentWrappers.map((wrapper: Wrapper) => ({
        key: wrapper.getId(),
        label: wrapper.getId(),
        children: wrapper.getContentAreaElement(),
      })),
    [contentWrappers]
  );

  return (
    <Layout style={{ height: '100%' }}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          background: '#fafafa',
          padding: '0 8px',
          borderBottom: '1px solid #f0f0f0',
        }}
      >
        {onClickLeftSlideButton && (
          <Button
            onClick={onClickLeftSlideButton}
            shape='circle'
            icon='<'
            size='small'
            style={{ marginRight: 8 }}
          />
        )}

        <Tabs
          activeKey={selectedId}
          items={tabItems}
          onChange={onSelect}
          tabBarExtraContent={
            addable && (
              <Button
                onClick={onClickAddButton}
                type='primary'
                size='small'
                style={{ marginLeft: 8 }}
              >
                +
              </Button>
            )
          }
          animated
        />

        {onClickRightSlideButton && (
          <Button
            onClick={onClickRightSlideButton}
            shape='circle'
            icon='>'
            size='small'
            style={{ marginLeft: 8 }}
          />
        )}
      </div>
    </Layout>
  );
};

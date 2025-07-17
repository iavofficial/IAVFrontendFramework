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
      <Content
        style={{
          background: contentAreaBackground,
          width: '100%',
          height: '100%',
          overflow: 'auto',
        }}
      >
        {tabItems.find((item) => item.key === selectedId)?.children}
      </Content>
    </Layout>
  );
};

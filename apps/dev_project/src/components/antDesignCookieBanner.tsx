import React from 'react';
import { Layout, Button } from 'antd';
import { UICookieBannerProps } from '@iavofficial/frontend-framework-shared/uiModuleInterfaces';

const { Footer } = Layout;

export const AntDesignCookieBanner: React.FC<UICookieBannerProps> = ({
  header,
  message,
  acceptButtonLabel,
  onAccept,
  visible,
  styles,
  darkMode,
}) => {
  if (!visible) return null;

  return (
    <Footer
      style={{
        backgroundColor: darkMode ? '#001529' : '#f0f2f5',
        color: darkMode ? '#fff' : '#000',
        textAlign: 'center',
        ...styles?.dialog,
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <div>
          {header && (
            <div style={{ fontWeight: 600, marginBottom: 4 }}>{header}</div>
          )}
          <span>{message}</span>
        </div>
        <Button type='primary' onClick={onAccept} style={{ ...styles?.button }}>
          {acceptButtonLabel}
        </Button>
      </div>
    </Footer>
  );
};

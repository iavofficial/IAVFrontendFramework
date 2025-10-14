import React from "react";
import { Button, Space, theme, Typography } from "antd";
import { UICookieBannerProps } from "@iavofficial/frontend-framework-shared/cookieBannerModuleInterfaces";

const CustomCookieBanner = (props: UICookieBannerProps) => {
  const { header, message, acceptButtonLabel, visible, onAccept, styles } =
    props;
  const { token } = theme.useToken();

  if (!visible) return null;

  return (
    <div
      role="region"
      aria-label={header ?? "Cookie Hinweis"}
      style={{
        position: "fixed",
        left: 16,
        right: 16,
        bottom: 16,
        padding: 12,
        background: styles?.backgroundColor ?? token.colorBgElevated,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: 12,
        zIndex: 9999,
      }}
    >
      <Space direction="vertical" size={0} style={{ lineHeight: 1.3 }}>
        <Typography.Text strong>{header ?? "Cookies"}</Typography.Text>
        <Typography.Text>{message ?? "Wir verwenden Cookies."}</Typography.Text>
      </Space>

      <Button
        type="primary"
        aria-label={acceptButtonLabel ?? "Cookies akzeptieren"}
        onClick={onAccept}
      >
        {acceptButtonLabel ?? "OK"}
      </Button>
    </div>
  );
};

export default CustomCookieBanner;

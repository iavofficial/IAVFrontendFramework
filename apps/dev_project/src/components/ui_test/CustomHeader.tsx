import React from "react";
import { Button, Space, Typography } from "antd";

type Props = {
  headerOptions?: {
    reactElementLeft?: React.ReactNode;
    headerElements?: React.ReactNode[];
    reactElementRight?: React.ReactNode;
  };
  settingsMenuOptions?: any;
  userMenuOptions?: any;
};

const CustomHeader: React.FC<Props> = ({ headerOptions }) => {
  return (
    <div
      style={{
        height: 64,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 16px",
        borderBottom: "1px solid #eee",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        {headerOptions?.reactElementLeft ?? (
          <Typography.Text strong>App</Typography.Text>
        )}
      </div>
      <Space size={12}>
        {(headerOptions?.headerElements ?? []).map((el, i) => (
          <span key={i}>{el}</span>
        ))}
      </Space>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        {headerOptions?.reactElementRight ?? (
          <Button type="primary">Action</Button>
        )}
      </div>
    </div>
  );
};

export default CustomHeader;

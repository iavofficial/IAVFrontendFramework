import React from "react";
import { Button, Space, Typography } from "antd";
import { UIHeaderProps } from "@iavofficial/frontend-framework-shared/headerModuleInterfaces";

const CustomHeader = (props: UIHeaderProps) => {
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
        {props.headerOptions?.reactElementLeft ?? (
          <Typography.Text strong>App</Typography.Text>
        )}
      </div>
      <Space size={12}>
        {(props.headerOptions?.headerElements ?? []).map((el, i) => (
          <span key={i}>{el}</span>
        ))}
      </Space>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        {props.headerOptions?.reactElementRight ?? (
          <Button type="primary">Action</Button>
        )}
      </div>
    </div>
  );
};

export default CustomHeader;

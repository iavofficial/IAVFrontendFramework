import React from "react";
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

export default CustomContentBar;

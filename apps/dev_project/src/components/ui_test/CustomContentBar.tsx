// src/ui/CustomContentBar.tsx
import React from "react";
import { ContentBarViewProps } from "@iavofficial/frontend-framework-shared/contentBarModuleInterfaces";

const CustomContentBar = (props: ContentBarViewProps) => {
  const {
    visibleElements,
    elementWidth,
    canSlideLeft,
    canSlideRight,
    slideLeft,
    slideRight,
    addable,
    onAdd,
    selectedId,
    firstId,
    containerBg,
    barBg,
    hasSpacing,
  } = props;

  return (
    <div
      style={{
        height: 56,
        minHeight: 56,
        padding: hasSpacing ? "12px 12px 0 12px" : 0,
        backgroundColor: containerBg,
        display: "flex",
        alignItems: "center",
        gap: 8,
      }}
    >
      <button
        onClick={slideLeft}
        disabled={!canSlideLeft}
        style={{
          height: 32,
          minWidth: 32,
          border: "none",
          borderRadius: 8,
          background: barBg,
          cursor: canSlideLeft ? "pointer" : "default",
        }}
      >
        ‹
      </button>
      <div
        style={{
          flex: 1,
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
          gap: 8,
          padding: "0 16px",
          background: barBg,
          height: 40,
          borderRadius: 8,
        }}
      >
        {visibleElements.map((el) =>
          el.getContentbarElement(elementWidth, selectedId, firstId),
        )}
      </div>
      {addable && (
        <button
          onClick={onAdd}
          style={{
            height: 32,
            minWidth: 32,
            border: "none",
            borderRadius: 8,
            background: barBg,
          }}
        >
          +
        </button>
      )}
      <button
        onClick={slideRight}
        disabled={!canSlideRight}
        style={{
          height: 32,
          minWidth: 32,
          border: "none",
          borderRadius: 8,
          background: barBg,
          cursor: canSlideRight ? "pointer" : "default",
        }}
      >
        ›
      </button>
    </div>
  );
};

export default CustomContentBar;

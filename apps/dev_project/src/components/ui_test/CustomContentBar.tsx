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

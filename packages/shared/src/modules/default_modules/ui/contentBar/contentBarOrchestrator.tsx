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

import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {TypedUseSelectorHook, useSelector} from "react-redux";
import {UIStoreState} from "../../../../types/modules/ui/uiModuleInterfaces";
import {MandatoryModuleNames} from "../../../../constants/moduleNames";
import {ColorSettingsContext} from "../../../../contexts/colorSettingsContext";
import {
  ContentBarStyles,
  ContentBarViewProps,
  UIContentBarProps,
} from "../../../../types/modules/ui/contentBar/contentBarModuleInterfaces";
import {UIContentBar} from "./uiContentBar";

export type ContentBarOrchestratorProps = UIContentBarProps & {
  uiComponent?: React.ComponentType<UIContentBarProps>;
};

const VISIBLE_MAX = 6;
const MIN_ITEM_WIDTH = 120;

export const ContentBarOrchestrator = (props: ContentBarOrchestratorProps) => {
  const {
    contentElements,
    addable,
    jumpToEndOfContentBar,
    selectedId,
    onClickAddButton,
    onClickLeftSlideButton,
    onClickRightSlideButton,
    appliedStyles,
    uiComponent,
  } = props;
  const View = uiComponent ?? UIContentBar;
  const {currentColors} = useContext(ColorSettingsContext);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const useTypedSelector: TypedUseSelectorHook<UIStoreState> = useSelector;
  const collapsed =
    useTypedSelector((s) => s[MandatoryModuleNames.UI].navbarCollapsed) ??
    false;

  const [containerWidth, setContainerWidth] = useState(1200);
  const [startIndex, setStartIndex] = useState(0);

  const handleResize = useCallback(() => {
    const el = containerRef.current;
    if (el) setContainerWidth(el.clientWidth);
  }, []);
  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [handleResize]);

  const hasSpacing = appliedStyles?.includes(ContentBarStyles.SPACING) ?? false;
  const containerBg = appliedStyles?.includes(
    ContentBarStyles.SET_SPACING_COLOR,
  )
    ? currentColors.contentArea.backgroundColor
    : "transparent";
  const barBg = currentColors.contentbar.backgroundColor;

  const visibleCount = useMemo(
    () =>
      Math.min(VISIBLE_MAX, contentElements.length || 0) - (collapsed ? 1 : 0),
    [contentElements.length, collapsed],
  );
  const inner = Math.max(0, containerWidth - 2 * 16 - 96);
  const elementWidth = Math.max(
    MIN_ITEM_WIDTH,
    visibleCount > 0 ? Math.floor(inner / visibleCount) : inner,
  );

  const canSlideLeft = startIndex > 0;
  const canSlideRight = startIndex + visibleCount < contentElements.length;

  useEffect(() => {
    if (jumpToEndOfContentBar && contentElements.length > visibleCount)
      setStartIndex(contentElements.length - visibleCount);
  }, [jumpToEndOfContentBar, contentElements.length, visibleCount]);

  const slideLeft = useCallback(() => {
    if (!canSlideLeft) return;
    onClickLeftSlideButton?.();
    setStartIndex((s) => Math.max(0, s - 1));
  }, [canSlideLeft, onClickLeftSlideButton]);
  const slideRight = useCallback(() => {
    if (!canSlideRight) return;
    onClickRightSlideButton?.();
    setStartIndex((s) =>
      Math.min(contentElements.length - visibleCount, s + 1),
    );
  }, [
    canSlideRight,
    onClickRightSlideButton,
    contentElements.length,
    visibleCount,
  ]);
  const onAdd = useCallback(() => onClickAddButton?.(), [onClickAddButton]);

  const visibleElements = useMemo(
    () =>
      contentElements.length <= visibleCount
        ? contentElements
        : contentElements.slice(startIndex, startIndex + visibleCount),
    [contentElements, startIndex, visibleCount],
  );
  const firstId = contentElements[0]?.getId?.() ?? selectedId;

  const viewProps: ContentBarViewProps = {
    visibleElements,
    elementWidth,
    canSlideLeft,
    canSlideRight,
    slideLeft,
    slideRight,
    addable: !!addable,
    onAdd,
    selectedId,
    firstId,
    containerBg,
    barBg,
    hasSpacing,
  };

  return (
    <div ref={containerRef} style={{width: "100%"}}>
      <View {...viewProps} />
    </div>
  );
};

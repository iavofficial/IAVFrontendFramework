/**
 * Copyright © 2025 IAV GmbH Ingenieurgesellschaft Auto und Verkehr, All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import {TypedUseSelectorHook, useSelector} from "react-redux";
import {UIStoreState} from "../../../../types/modules/ui/uiModuleInterfaces";
import {MandatoryModuleNames} from "../../../../constants/moduleNames";
import {ColorSettingsContext} from "../../../../contexts/colorSettingsContext";
import {
  ContentBarStylesArray,
  UIContentBarProps,
} from "../../../../types/modules/ui/contentBar/contentBarModuleInterfaces";
import {UIContentBar} from "./uiContentBar";

export type ContentBarOrchestratorProps = {
  appliedStyles?: ContentBarStylesArray;
  uiComponent?: React.ComponentType<UIContentBarProps>;
} & UIContentBarProps;

export const ContentBarOrchestrator = (props: ContentBarOrchestratorProps) => {
  const {
    contentWrappers,
    addable,
    jumpToEndOfContentBar,
    selectedId,
    onClickAddButton,
    onClickLeftSlideButton,
    onClickRightSlideButton,
    appliedStyles,
    uiComponent,
  } = props;

  const UI = uiComponent ?? UIContentBar;
  const {currentColors} = useContext(ColorSettingsContext);

  const useTypedSelector: TypedUseSelectorHook<UIStoreState> = useSelector;
  const collapsed =
    useTypedSelector((s) => s[MandatoryModuleNames.UI].navbarCollapsed) ??
    false;

  const containerRef = useRef<HTMLDivElement | null>(null);
  const [containerWidth, setContainerWidth] = useState(1200);

  const handleResize = useCallback(() => {
    const el = containerRef.current;
    if (el) setContainerWidth(el.clientWidth);
  }, []);

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [handleResize]);

  return (
    <div ref={containerRef} style={{width: "100%"}}>
      <UI
        contentWrappers={contentWrappers}
        addable={addable}
        jumpToEndOfContentBar={jumpToEndOfContentBar}
        selectedId={selectedId}
        onClickAddButton={onClickAddButton}
        onClickLeftSlideButton={onClickLeftSlideButton}
        onClickRightSlideButton={onClickRightSlideButton}
        appliedStyles={appliedStyles}
      />
    </div>
  );
};

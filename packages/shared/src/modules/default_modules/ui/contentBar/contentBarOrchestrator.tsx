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

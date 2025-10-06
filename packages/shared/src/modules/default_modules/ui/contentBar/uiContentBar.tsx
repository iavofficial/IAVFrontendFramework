/**
 * Copyright © 2025 IAV GmbH Ingenieurgesellschaft Auto und Verkehr
 * Apache-2.0
 */

import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  ContentBarStyles,
  UIContentBarProps,
} from "../../../../types/modules/ui/contentBar/contentBarModuleInterfaces";
import {TypedUseSelectorHook, useSelector} from "react-redux";
import {UIStoreState} from "../../../../types/modules/ui/uiModuleInterfaces";
import {MandatoryModuleNames} from "../../../../constants/moduleNames";
import {BasicContentbarWrapper} from "@iavofficial/frontend-framework/basicContentbarWrapper";
import {CustomContentbarWrapper} from "@iavofficial/frontend-framework/customContentbarWrapper";
import {useStyleMap} from "../../../module_orchestration/util/useStyleMap";
import {calculateWidth} from "../../../module_orchestration/util/calculateWidth";
import {ContentBarButtonElement} from "../../../module_orchestration/util/contentBarButtonElement";
import {ColorSettingsContext} from "../../../../contexts/colorSettingsContext";
import {
  DEFAULT_ELEMENT_SIZE,
  PADDING_GAB,
} from "../../../../constants/constants";

export const UIContentBar: React.FC<UIContentBarProps> = (props) => {
  const {
    contentElements,
    addable,
    jumpToEndOfContentBar,
    selectedId,
    onClickAddButton,
    onClickLeftSlideButton,
    onClickRightSlideButton,
    appliedStyles,
  } = props;

  const colorSettingsContext = useContext(ColorSettingsContext);
  const contentRef = useRef<HTMLDivElement | null>(null);

  const contentAreaBackgroundColor =
    colorSettingsContext.currentColors.contentArea.backgroundColor;
  const contentbarBackgroundColor =
    colorSettingsContext.currentColors.contentbar.backgroundColor;

  const classesMap = {[ContentBarStyles.SPACING]: "pt-3 pr-3 pl-3"};
  const stylesMap = {
    [ContentBarStyles.SET_SPACING_COLOR]: {
      backgroundColor: contentAreaBackgroundColor,
    },
  };
  const styleDependencies = {
    [ContentBarStyles.SET_SPACING_COLOR]: [ContentBarStyles.SPACING],
  };

  const [classNames, styles] = useStyleMap(
    classesMap,
    stylesMap,
    appliedStyles,
    styleDependencies,
  );

  const useTypedSelector: TypedUseSelectorHook<UIStoreState> = useSelector;
  const collapsed = useTypedSelector(
    (s) => s[MandatoryModuleNames.UI].navbarCollapsed,
  );

  const [preventInitialJumpToEnd, setPreventInitialJumpToEnd] = useState(true);
  const [width, setWidth] = useState(1648);
  const [startRenderElements, setStartRenderElements] = useState(0);
  const [amountOfRenderedTabElements, setAmountOfRenderedTabElements] =
    useState(collapsed ? 6 : 5);

  const handleJumpToEnd = useCallback(() => {
    if (
      contentElements.length > amountOfRenderedTabElements &&
      !preventInitialJumpToEnd
    ) {
      return contentElements.length - amountOfRenderedTabElements;
    } else {
      return startRenderElements;
    }
  }, [
    amountOfRenderedTabElements,
    preventInitialJumpToEnd,
    contentElements.length,
    startRenderElements,
  ]);

  useEffect(() => {
    if (jumpToEndOfContentBar) {
      setStartRenderElements(handleJumpToEnd);
      setPreventInitialJumpToEnd(false);
    }
  }, [contentElements.length]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    window.addEventListener("resize", handleDivResize);
    return () => {
      window.removeEventListener("resize", handleDivResize);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const lastElementIsVisible = useCallback(() => {
    return (
      startRenderElements + amountOfRenderedTabElements ===
        contentElements.length &&
      contentElements.length > amountOfRenderedTabElements
    );
  }, [
    amountOfRenderedTabElements,
    contentElements.length,
    startRenderElements,
  ]);

  const handleDivResize = useCallback(() => {
    const currentContentRef = contentRef.current;
    if (currentContentRef) setWidth(currentContentRef.clientWidth);
  }, []);

  useEffect(() => {
    if (collapsed) {
      setStartRenderElements((s) => (lastElementIsVisible() ? s - 1 : s));
      setAmountOfRenderedTabElements(6);
      handleDivResize();
    } else {
      setAmountOfRenderedTabElements(5);
      handleDivResize();
    }
  }, [handleDivResize, lastElementIsVisible, collapsed]);

  const handleSlideLeftEvent = useCallback(() => {
    if (startRenderElements > 0) {
      if (onClickLeftSlideButton) onClickLeftSlideButton();
      setStartRenderElements((s) => s - 1);
    }
  }, [startRenderElements, onClickLeftSlideButton]);

  const handleOnClickAddEvent = useCallback(() => {
    if (onClickAddButton) onClickAddButton();
  }, [onClickAddButton]);

  const handleSlideRightEvent = useCallback(() => {
    if (
      startRenderElements + amountOfRenderedTabElements <
      contentElements.length
    ) {
      if (onClickRightSlideButton) onClickRightSlideButton();
      setStartRenderElements((s) => s + 1);
    }
  }, [
    amountOfRenderedTabElements,
    contentElements.length,
    onClickRightSlideButton,
    startRenderElements,
  ]);

  const isNavbarCollapsed = collapsed ?? false;

  return (
    <div
      ref={contentRef}
      id="contentbar"
      className={`flex ${classNames}`}
      style={{height: "56px", minHeight: "56px", ...styles}}
    >
      <div
        style={{
          height: `${DEFAULT_ELEMENT_SIZE}px`,
          width: "100%",
          backgroundColor: contentbarBackgroundColor,
        }}
        className="flex align-items-center justify-content-between"
      >
        <div className="flex align-items-center">
          <ContentBarButtonElement
            handleOnClickEvent={handleSlideLeftEvent}
            icon={"pi pi-angle-left"}
            isVisible={contentElements.length > amountOfRenderedTabElements}
          />
          {contentElements.length > amountOfRenderedTabElements
            ? contentElements
                .slice(
                  startRenderElements,
                  startRenderElements + amountOfRenderedTabElements,
                )
                .map(
                  (element: BasicContentbarWrapper | CustomContentbarWrapper) =>
                    element.getContentbarElement(
                      calculateWidth(
                        isNavbarCollapsed,
                        width - (2 * DEFAULT_ELEMENT_SIZE + 2 * PADDING_GAB),
                        !!addable,
                        contentElements.length > amountOfRenderedTabElements,
                      ),
                      selectedId,
                      contentElements[0].getId(),
                    ),
                )
            : contentElements.map(
                (element: BasicContentbarWrapper | CustomContentbarWrapper) =>
                  element.getContentbarElement(
                    calculateWidth(
                      isNavbarCollapsed,
                      width - (2 * DEFAULT_ELEMENT_SIZE + 2 * PADDING_GAB),
                      !!addable,
                      contentElements.length > amountOfRenderedTabElements,
                    ),
                    selectedId,
                    contentElements[0].getId(),
                  ),
              )}
        </div>
        <div className="flex align-items-center">
          <ContentBarButtonElement
            handleOnClickEvent={handleOnClickAddEvent}
            icon={"pi pi-plus"}
            isVisible={addable}
          />
          <ContentBarButtonElement
            handleOnClickEvent={handleSlideRightEvent}
            icon={"pi pi-angle-right"}
            isVisible={contentElements.length > amountOfRenderedTabElements}
          />
        </div>
      </div>
    </div>
  );
};

/**
 * Copyright © 2024 IAV GmbH Ingenieurgesellschaft Auto und Verkehr, All Rights Reserved.
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
import "../css/globalColors.css";
import {ColorSettingsContext} from "../../contexts/colorsettings";
import {BasicContentbarWrapper} from "./basicContentbarWrapper";
import {CustomContentbarWrapper} from "./customContentbarWrapper";
import {NavbarSettingsContext} from "../../contexts/navbarContext";
import {calculateWidth} from "../../utils/calculateWidth";
import {ContentBarButtonElement} from "./contentBarButtonElement";
import {DEFAULT_ELEMENTSIZE, PADDING_GAB} from "../../constants";
import {useStyleMap} from "./style_options/useStyleMap";
import {StyleProps, StylesArray} from "./style_options/styleTypes";

export const ContentBarStyles = {
  SPACING: "SPACING",
  SET_SPACING_COLOR: "SET_SPACING_COLOR",
};

export type ContentBarStylesArray =
  (typeof ContentBarStyles)[keyof typeof ContentBarStyles][];

export type ContentStyleStylesArray = StylesArray<typeof ContentBarStyles>;

export type PropsContentBar = StyleProps<typeof ContentBarStyles> & {
  contentElements: BasicContentbarWrapper[] | CustomContentbarWrapper[];
  addable?: boolean;
  jumpToEndOfContentBar?: boolean;
  selectedId: string;
  onClickAddButton?: () => any;
  onClickLeftSlideButton?: () => any;
  onClickRightSlideButton?: () => any;
};

export const ContentBar = (props: PropsContentBar) => {
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
  const navbarSettingsContext = useContext(NavbarSettingsContext);
  const contentRef = useRef<HTMLDivElement | null>(null);

  const contentAreaBackgroundColor =
    colorSettingsContext.currentColors.contentArea.backgroundColor;
  const contentbarBackgroundColor =
    colorSettingsContext.currentColors.contentbar.backgroundColor;

  // Get styles using style options
  const classesMap = {
    [ContentBarStyles.SPACING]: "pt-3 pr-3 pl-3",
  };
  const stylesMap = {
    [ContentBarStyles.SET_SPACING_COLOR]: {
      backgroundColor: contentAreaBackgroundColor,
    },
  };
  const styleDependencies = {
    [ContentBarStyles.SET_SPACING_COLOR]: [ContentBarStyles.SPACING],
  };
  //@ts-ignore
  const [classNames, styles] = useStyleMap(
    classesMap,
    stylesMap,
    appliedStyles,
    styleDependencies,
  );

  const [preventInitialJumpToEnd, setPreventInitialJumpToEnd] = useState(true);

  const [width, setWidth] = useState(1648);
  const [startRenderElements, setStartRenderElements] = useState(0);
  const [amountOfRenderedTabElements, setAmountOfRenderedTabElements] =
    useState(navbarSettingsContext?.navbarCollapsed === true ? 6 : 5);

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
    //eslint-disable-next-line
  }, [contentElements.length]);

  useEffect(() => {
    window.addEventListener("resize", handleDivResize);

    return () => {
      window.removeEventListener("resize", handleDivResize);
    };
    //eslint-disable-next-line
  }, []);

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
    if (currentContentRef) {
      setWidth(currentContentRef.clientWidth);
    }
  }, [contentRef]);

  useEffect(() => {
    if (navbarSettingsContext?.navbarCollapsed === true) {
      setStartRenderElements((startRenderElements) =>
        lastElementIsVisible() ? startRenderElements - 1 : startRenderElements,
      );
      setAmountOfRenderedTabElements(6);
      handleDivResize();
    } else {
      setAmountOfRenderedTabElements(5);
      handleDivResize();
    }
  }, [
    handleDivResize,
    lastElementIsVisible,
    navbarSettingsContext?.navbarCollapsed,
  ]);

  const handleSlideLeftEvent = useCallback(() => {
    if (startRenderElements > 0) {
      if (onClickLeftSlideButton) {
        onClickLeftSlideButton();
      }

      setStartRenderElements((startRenderElements) => startRenderElements - 1);
    }
  }, [startRenderElements, onClickLeftSlideButton]);

  const handleOnClickAddEvent = useCallback(() => {
    if (onClickAddButton) {
      onClickAddButton();
    }
  }, [onClickAddButton]);

  const handleSlideRightEvent = useCallback(() => {
    if (
      startRenderElements + amountOfRenderedTabElements <
      contentElements.length
    ) {
      if (onClickRightSlideButton) {
        onClickRightSlideButton();
      }
      setStartRenderElements((startRenderElements) => startRenderElements + 1);
    }
  }, [
    amountOfRenderedTabElements,
    contentElements.length,
    onClickRightSlideButton,
    startRenderElements,
  ]);

  const isNavbarCollapsed = navbarSettingsContext?.navbarCollapsed ?? false;

  return (
    <div
      ref={contentRef}
      id="contentbar"
      className={`flex ${classNames}`}
      style={{
        height: "56px",
        minHeight: "56px",
        ...styles,
      }}
    >
      <div
        style={{
          height: `${DEFAULT_ELEMENTSIZE}px`,
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
                .map((element) =>
                  element.getContentbarElement(
                    calculateWidth(
                      isNavbarCollapsed,
                      width - (2 * DEFAULT_ELEMENTSIZE + 2 * PADDING_GAB),
                      !!addable,
                      contentElements.length > amountOfRenderedTabElements,
                    ),
                    selectedId,
                    contentElements[0].getId(),
                  ),
                )
            : contentElements.map((element) =>
                element.getContentbarElement(
                  calculateWidth(
                    isNavbarCollapsed,
                    width - (2 * DEFAULT_ELEMENTSIZE + 2 * PADDING_GAB),
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

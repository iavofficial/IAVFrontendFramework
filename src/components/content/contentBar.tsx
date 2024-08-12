import React, { useContext, useEffect, useState, useRef } from "react";
import "../css/globalColors.css";
import { ColorSettingsContext } from "../../contexts/colorsettings";
import { BasicContentbarWrapper } from "./basicContentbarWrapper";
import { CustomContentbarWrapper } from "./customContentbarWrapper";
import { NavbarSettingsContext } from "../../contexts/navbarContext";
import { calculateWidth } from "../../utils/calculateWidth";
import { ContentBarButtonElement } from "./contentBarButtonElement";
import { DEFAULT_ELEMENTSIZE, PADDING_GAB } from "../../constants";
import { useStyleMap } from "./style_options/useStyleMap";
import { StyleProps, StylesArray } from "./style_options/styleTypes";

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
  const colorSettingsContext = useContext(ColorSettingsContext);
  const navbarSettingsContext = useContext(NavbarSettingsContext);
  const contentRef = useRef<HTMLDivElement | null>(null);

  // Get styles using style options
  const backgroundColor =
    colorSettingsContext.currentColors.contentArea.backgroundColor;
  const classesMap = {
    [ContentBarStyles.SPACING]: "p-3",
  };
  const stylesMap = {
    [ContentBarStyles.SET_SPACING_COLOR]: { backgroundColor },
  };
  const [classNames, styles] = useStyleMap(
    ContentBarStyles,
    classesMap,
    stylesMap,
    props.appliedStyles,
    props.applyAllStyles
  );

  const [preventInitialJumpToEnd, setPreventInitialJumpToEnd] = useState(true);

  const [width, setWidth] = useState(1648);
  const [startRenderElements, setStartRenderElements] = useState(0);
  const [amountOfRenderedTabElements, setAmountOfRenderedTabElements] =
    useState(navbarSettingsContext?.navbarCollapsed === true ? 6 : 5);

  const contentAreaBackgroundColor =
    colorSettingsContext.currentColors.contentArea.backgroundColor;
  const contentbarBackgroundColor =
    colorSettingsContext.currentColors.contentbar.backgroundColor;

  useEffect(() => {
    if (props.jumpToEndOfContentBar) {
      setStartRenderElements(handleJumpToEnd);
      setPreventInitialJumpToEnd(false);
    }
  }, [props.contentElements.length]);

  useEffect(() => {
    window.addEventListener("resize", handleDivResize);

    return () => {
      window.removeEventListener("resize", handleDivResize);
    };
  }, []);

  useEffect(() => {
    if (navbarSettingsContext?.navbarCollapsed === true) {
      setStartRenderElements((startRenderElements) =>
        lastElementIsVisible() ? startRenderElements - 1 : startRenderElements
      );
      setAmountOfRenderedTabElements(6);
      handleDivResize();
    } else {
      setAmountOfRenderedTabElements(5);
      handleDivResize();
    }
  }, [navbarSettingsContext?.navbarCollapsed]);

  const handleSlideLeftEvent = () => {
    if (startRenderElements > 0) {
      if (props.onClickLeftSlideButton) {
        props.onClickLeftSlideButton();
      }

      setStartRenderElements((startRenderElements) => startRenderElements - 1);
    }
  };

  const handleOnClickAddEvent = () => {
    if (props.onClickAddButton) {
      props.onClickAddButton();
    }
  };

  const lastElementIsVisible = () => {
    if (
      startRenderElements + amountOfRenderedTabElements ===
        props.contentElements.length &&
      props.contentElements.length > amountOfRenderedTabElements
    ) {
      return true;
    } else {
      return false;
    }
  };

  function handleDivResize() {
    if (contentRef.current !== null) {
      setWidth(contentRef.current.clientWidth);
    }
  }

  const handleSlideRightEvent = () => {
    if (
      startRenderElements + amountOfRenderedTabElements <
      props.contentElements.length
    ) {
      if (props.onClickRightSlideButton) {
        props.onClickRightSlideButton();
      }

      setStartRenderElements((startRenderElements) => startRenderElements + 1);
    }
  };

  const handleJumpToEnd = () => {
    if (
      props.contentElements.length > amountOfRenderedTabElements &&
      !preventInitialJumpToEnd
    ) {
      return props.contentElements.length - amountOfRenderedTabElements;
    } else {
      return startRenderElements;
    }
  };

  return (
    <div
      ref={contentRef}
      id="contentbar"
      className={`flex pt-3 pr-3 pl-3 ${classNames}`}
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
            isVisible={
              props.contentElements.length > amountOfRenderedTabElements
            }
          />
          {props.contentElements.length > amountOfRenderedTabElements
            ? props.contentElements
                .slice(
                  startRenderElements,
                  startRenderElements + amountOfRenderedTabElements
                )
                .map((element) =>
                  element.getContentbarElement(
                    calculateWidth(
                      navbarSettingsContext?.navbarCollapsed!,
                      width - (2 * DEFAULT_ELEMENTSIZE + 2 * PADDING_GAB),
                      !!props.addable,
                      props.contentElements.length > amountOfRenderedTabElements
                    ),
                    props.selectedId,
                    props.contentElements[0].getId()
                  )
                )
            : props.contentElements.map((element) =>
                element.getContentbarElement(
                  calculateWidth(
                    navbarSettingsContext?.navbarCollapsed!,
                    width - (2 * DEFAULT_ELEMENTSIZE + 2 * PADDING_GAB),
                    !!props.addable,
                    props.contentElements.length > amountOfRenderedTabElements
                  ),
                  props.selectedId,
                  props.contentElements[0].getId()
                )
              )}
        </div>
        <div className="flex align-items-center">
          <ContentBarButtonElement
            handleOnClickEvent={handleOnClickAddEvent}
            icon={"pi pi-plus"}
            isVisible={props.addable}
          />
          <ContentBarButtonElement
            handleOnClickEvent={handleSlideRightEvent}
            icon={"pi pi-angle-right"}
            isVisible={
              props.contentElements.length > amountOfRenderedTabElements
            }
          />
        </div>
      </div>
    </div>
  );
};

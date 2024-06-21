import React from "react";
import { useContext, useEffect, useState, useRef } from "react";
import "../css/globalColors.css";
import { ColorSettingsContext } from "../../contexts/colorsettings";
import { BasicContentbarWrapper } from "./basicContentbarWrapper";
import { CustomContentbarWrapper } from "./customContentbarWrapper";
import { NavbarSettingsContext } from "../../contexts/navbarContext";
import { calculateWidth } from "../../utils/calculateWidth";

interface Props {
  contentElements: BasicContentbarWrapper[] | CustomContentbarWrapper[];
  disableStyling?: boolean;
  addable?: boolean;
  jumpToEndOfContentBar?: boolean;
  selectedId: string;
  onClickAddButton?: () => any;
  onClickLeftSlideButton?: () => any;
  onClickRightSlideButton?: () => any;
}

export const ContentBar = (props: Props) => {
  const colorSettingsContext = useContext(ColorSettingsContext);
  const navbarSettingsContext = useContext(NavbarSettingsContext);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const [addButtonHover, setAddButtonHover] = useState(false);
  const [preventInitialJumpToEnd, setPreventInitialJumpToEnd] = useState(true);
  const [slideLeftButtonHover, setSlideLeftButtonHover] = useState(false);

  const [slideRightButtonHover, setSlideRightButtonHover] = useState(false);
  const [width, setWidth] = useState(1880);
  const [startRenderElements, setStartRenderElements] = useState(0);
  const [amountOfRenderedTabElements, setAmountOfRenderedTabElements] =
    useState(navbarSettingsContext?.navbarCollapsed === true ? 6 : 5);

  const contentAreaBackgroundColor =
    colorSettingsContext.currentColors.contentArea.backgroundColor;
  const contentbarBackgroundColor =
    colorSettingsContext.currentColors.contentbar.backgroundColor;
  const buttonDefaultColor =
    colorSettingsContext.currentColors.contentbar.buttonDefaultColor;
  const buttonHoverColor =
    colorSettingsContext.currentColors.contentbar.buttonHoverColor;
  const iconDefaultColor =
    colorSettingsContext.currentColors.contentbar.iconDefaultColor;
  const iconHoverColor =
    colorSettingsContext.currentColors.contentbar.iconHoverColor;

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
      className="flex pt-3 pr-3 pl-3"
      style={{
        height: "56px",
        minHeight: "56px",
        backgroundColor: props.disableStyling
          ? "inherit"
          : contentAreaBackgroundColor,
      }}
    >
      <div
        style={{
          height: "40px",
          minHeight: "40px",
          width: "100%",
          backgroundColor: contentbarBackgroundColor,
        }}
        className="flex align-items-center justify-content-between"
      >
        <div className="flex align-items-center">
          {props.contentElements.length > amountOfRenderedTabElements ? (
            <div
              onMouseEnter={() => setSlideLeftButtonHover(true)}
              onMouseLeave={() => setSlideLeftButtonHover(false)}
              onClick={handleSlideLeftEvent}
              style={{
                height: "40px",
                width: "40px",
                cursor: "pointer",
                backgroundColor: slideLeftButtonHover
                  ? buttonHoverColor
                  : buttonDefaultColor,
              }}
              className="flex justify-content-center align-items-center"
            >
              <i
                className="pi pi-angle-left"
                style={{
                  color: slideLeftButtonHover
                    ? iconHoverColor
                    : iconDefaultColor,
                }}
              />
            </div>
          ) : (
            <></>
          )}

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
                      width - (80 + 32),
                      !!props.addable
                    ),
                    props.selectedId
                  )
                )
            : props.contentElements.map((element) =>
                element.getContentbarElement(
                  calculateWidth(
                    navbarSettingsContext?.navbarCollapsed!,
                    width - (80 + 32),
                    !!props.addable
                  ),
                  props.selectedId
                )
              )}
        </div>
        <div className="flex align-items-center">
          {props.addable ? (
            <div
              onMouseEnter={() => setAddButtonHover(true)}
              onMouseLeave={() => setAddButtonHover(false)}
              onClick={handleOnClickAddEvent}
              style={{
                height: "40px",
                width: "40px",
                cursor: "pointer",
                backgroundColor: addButtonHover
                  ? buttonHoverColor
                  : buttonDefaultColor,
              }}
              className="flex justify-content-center align-items-center"
            >
              <i
                className="pi pi-plus"
                style={{
                  color: addButtonHover ? iconHoverColor : iconDefaultColor,
                }}
              />
            </div>
          ) : (
            <></>
          )}

          {props.contentElements.length > amountOfRenderedTabElements ? (
            <div
              onMouseEnter={() => setSlideRightButtonHover(true)}
              onMouseLeave={() => setSlideRightButtonHover(false)}
              onClick={handleSlideRightEvent}
              style={{
                height: "40px",
                width: "40px",
                cursor: "pointer",
                backgroundColor: slideRightButtonHover
                  ? buttonHoverColor
                  : buttonDefaultColor,
              }}
              className="flex justify-content-center align-items-center"
            >
              <i
                className="pi pi-angle-right"
                style={{
                  color: slideRightButtonHover
                    ? iconHoverColor
                    : iconDefaultColor,
                }}
              />
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
};

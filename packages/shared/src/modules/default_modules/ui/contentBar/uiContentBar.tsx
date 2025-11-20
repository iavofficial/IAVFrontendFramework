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
import {ColorSettingsContext} from "../../../../contexts/colorSettingsContext";
import {
  DEFAULT_ELEMENT_SIZE,
  PADDING_GAB,
} from "../../../../constants/constants";
import {calculateWidth} from "../../../module_orchestration/util/calculateWidth";
import {ContentBarButtonElement} from "../../../module_orchestration/util/contentBarButtonElement";
import {useStyleMap} from "../../../module_orchestration/util/useStyleMap";

export const UIContentBar: React.FC<UIContentBarProps> = (props) => {
  const {
    contentWrappers = [],
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

  const [width, setWidth] = useState(0);
  const [startRenderElements, setStartRenderElements] = useState(0);
  const [amountOfRenderedTabElements, setAmountOfRenderedTabElements] =
    useState(collapsed ? 6 : 5);

  const handleDivResize = useCallback(() => {
    const currentContentRef = contentRef.current;
    if (currentContentRef) setWidth(currentContentRef.clientWidth);
  }, []);

  useEffect(() => {
    handleDivResize();
    window.addEventListener("resize", handleDivResize);
    return () => window.removeEventListener("resize", handleDivResize);
  }, [handleDivResize]);

  const handleSlideLeftEvent = useCallback(() => {
    if (startRenderElements > 0) {
      onClickLeftSlideButton?.();
      setStartRenderElements((s) => s - 1);
    }
  }, [startRenderElements, onClickLeftSlideButton]);

  const handleOnClickAddEvent = useCallback(() => {
    onClickAddButton?.();
  }, [onClickAddButton]);

  const handleSlideRightEvent = useCallback(() => {
    if (
      startRenderElements + amountOfRenderedTabElements <
      contentWrappers.length
    ) {
      onClickRightSlideButton?.();
      setStartRenderElements((s) => s + 1);
    }
  }, [
    amountOfRenderedTabElements,
    contentWrappers.length,
    onClickRightSlideButton,
    startRenderElements,
  ]);

  const isNavbarCollapsed = collapsed ?? false;
  const hasOverflow =
    contentWrappers.length > amountOfRenderedTabElements && width > 0;
  const availableWidth = width - (2 * DEFAULT_ELEMENT_SIZE + 2 * PADDING_GAB);
  const elementWidth = hasOverflow
    ? calculateWidth(isNavbarCollapsed, availableWidth, !!addable, true)
    : calculateWidth(isNavbarCollapsed, availableWidth, !!addable, false);

  return (
    <div
      ref={contentRef}
      id="contentbar"
      className={`flex ${classNames}`}
      style={{
        height: "56px",
        minHeight: "56px",
        overflow: "hidden",
        ...styles,
      }}
    >
      <div
        style={{
          height: `${DEFAULT_ELEMENT_SIZE}px`,
          width: "100%",
          backgroundColor: contentbarBackgroundColor,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          minWidth: 0,
        }}
      >
        <div
          className="flex align-items-center"
          style={{minWidth: 0, gap: PADDING_GAB}}
        >
          <ContentBarButtonElement
            handleOnClickEvent={handleSlideLeftEvent}
            icon="pi pi-angle-left"
            isVisible={contentWrappers.length > amountOfRenderedTabElements}
          />
          <div className="flex" style={{minWidth: 0, gap: PADDING_GAB}}>
            {contentWrappers
              .slice(
                startRenderElements,
                startRenderElements + amountOfRenderedTabElements,
              )
              .map((element) =>
                element.getContentbarElement(
                  elementWidth,
                  selectedId,
                  contentWrappers[0].getId(),
                ),
              )}
          </div>
        </div>
        <div className="flex align-items-center" style={{gap: PADDING_GAB}}>
          <ContentBarButtonElement
            handleOnClickEvent={handleOnClickAddEvent}
            icon="pi pi-plus"
            isVisible={addable}
          />
          <ContentBarButtonElement
            handleOnClickEvent={handleSlideRightEvent}
            icon="pi pi-angle-right"
            isVisible={contentWrappers.length > amountOfRenderedTabElements}
          />
        </div>
      </div>
    </div>
  );
};

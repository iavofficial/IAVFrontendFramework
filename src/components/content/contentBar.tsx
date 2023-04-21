import { Button } from 'primereact/button';
import React, {
  ReactElement,
  useContext,
  useEffect,
  useState,
  useRef,
  useLayoutEffect,
} from 'react';
import '../css/globalColors.css';
import {
  BLACK,
  BLUE0,
  GREY1,
  GREY3,
  GREY4,
  GREY5,
  TAB_HEIGHT,
  WHITE,
} from '../../constants';
import { ColorSettingsContext } from '../../contexts/colorsettings';
import { BasicContentbarWrapper } from './basicContentbarWrapper';
import { ContentbarWrapperInterface } from './contentbarWrapperInterface';
import { CustomContentbarWrapper } from './customContentbarWrapper';
import { DefaultContentSelectionElement } from './defaultContentSelectionElement';
import { NavbarSettingsContext } from '../../contexts/navbarContext';
import { calculateWidth } from '../../services/calculateWidth';

interface Props {
  contentElements: BasicContentbarWrapper[] | CustomContentbarWrapper[];
  addable?: boolean;
  onClose2: (value: string) => any;
  setSelectedId2: (value: string) => any;
  onClickAddButton?: () => any;
  onClickLeftSlideButton?: () => any;
  onClickRightSlideButton?: () => any;
}

export const ContentBar = (props: Props) => {
  const colorSettingsContext = useContext(ColorSettingsContext);
  const navbarSettingsContext = useContext(NavbarSettingsContext);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const [addButtonHover, setAddButtonHover] = useState(false);
  const [slideLeftButtonHover, setSlideLeftButtonHover] = useState(false);
  const [slideRightButtonHover, setSlideRightButtonHover] = useState(false);
  const [width, setWidth] = useState(1880);
  const [startRenderElements, setStartRenderElements] = useState(0);
  const [amountOfRenderedTabElements, setAmountOfRenderedTabElements] =
    useState(navbarSettingsContext?.navbarCollapsed === true ? 6 : 5);

  useEffect(() => {
    if (navbarSettingsContext?.navbarCollapsed === true) {
      setAmountOfRenderedTabElements(6);
      handleWindowResize();
    } else {
      setAmountOfRenderedTabElements(5);
      handleWindowResize();
    }
  }, [navbarSettingsContext?.navbarCollapsed]);

  let highlightColor = colorSettingsContext?.contentbarColorOptions
    ?.buttonColorHighlight
    ? colorSettingsContext?.contentbarColorOptions?.buttonColorHighlight
    : colorSettingsContext?.darkmode
    ? GREY4
    : BLUE0;
  let mainColor = colorSettingsContext?.contentbarColorOptions?.buttonColorMain
    ? colorSettingsContext?.contentbarColorOptions?.buttonColorMain
    : colorSettingsContext?.darkmode
    ? GREY5
    : WHITE;

  let letteringHighlightColor = colorSettingsContext?.contentbarColorOptions
    ?.iconHighlightColor
    ? colorSettingsContext?.contentbarColorOptions?.iconHighlightColor
    : WHITE;
  let letteringMainColor = colorSettingsContext?.contentbarColorOptions
    ?.iconMainColor
    ? colorSettingsContext?.contentbarColorOptions?.iconMainColor
    : colorSettingsContext?.darkmode
    ? GREY3
    : BLACK;

  let renderElementsArray:
    | BasicContentbarWrapper[]
    | CustomContentbarWrapper[] = [];

  if (
    props.contentElements.length >=
    startRenderElements + amountOfRenderedTabElements
  ) {
    renderElementsArray = props.contentElements.slice(
      startRenderElements,
      startRenderElements + amountOfRenderedTabElements
    );
  }

  const handleSlideLeftEvent = () => {
    if (startRenderElements > 0) {
      if (props.onClickLeftSlideButton) {
        props.onClickLeftSlideButton();
      }

      setStartRenderElements(startRenderElements - 1);
    }
  };

  function handleWindowResize() {
    if (contentRef.current !== null) {
      setWidth(contentRef.current.clientWidth);
    }
  }

  useEffect(() => {
    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);

  const handleSlideRightEvent = () => {
    if (
      startRenderElements + amountOfRenderedTabElements <
      props.contentElements.length
    ) {
      if (props.onClickRightSlideButton) {
        props.onClickRightSlideButton();
      }

      setStartRenderElements(startRenderElements + 1);
    }
  };

  const handleOnClickAddEvent = () => {
    if (props.onClickAddButton) props.onClickAddButton();
  };

  return (
    <div
      ref={contentRef}
      id="contentbar"
      className={
        (colorSettingsContext?.darkmode ? 'bg-black' : 'bg-grey-1') +
        ' flex pt-3 pr-3 pl-3'
      }
      style={{
        height: '56px',
        minHeight: '56px',
        backgroundColor:
          colorSettingsContext?.contentColorOptions?.contentBackground,
      }}
    >
      <div
        style={{
          height: '40px',
          minHeight: '40px',
          width: '100%',
          backgroundColor:
            colorSettingsContext?.contentbarColorOptions?.backgroundColor,
        }}
        className={
          (colorSettingsContext?.darkmode ? 'bg-grey-5' : 'bg-white-1') +
          ' flex align-items-center justify-content-between'
        }
      >
        <div className="flex align-items-center">
          {props.contentElements.length > amountOfRenderedTabElements ? (
            <div
              onMouseEnter={() => setSlideLeftButtonHover(true)}
              onMouseLeave={() => setSlideLeftButtonHover(false)}
              onClick={handleSlideLeftEvent}
              style={{
                height: '40px',
                width: '40px',
                cursor: 'pointer',
                backgroundColor: slideLeftButtonHover
                  ? highlightColor
                  : mainColor,
              }}
              className="flex justify-content-center align-items-center"
            >
              <i
                className="pi pi-angle-left"
                style={{
                  color: slideLeftButtonHover
                    ? letteringHighlightColor
                    : letteringMainColor,
                }}
              />
            </div>
          ) : (
            <></>
          )}

          {props.contentElements.length > amountOfRenderedTabElements
            ? renderElementsArray.map((element) =>
                element.getContentbarComponent(
                  calculateWidth(
                    navbarSettingsContext?.navbarCollapsed!,
                    width - (80 + 32),
                    props.addable as boolean
                  )
                )
              )
            : props.contentElements.map((element) =>
                element.getContentbarComponent(
                  calculateWidth(
                    navbarSettingsContext?.navbarCollapsed!,
                    width - (80 + 32),
                    props.addable as boolean
                  )
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
                height: '40px',
                width: '40px',
                cursor: 'pointer',
                backgroundColor: addButtonHover ? highlightColor : mainColor,
              }}
              className="flex justify-content-center align-items-center"
            >
              <i
                className="pi pi-plus"
                style={{
                  color: addButtonHover
                    ? letteringHighlightColor
                    : letteringMainColor,
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
                height: '40px',
                width: '40px',
                cursor: 'pointer',
                backgroundColor: slideRightButtonHover
                  ? highlightColor
                  : mainColor,
              }}
              className="flex justify-content-center align-items-center"
            >
              <i
                className="pi pi-angle-right"
                style={{
                  color: slideRightButtonHover
                    ? letteringHighlightColor
                    : letteringMainColor,
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

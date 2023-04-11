import { Button } from 'primereact/button';
import React, { ReactElement, useContext, useState } from 'react';
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

interface Props {
  contentElements: BasicContentbarWrapper[] | CustomContentbarWrapper[];
  addable?: boolean;
  setSelectedId2: (value: string) => any;
  onClickAddButton?: () => any;
  onClickLeftSlideButton?: () => any;
  onClickRightSlideButton?: () => any;
  style: {
    backgroundColor?: string;
  };
}

export const ContentBar = (props: Props) => {
  const colorSettingsContext = useContext(ColorSettingsContext);
  const [addButtonHover, setAddButtonHover] = useState(false);
  const [slideLeftButtonHover, setSlideLeftButtonHover] = useState(false);
  const [slideRightButtonHover, setSlideRightButtonHover] = useState(false);
  const [startRenderElements, setStartRenderElements] = useState(0);
  const [endRenderElements, setEndRenderElements] = useState(5);

  //TODO: implement the opportunity to set an own colorset
  let highlightColor = colorSettingsContext?.darkmode ? GREY4 : BLUE0;
  let mainColor = colorSettingsContext?.darkmode ? GREY5 : WHITE;

  let letteringHighlightColor = WHITE;
  let letteringMainColor = colorSettingsContext?.darkmode ? GREY3 : BLACK;

  let renderElementsArray:
    | BasicContentbarWrapper[]
    | CustomContentbarWrapper[] = [];

  if (props.contentElements.length > 5) {
    renderElementsArray = props.contentElements.slice(
      startRenderElements,
      endRenderElements
    );
  }

  const handleSlideLeftEvent = () => {
    if (startRenderElements > 0) {
      if (props.onClickLeftSlideButton) {
        props.onClickLeftSlideButton();
      }

      setStartRenderElements(startRenderElements - 1);
      setEndRenderElements(endRenderElements - 1);
    }
  };

  const handleSlideRightEvent = () => {
    if (endRenderElements < props.contentElements.length) {
      if (props.onClickRightSlideButton) {
        props.onClickRightSlideButton();
      }

      setStartRenderElements(startRenderElements + 1);
      setEndRenderElements(endRenderElements + 1);
    }
  };

  const handleOnClickAddEvent = () => {
    if (props.onClickAddButton) props.onClickAddButton();
  };

  return (
    <div
      className={
        (colorSettingsContext?.darkmode ? 'bg-black' : 'bg-grey-1') +
        ' flex pt-3 pr-3 pl-3'
      }
      style={{
        height: '56px',
        minHeight: '56px',
        backgroundColor: props.style.backgroundColor,
      }}
    >
      <div
        style={{
          height: '40px',
          minHeight: '40px',
          width: '100%',
        }}
        className={
          (colorSettingsContext?.darkmode ? 'bg-grey-5' : 'bg-white') +
          ' flex align-items-center justify-content-between'
        }
      >
        <div className="flex align-items-center">
          {props.contentElements.length > 5 ? (
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

          {props.contentElements.length > 5
            ? renderElementsArray.map((element) =>
                element.getContentbarComponent(
                  <DefaultContentSelectionElement
                    setSelectedId3={props.setSelectedId2}
                  />
                )
              )
            : props.contentElements.map((element) =>
                element.getContentbarComponent(
                  <DefaultContentSelectionElement
                    setSelectedId3={props.setSelectedId2}
                  />
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

          {props.contentElements.length > 5 ? (
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

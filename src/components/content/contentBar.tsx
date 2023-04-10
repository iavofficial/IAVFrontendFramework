import { Button } from 'primereact/button';
import React, { ReactElement, useState } from 'react';

import { BLUE0, GRAY1, TAB_HEIGHT, WHITE } from '../../constants';
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
  const [addButtonHover, setAddButtonHover] = useState(false);
  const [slideLeftButtonHover, setSlideLeftButtonHover] = useState(false);
  const [slideRightButtonHover, setSlideRightButtonHover] = useState(false);
  const [startRenderElements, setStartRenderElements] = useState(0);
  const [endRenderElements, setEndRenderElements] = useState(5);

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
      className="flex pt-3 pr-3 pl-3"
      style={{
        height: '56px',
        minHeight: '56px',
        backgroundColor: props.style.backgroundColor
          ? props.style.backgroundColor
          : GRAY1,
      }}
    >
      <div
        style={{
          height: '40px',
          minHeight: '40px',
          width: '100%',
          backgroundColor: props.style.backgroundColor
            ? props.style.backgroundColor
            : WHITE,
        }}
        className="flex align-items-center"
      >
        {props.contentElements.length > 5 ? (
          <div
            onMouseEnter={() => setSlideLeftButtonHover(true)}
            onMouseLeave={() => setSlideLeftButtonHover(false)}
            onClick={handleSlideLeftEvent}
            style={{
              height: '40px',
              width: '40px',
              cursor: 'pointer',
              backgroundColor: slideLeftButtonHover ? BLUE0 : WHITE,
            }}
            className="flex justify-content-center align-items-center"
          >
            <i
              className="pi pi-angle-left"
              style={{ color: slideLeftButtonHover ? WHITE : 'black' }}
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
        {props.addable ? (
          <div
            onMouseEnter={() => setAddButtonHover(true)}
            onMouseLeave={() => setAddButtonHover(false)}
            onClick={handleOnClickAddEvent}
            style={{
              height: '40px',
              width: '40px',
              cursor: 'pointer',
              backgroundColor: addButtonHover ? BLUE0 : WHITE,
            }}
            className="flex justify-content-center align-items-center"
          >
            <i
              className="pi pi-plus"
              style={{ color: addButtonHover ? WHITE : 'black' }}
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
              backgroundColor: slideRightButtonHover ? BLUE0 : WHITE,
            }}
            className="flex justify-content-center align-items-center"
          >
            <i
              className="pi pi-angle-right"
              style={{ color: slideRightButtonHover ? WHITE : 'black' }}
            />
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

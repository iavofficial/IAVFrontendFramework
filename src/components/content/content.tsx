import React, { ReactElement, useContext } from 'react';
import '../css/globalColors.css';
import { ContentBar } from './contentBar';
import { GREY1 } from '../../constants';
import { BasicContentbarWrapper } from './basicContentbarWrapper';
import { CustomContentbarWrapper } from './customContentbarWrapper';
import { ColorSettingsContext } from '../../contexts/colorsettings';

export interface Props {
  contentElements: BasicContentbarWrapper[] | CustomContentbarWrapper[];
  layoutBehaviour?: LayoutBehaviour;
  setSelectedId1: (value: string) => void;
  addable?: boolean;
  backgroundColorContentBar?: string;
  backgroundColorContent?: string;
  onClickAddButton: () => any;
  onClickLeftSlideButton?: () => any;
  onClickRightSlideButton?: () => any;
}

export const Content = (props: React.PropsWithChildren<Props>) => {
  const colorSettingsContext = useContext(ColorSettingsContext);

  let contentRootClass = '';
  switch (props.layoutBehaviour) {
    case LayoutBehaviour.NONE:
      break;
    case LayoutBehaviour.GRID:
      contentRootClass = 'grid grid-nogutter';
      break;
    case LayoutBehaviour.FLEX:
      contentRootClass = 'flex';
      break;
    case LayoutBehaviour.FLEX_COL:
      contentRootClass = 'flex flex-column';
      break;
  }

  return (
    <div
      className="flex flex-column"
      style={{ width: '100%', overflow: 'auto' }}
    >
      {props.contentElements.length < 1 ? (
        <></>
      ) : (
        <ContentBar
          setSelectedId2={props.setSelectedId1}
          onClickLeftSlideButton={props.onClickLeftSlideButton}
          onClickRightSlideButton={props.onClickRightSlideButton}
          onClickAddButton={props.onClickAddButton}
          addable={props.addable}
          contentElements={props.contentElements}
          style={{ backgroundColor: props.backgroundColorContentBar }}
        />
      )}

      <div
        className={
          contentRootClass +
          (colorSettingsContext?.darkmode ? ' bg-black' : ' bg-grey-1')
        }
        style={{
          height: '100%',
          backgroundColor: props.backgroundColorContent,
          overflow: 'auto',
        }}
      >
        {props.children}
      </div>
    </div>
  );
};

export enum LayoutBehaviour {
  /**
   * parent div of content will have no specific layout class
   */
  NONE,
  /**
   * parent div will be prime react grid
   */
  GRID,
  /**
   * parent will be flexbox
   */
  FLEX,
  /**
   * parent will be flexbox column
   */
  FLEX_COL,
}

import React, { ReactElement } from 'react';
import { ContentBar } from './contentBar';
import { GRAY1 } from '../../constants';
import { BasicContentbarWrapper } from './basicContentbarWrapper';
import { CustomContentbarWrapper } from './customContentbarWrapper';

export interface Props {
  contentElements: BasicContentbarWrapper[] | CustomContentbarWrapper[];
  layoutBehaviour?: LayoutBehaviour;
  backgroundColorContentBar?: string;
  backgroundColorContent?: string;
}

export const Content = (props: React.PropsWithChildren<Props>) => {
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
        <React.Fragment />
      ) : (
        <ContentBar
          contentElements={props.contentElements}
          style={{ backgroundColor: props.backgroundColorContentBar }}
        />
      )}

      <div
        className={contentRootClass}
        style={{
          height: '100%',
          backgroundColor: props.backgroundColorContent
            ? props.backgroundColorContent
            : GRAY1,
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

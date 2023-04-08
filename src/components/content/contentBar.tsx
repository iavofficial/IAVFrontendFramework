import React, { ReactElement } from 'react';

import { GRAY1, TAB_HEIGHT, WHITE } from '../../constants';
import { BasicContentbarWrapper } from './basicContentbarWrapper';
import { ContentbarWrapperInterface } from './contentbarWrapperInterface';
import { CustomContentbarWrapper } from './customContentbarWrapper';

interface Props {
  contentElements: BasicContentbarWrapper[] | CustomContentbarWrapper[];
  style: {
    backgroundColor?: string;
  };
}

export const ContentBar = (props: Props) => {
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
        className="flex"
      >
        {props.contentElements.map((element: ContentbarWrapperInterface) =>
          element.getContentbarComponent()
        )}
      </div>
    </div>
  );
};

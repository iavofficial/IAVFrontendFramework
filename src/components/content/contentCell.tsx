import React, { CSSProperties, PropsWithChildren, useContext } from 'react';
import '../css/globalColors.css';
import { WHITE } from '../../constants';
import { ColorSettingsContext } from '../../contexts/colorsettings';

export enum CellPaddings {
  FULL,
  VERT_RIGHT,
  BOT_HOR,
  BOT_RIGHT,
  NONE,
}

export interface Props {
  height?: string;
  colWidth?: number;
  clearStyle?: boolean;
  paddings: CellPaddings;
  style?: {
    backgroundColor?: string;
  };
}

export function ContentCell(props: PropsWithChildren<Props>) {
  const colorSettingsContext = useContext(ColorSettingsContext);
  let paddings = '';
  switch (props.paddings) {
    case CellPaddings.FULL:
      paddings = 'p-3';
      break;
    case CellPaddings.VERT_RIGHT:
      paddings = 'py-3 pr-3';
      break;
    case CellPaddings.BOT_HOR:
      paddings = 'pb-3 px-3';
      break;
    case CellPaddings.BOT_RIGHT:
      paddings = 'pb-3 pr-3';
      break;
  }
  let columnClass: string;
  if (props.colWidth) {
    columnClass = 'col-' + props.colWidth;
  } else {
    columnClass = 'col';
  }

  let innerDivStyle: CSSProperties = {
    width: '100%',
  };
  if (!props.clearStyle) {
    innerDivStyle.backgroundColor = WHITE;
  }
  if (props.style?.backgroundColor) {
    innerDivStyle.backgroundColor = props.style.backgroundColor;
  }

  return (
    <div className={columnClass}>
      <div className={'flex ' + paddings} style={{ height: '100%' }}>
        <div
          className={colorSettingsContext?.darkmode ? 'bg-grey-5' : 'bg-white'}
          style={innerDivStyle}
        >
          {props.children}
        </div>
      </div>
    </div>
  );
}

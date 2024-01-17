import React, { CSSProperties, PropsWithChildren, useContext } from 'react';
import '../css/globalColors.css';
import { GREY5, WHITE } from '../../constants';
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
    innerDivStyle.backgroundColor = colorSettingsContext?.darkmode
      ? GREY5
      : WHITE;
  }
  if (colorSettingsContext?.colorOptions.contentColorOptions?.contentCellBackground) {
    innerDivStyle.backgroundColor =
      colorSettingsContext?.colorOptions.contentColorOptions?.contentCellBackground;
  }

  return (
    <div className={columnClass}>
      <div className={'flex ' + paddings} style={{ height: '100%' }}>
        <div
          style={innerDivStyle}
          className={
            colorSettingsContext?.darkmode ? 'color-white' : 'color-black'
          }
        >
          {props.children}
        </div>
      </div>
    </div>
  );
}

import React, { ReactElement, useCallback, useContext, useState } from 'react';
import { BLACK, BLUE0, GREY3, GREY4, GREY5, WHITE } from '../../constants';
import { generateHashOfLength } from '../../services/hash';
import { Tooltip } from 'primereact/tooltip';
import './contentbar.css';
import { ColorSettingsContext } from '../../contexts/colorsettings';

export interface Props {
  name?: string;
  width: number;
  id?: string;
  selected?: boolean;
  closable?: boolean;
  onClose: (value: string) => void;
  setSelectedId: (value: string) => any;
}

export const DefaultContentSelectionElement = (props: Props) => {
  const [hovering, setHovering] = useState(false);
  const colorSettingsContext = useContext(ColorSettingsContext);

  let highlightColor = colorSettingsContext?.contentbarTabColorOptions
    ?.highlightColor
    ? colorSettingsContext?.contentbarTabColorOptions?.highlightColor
    : colorSettingsContext?.darkmode
    ? GREY3
    : BLUE0;
  let mainColor = colorSettingsContext?.contentbarTabColorOptions?.mainColor
    ? colorSettingsContext?.contentbarTabColorOptions?.mainColor
    : colorSettingsContext?.darkmode
    ? GREY5
    : WHITE;

  let letteringHighlightColor = colorSettingsContext?.contentbarTabColorOptions
    ?.textHighlightColor
    ? colorSettingsContext?.contentbarTabColorOptions?.textHighlightColor
    : WHITE;
  let letteringMainColor = colorSettingsContext?.contentbarTabColorOptions
    ?.textMainColor
    ? colorSettingsContext?.contentbarTabColorOptions?.textMainColor
    : colorSettingsContext?.darkmode
    ? GREY3
    : BLACK;

  let iconHighlightColor = colorSettingsContext?.contentbarTabColorOptions
    ?.iconHighlightColor
    ? colorSettingsContext?.contentbarTabColorOptions?.iconHighlightColor
    : WHITE;
  let iconMainColor = colorSettingsContext?.contentbarTabColorOptions
    ?.iconMainColor
    ? colorSettingsContext?.contentbarTabColorOptions?.iconMainColor
    : colorSettingsContext?.darkmode
    ? GREY3
    : BLACK;

  let widthvalue = props.width.toString() + 'px';
  const tabStyle = {
    cursor: props.selected ? 'default' : 'pointer',
    backgroundColor: props.selected || hovering ? highlightColor : mainColor,
    color:
      props.selected || hovering ? letteringHighlightColor : letteringMainColor,
    height: '40px',
    width: widthvalue,
    alignItems: 'center',
    borderRight:
      '1px solid ' + (colorSettingsContext?.darkmode ? GREY5 : WHITE),
  };

  const closingIconStyle = {
    color: props.selected || hovering ? iconHighlightColor : iconMainColor,
    marginRight: '8px',
  };

  const handleOnCloseEvent = (e: any) => {
    e.stopPropagation();
    if (props.onClose) {
      props.onClose(props.id!);
    }
  };

  const handleOnClickEvent = (value: string) => {
    if (props.setSelectedId) {
      props.setSelectedId(value);
    }
  };

  const identifier = generateHashOfLength(4);
  const identifierLegal = 'a' + identifier;
  const identifierWithDot = '.' + identifierLegal;

  return (
    <>
      <div
        className={'flex align-items-center element-hover'}
        style={tabStyle}
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
        onClick={() => handleOnClickEvent(props.id!)}
      >
        {props.name!.length >= 20 ? (
          <div
            style={{
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            className={identifierLegal}
          >
            <span className={'m-auto font-semibold '}>
              {props.name!.slice(0, 20) + '...'}
            </span>
            <Tooltip
              id="change-color"
              content={props.name!}
              target={identifierWithDot}
            />
          </div>
        ) : (
          <div className={'m-auto font-semibold '}>{props.name}</div>
        )}
        {props.closable ? (
          <div style={{ position: 'absolute', right: '5px' }}>
            <i
              onClick={(event) => handleOnCloseEvent(event)}
              style={closingIconStyle}
              className="pi pi-times tabelements-only"
            />
          </div>
        ) : (
          <></>
        )}
      </div>
    </>
  );
};

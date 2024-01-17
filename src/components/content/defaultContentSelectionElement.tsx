import React, { useContext, useState } from 'react';
import { BLACK, BLUE0, GREY3, GREY5, WHITE } from '../../constants';
import { generateHashOfLength } from '../../utils/hash';
import { Tooltip } from 'primereact/tooltip';
import './contentbar.css';
import { ColorSettingsContext } from '../../contexts/colorsettings';
import { TranslationFunction } from '../../types/translationFunction';
import { useTranslator } from '../internationalization/translators';

export interface Props {
  displayName: string | TranslationFunction;
  width: number;
  id: string;
  selected?: boolean;
  closable?: boolean;
  onClose?: (value: string) => void;
  setSelectedId: (value: string) => any;
}

export const DefaultContentSelectionElement = (props: Props) => {
  const [hovering, setHovering] = useState(false);
  const translationFunction = useTranslator();
  const colorSettingsContext = useContext(ColorSettingsContext);

  const name = typeof props.displayName === "string"? props.displayName : props.displayName(translationFunction);

  let highlightColor = colorSettingsContext?.colorOptions.contentbarTabColorOptions
    ?.highlightColor
    ? colorSettingsContext?.colorOptions.contentbarTabColorOptions?.highlightColor
    : colorSettingsContext?.darkmode
    ? GREY3
    : BLUE0;
  let mainColor = colorSettingsContext?.colorOptions.contentbarTabColorOptions?.mainColor
    ? colorSettingsContext?.colorOptions.contentbarTabColorOptions?.mainColor
    : colorSettingsContext?.darkmode
    ? GREY5
    : WHITE;

  let letteringHighlightColor = colorSettingsContext?.colorOptions.contentbarTabColorOptions
    ?.textHighlightColor
    ? colorSettingsContext?.colorOptions.contentbarTabColorOptions?.textHighlightColor
    : WHITE;
  let letteringMainColor = colorSettingsContext?.colorOptions.contentbarTabColorOptions
    ?.textMainColor
    ? colorSettingsContext?.colorOptions.contentbarTabColorOptions?.textMainColor
    : colorSettingsContext?.darkmode
    ? GREY3
    : BLACK;

  let iconHighlightColor = colorSettingsContext?.colorOptions.contentbarTabColorOptions
    ?.iconHighlightColor
    ? colorSettingsContext?.colorOptions.contentbarTabColorOptions?.iconHighlightColor
    : WHITE;
  let iconMainColor = colorSettingsContext?.colorOptions.contentbarTabColorOptions
    ?.iconMainColor
    ? colorSettingsContext?.colorOptions.contentbarTabColorOptions?.iconMainColor
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
        {props.displayName.length >= 20 ? (
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
              {name.slice(0, 20) + '...'}
            </span>
            <Tooltip
              id="change-color"
              content={name}
              target={identifierWithDot}
            />
          </div>
        ) : (
          <div className={'m-auto font-semibold '}>{name}</div>
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
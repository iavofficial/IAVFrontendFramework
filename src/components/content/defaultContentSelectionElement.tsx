import { ReactElement, useState } from 'react';
import React from 'react';
import { Button } from 'primereact/button';
import { ContextMenu } from 'primereact/contextmenu';
import { BLACK, BLUE0, WHITE } from '../../constants';
import { generateHashOfLength } from '../../services/hash';
import { Tooltip } from 'primereact/tooltip';
import './contentbar.css';

export interface Props {
  name?: string;
  id?: string;
  selected?: boolean;
  closable?: boolean;
  onClose?: () => void;
  setSelectedId3: (value: string) => any;
}

export const DefaultContentSelectionElement = (props: Props) => {
  const [hovering, setHovering] = useState(false);

  const tabStyle = {
    cursor: props.selected ? 'default' : 'pointer',
    backgroundColor: props.selected || hovering ? BLUE0 : WHITE,
    color: props.selected || hovering ? WHITE : BLACK,
    height: '40px',
    width: '280px',
    alignItems: 'center',
    borderRight: '1px solid ' + WHITE,
  };

  const closingIconStyle = {
    color: props.selected || hovering ? WHITE : BLACK,
    marginRight: '8px',
  };

  const handleOnCloseEvent = (e: any) => {
    e.stopPropagation();
    if (props.onClose) {
      props.onClose();
    }
  };

  const handleOnClickEvent = (value: string) => {
    if (props.setSelectedId3) {
      props.setSelectedId3(value);
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
              onClick={handleOnCloseEvent}
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

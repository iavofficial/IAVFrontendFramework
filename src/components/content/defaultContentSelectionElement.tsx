import { useState } from 'react';
import React from 'react';
import { Button } from 'primereact/button';
import { ContextMenu } from 'primereact/contextmenu';
import { BLACK, BLUE0, WHITE } from '../../constants';
import { generateHashOfLength } from '../../services/hash';
import { Tooltip } from 'primereact/tooltip';
import './contentbar.css';

export interface Props {
  name: string;
  id: string;
  onClick: (identifier: string) => any;
  selected: boolean;
  closable: boolean;
  onClose(): void;
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

  const closeElement = (e: any) => {
    console.log('triggerd');

    e.stopPropagation();
    props.onClose();
  };

  const identifier = generateHashOfLength(4);
  const identifierLegal = 'a' + identifier;
  const identifierWithDot = '.' + identifierLegal;

  console.log('referenz: ', () => props.onClose);

  return (
    <>
      <div
        className={'flex align-items-center element-hover'}
        style={tabStyle}
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
        onClick={() => {
          () => props.onClick(props.id);
        }}
      >
        {props.name.length >= 20 ? (
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
              {props.name.slice(0, 20) + '...'}
            </span>
            <Tooltip
              id="change-color"
              content={props.name}
              target={identifierWithDot}
            />
          </div>
        ) : (
          <div className={'m-auto font-semibold '}>{props.name}</div>
        )}
        {props.closable ? (
          <div style={{ position: 'absolute', right: '5px' }}>
            <i
              onClick={props.onClose}
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

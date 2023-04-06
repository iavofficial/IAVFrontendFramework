import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Tooltip } from 'primereact/tooltip';
import { BLUE0, GRAY2, GRAY4, TAB_HEIGHT, WHITE } from '../../../constants';
import { useTranslator } from '../../internationalization/translators';
import './tabs.scss';
import { generateHashForLength } from '../../../services/hash';
import { navbarTab } from './navbarTab';
import { LAYER } from './tabLayer';
import {
  calculateFirstLineTabLayer,
  calculateFirstLineTabLayerBottom,
  calculateSecondLineTabLayer,
  calculateSecondLineTabLayerBottom,
} from '../../../services/calculateLineColorTab';
import { revertColor } from '../../../services/calculateLineColorGroup';

export interface Props {
  firstLayerCollabsed?: boolean;
  secondLayerCollabsed?: boolean;
  lastElementFirstLayer?: boolean;
  lastElementSecondLayer?: boolean;
}

export const SimpleNavbarTab: navbarTab<Props> = (props) => {
  const [hovering, setHovering] = useState(false);
  const t = useTranslator();
  const active = useLocation().pathname === props.to;

  const styleActiveLineFirstLayerTop = {
    marginRight: '2px',
    marginLeft: '3px',

    width: '2px',
    height: '40px',
    backgroundColor:
      hovering || active
        ? revertColor(
            calculateFirstLineTabLayer(props.layer as LAYER, props.collapsed),
            BLUE0,
            WHITE
          )
        : calculateFirstLineTabLayer(props.layer as LAYER, props.collapsed),
  };

  const styleActiveLineFirstLayerBottom = {
    marginRight: '2px',
    marginLeft: '3px',
    width: '2px',
    height: '16px',
    backgroundColor: calculateFirstLineTabLayerBottom(
      props.collapsed as boolean,
      props.isLastElementOfLayer as boolean,
      props.layer as LAYER
    ),
  };

  const styleActiveLineSecondLayerTop = {
    heigth: '40px',
    width: '2px',
    marginRight: '3px',
    backgroundColor:
      hovering || active
        ? revertColor(
            calculateSecondLineTabLayer(props.layer as LAYER, props.collapsed),
            BLUE0,
            WHITE
          )
        : calculateSecondLineTabLayer(props.layer as LAYER, props.collapsed),
  };

  const styleActiveLineSecondLayerBottom = {
    heigth: '16px',
    width: '2px',
    marginRight: '3px',
    backgroundColor: calculateSecondLineTabLayerBottom(
      props.collapsed as boolean,
      props.isLastElementOfLayer as boolean,
      props.layer as LAYER
    ),
  };

  const tabStyleDefault = {
    height: '40px',
    width: props.navbarCollapsed ? '40px' : '240px',
    cursor: active || props.disabled ? 'default' : 'pointer',
    backgroundColor: (active || hovering) && !props.disabled ? BLUE0 : 'white',
    color: (active || hovering) && !props.disabled ? 'white' : 'black',
    opacity: props.disabled ? 0.5 : 1,
  };

  const identifier = generateHashForLength(4);
  const identifierLegal = 'a' + identifier;
  const identifierWithDot = '.' + identifierLegal;

  const navbarTab = props.navbarCollapsed ? (
    <div
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      className="flex align-items-center"
      style={tabStyleDefault}
    >
      <div style={styleActiveLineFirstLayerTop} />
      <div id="secondActiveLine" style={styleActiveLineSecondLayerTop} />
      <img
        style={{ width: '24px', height: '24px', objectFit: 'contain' }}
        className={identifierLegal}
        src={
          (active || hovering) && !props.disabled
            ? props.selectedIcon.valueOf()
            : props.deselectedIcon.valueOf()
        }
      />

      <Tooltip
        content={props.name instanceof Function ? props.name(t) : props.name}
        target={identifierWithDot}
        id="hover-image"
      />
    </div>
  ) : (
    <div
      className="flex "
      style={tabStyleDefault}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      <div style={styleActiveLineFirstLayerTop} />
      <div style={styleActiveLineSecondLayerTop} />

      <div style={{ width: '228px' }} className="flex align-items-center">
        <img
          src={
            (active || hovering) && !props.disabled
              ? props.selectedIcon.valueOf()
              : props.deselectedIcon.valueOf()
          }
          style={{ width: '24px', height: '24px', objectFit: 'contain' }}
        />
        <span id="navbar-tab-name">
          {props.name instanceof Function ? props.name(t) : props.name}
        </span>
      </div>
    </div>
  );

  return (
    <>
      {props.disabled ? (
        <>
          {navbarTab}
          <div
            className="flex"
            style={{ width: props.navbarCollapsed ? '40px' : '240px' }}
          >
            <div style={styleActiveLineFirstLayerBottom} />
            <div style={styleActiveLineSecondLayerBottom} />
            <div style={{ width: '100%' }} />
          </div>
        </>
      ) : (
        <>
          <Link style={{ textDecoration: 'none' }} to={props.to.valueOf()}>
            {navbarTab}
          </Link>
          <div
            className="flex"
            style={{
              width: props.navbarCollapsed ? '40px' : '240px',
              height: '16px',
            }}
          >
            <div style={styleActiveLineFirstLayerBottom} />
            <div style={styleActiveLineSecondLayerBottom} />
            <div
              style={{
                width: props.navbarCollapsed ? '28px' : '228px',
              }}
            />
          </div>
        </>
      )}
    </>
  );
};

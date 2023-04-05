import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Tooltip } from 'primereact/tooltip';
import { BLUE0, GRAY2, GRAY4, TAB_HEIGHT, WHITE } from '../../../constants';
import { useTranslator } from '../../internationalization/translators';
import './tabs.scss';
import { generateHashForLength } from '../../../services/hash';
import {
  calculateLineColorForTabs,
  calculateLineForFirstTabLayer,
  calculateLineForTabBottom,
} from '../../../services/calculateLineColorTab';
import { SpaceBetweenElement } from './spaceBetweenElement';
import { navbarTab } from './navbarTab';
import { LAYER } from './tabLayer';

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

  console.log('hier dein layer: ', props.layer);

  const styleActiveLineFirstLayerTop = {
    marginRight: '2px',
    marginLeft: '3px',

    width: '2px',
    height: '40px',
    backgroundColor:
      props.layer === LAYER.ONE
        ? calculateLineForFirstTabLayer(hovering, active)
        : BLUE0,
    // : calculateLineColorForTabs(
    //     hovering,
    //     active,
    //     false,
    //     props.layer as LAYER
    //   ),
  };

  const styleActiveLineFirstLayerBottom = {
    marginRight: '2px',
    marginLeft: '3px',
    width: '2px',
    height: '16px',
    backgroundColor: calculateLineForTabBottom(props.layer as LAYER),
  };

  const styleActiveLineSecondLayerTop = {
    heigth: '40px',
    width: '2px',
    marginRight: '3px',
    backgroundColor:
      props.layer === LAYER.ONE
        ? calculateLineForFirstTabLayer(hovering, active)
        : BLUE0,
    // : calculateLineColorForTabs(
    //     hovering,
    //     active,
    //     false,
    //     props.layer as LAYER
    //   ),
  };

  const styleActiveLineSecondLayerBottom = {
    heigth: '16px',
    width: '2px',
    marginRight: '3px',
    backgroundColor: calculateLineForTabBottom(props.layer as LAYER),
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

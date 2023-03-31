import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Tooltip } from 'primereact/tooltip';
import { BLUE0, GRAY2, GRAY4, TAB_HEIGHT, WHITE } from '../../../constants';
import { useTranslator } from '../../internationalization/translators';
import './tabs.scss';
import { generateHashForLength } from '../../../services/hash';
import { NavbarPropsForTabType } from './navbarTabTypes';
import { isNavbarTabType } from '../../mainView';
import { calculateLineColorForTabs } from '../../../services/calculateLineColor';
import { SpaceBetweenElement } from './spaceBetweenElement';

export interface Props {
  navbarCollabsed: boolean;
  firstLayerCollabsed: boolean;
  secondLayerCollabsed: boolean;
  lastElementFirstLayer?: boolean;
  lastElementSecondLayer?: boolean;
}

export const NavbarTab: NavbarPropsForTabType<Props> = (props) => {
  const [hovering, setHovering] = useState(false);
  const t = useTranslator();
  const active = useLocation().pathname === props.to;

  const styleActiveLineFirstLayer = {
    marginRight: '3px',
    backgroundColor: calculateLineColorForTabs(
      hovering,
      active,
      props.firstLayerCollabsed
    ),
  };

  const styleActiveLineSecondLayer = {
    heigth: '100%',
    width: '2px',
    marginRight: '3px',
    backgroundColor: calculateLineColorForTabs(
      hovering,
      active,
      props.secondLayerCollabsed
    ),
  };

  const tabStyleDefault = {
    height: TAB_HEIGHT,
    width: props.navbarCollabsed ? '40px' : '240px',
    cursor: active || props.disabled ? 'default' : 'pointer',
    backgroundColor: (active || hovering) && !props.disabled ? BLUE0 : 'white',
    color: (active || hovering) && !props.disabled ? 'white' : 'black',
    opacity: props.disabled ? 0.5 : 1,
  };
  const identifier = generateHashForLength(4);
  const identifierLegal = 'a' + identifier;
  const identifierWithDot = '.' + identifierLegal;

  const navbarTab = props.navbarCollabsed ? (
    <div
      className="flex align-items-center justify-content-start generalTab-collabsed"
      style={tabStyleDefault}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      {' '}
      <div id="navbarTab-collabsed-line" style={styleActiveLineFirstLayer} />
      <div style={styleActiveLineSecondLayer} />
      <img
        style={{ width: '24px' }}
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
    <div id="navbar-tab-with-childtabs" style={{ borderColor: GRAY2 }}>
      <div
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
        className="flex align-items-center justify-content-between"
        id="navbartab-general"
        style={tabStyleDefault}
      >
        <div className="flex" style={{ height: '100%' }}>
          <div
            id="navbarTab-collabsed-line"
            style={styleActiveLineFirstLayer}
          />
          <div style={styleActiveLineSecondLayer} />
          <div className="flex align-items-center">
            <img
              src={
                (active || hovering) && !props.disabled
                  ? props.selectedIcon.valueOf()
                  : props.deselectedIcon.valueOf()
              }
              alt=""
            />
            <span id="navbar-tab-name">
              {props.name instanceof Function ? props.name(t) : props.name}
            </span>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {props.disabled ? (
        <>
          {navbarTab}
          <SpaceBetweenElement
            navbarCollabsed={props.navbarCollabsed}
            firstLayerCollabsed={props.firstLayerCollabsed}
            secondLayerCollabsed={props.secondLayerCollabsed}
            lastElementFirstLayer={props.lastElementFirstLayer}
            lastElementSecondLayer={props.lastElementSecondLayer}
          />
        </>
      ) : (
        <Link style={{ textDecoration: 'none' }} to={props.to.valueOf()}>
          {navbarTab}
          <SpaceBetweenElement
            navbarCollabsed={props.navbarCollabsed}
            firstLayerCollabsed={props.firstLayerCollabsed}
            secondLayerCollabsed={props.secondLayerCollabsed}
            lastElementFirstLayer={props.lastElementFirstLayer}
            lastElementSecondLayer={props.lastElementSecondLayer}
          />
        </Link>
      )}
    </>
  );
};

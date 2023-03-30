import React, { useState } from 'react';
import { TranslateFunctionType } from '../../../contexts/language';
import { useTranslator } from '../../internationalization/translators';
import { Link, useLocation } from 'react-router-dom';
import { BLUE0, TAB_HEIGHT } from '../../../constants';
import './tabs.scss';
import { Tooltip } from 'primereact/tooltip';
import submenuLayer3Selected from '../../../assets/images/submenu_layer3_selected.svg';
import submenuLayer3Deselected from '../../../assets/images/submenu_layer3_deselected.svg';
import { generateHashForLength } from '../../../services/hash';

export interface Props {
  name: string | ((t: TranslateFunctionType) => string);
  to: string;
  navbarCollabsed: boolean;
}

export const ThirdLayerNavbarTab = (props: Props) => {
  const t = useTranslator();
  const active = useLocation().pathname === props.to;
  const [hovering, setHovering] = useState(false);

  const tabStyleDefault = {
    height: TAB_HEIGHT,
    width: props.navbarCollabsed ? '40px' : '240px',
    marginBottom: '16px',
    backgroundColor: active || hovering ? BLUE0 : 'white',
    color: active || hovering ? 'white' : 'black',
    opacity: 1,
  };

  const identifier = generateHashForLength(4);
  const identifierLegal = 'a' + identifier;
  const identifierWithDot = '.' + identifierLegal;

  const tab = props.navbarCollabsed ? (
    <div
      className="flex align-items-center justify-content-center"
      style={tabStyleDefault}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      <img
        className={identifierLegal}
        style={{ width: '24px' }}
        src={
          active || hovering ? submenuLayer3Selected : submenuLayer3Deselected
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
      id="navbartab-general"
      className="flex justify-content-start align-items-center"
      style={tabStyleDefault}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      <div
        className="flex justify-content-center align-items-center"
        style={{ width: '24px', height: '24px', marginTop: '2px' }}
      >
        <img
          src={
            active || hovering ? submenuLayer3Selected : submenuLayer3Deselected
          }
        />
      </div>
      <span id="navbar-tab-name">
        {props.name instanceof Function ? props.name(t) : props.name}
      </span>
    </div>
  );

  return (
    <Link style={{ textDecoration: 'none' }} to={props.to.valueOf()}>
      {tab}
    </Link>
  );
};

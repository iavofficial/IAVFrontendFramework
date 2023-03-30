import React, { useState } from 'react';
import { TranslateFunctionType } from '../../../contexts/language';
import { useTranslator } from '../../internationalization/translators';
import { Link, useLocation } from 'react-router-dom';
import { BLUE0, GRAY4, TAB_HEIGHT, WHITE } from '../../../constants';
import './tabs.scss';
import { Tooltip } from 'primereact/tooltip';
import { navbarTabPropsBasic } from './navbarTab';
import { ThirdLayerNavbarTab } from './thirdLayerNavbarTab';
import submenuLayer2Selected from '../../../assets/images/submenu_layer2_selected.svg';
import submenuLayer2Deselected from '../../../assets/images/submenu_layer2_deselected.svg';
import { generateHashForLength } from '../../../services/hash';

export interface Props {
  name: string | ((t: TranslateFunctionType) => string);
  to: string;
  navbarTabsThirdLayer: navbarTabPropsBasic[];
  navbarCollabsed: boolean;
}

export const SecondLayerNavbarTab = (props: Props) => {
  const t = useTranslator();
  const active = useLocation().pathname === props.to;
  const [hovering, setHovering] = useState(false);
  const [collabsed, setCollabsed] = useState(false);

  const tabStyleDefault = {
    height: TAB_HEIGHT,
    width: props.navbarCollabsed ? '40px' : '240px',
    marginBottom: '16px',
    backgroundColor: active || hovering ? BLUE0 : 'white',
    color: active || hovering ? 'white' : 'black',
    opacity: 1,
  };

  const thirdLayerComponents = props.navbarTabsThirdLayer.map(
    (secondLayerElement: navbarTabPropsBasic) => {
      return (
        <ThirdLayerNavbarTab
          to={secondLayerElement.to}
          name={secondLayerElement.name}
          navbarCollabsed={props.navbarCollabsed}
        />
      );
    }
  );

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
          active || hovering ? submenuLayer2Selected : submenuLayer2Deselected
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
      className="flex justify-content-between align-items-center"
      style={tabStyleDefault}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      <div className="flex align-items-center">
        <div
          className="flex justify-content-center align-items-center"
          style={{ width: '24px', height: '24px', marginTop: '2px' }}
        >
          <img
            src={
              active || hovering
                ? submenuLayer2Selected
                : submenuLayer2Deselected
            }
          />
        </div>

        <span id="navbar-tab-name">
          {props.name instanceof Function ? props.name(t) : props.name}
        </span>
      </div>
      {props.navbarTabsThirdLayer.length > 0 ? (
        <i
          onClick={(e) => {
            e.preventDefault();
            setCollabsed(!collabsed);
          }}
          style={{
            cursor: 'pointer',
            fontSize: '15px',
            color: active || hovering ? WHITE : GRAY4,
          }}
          className={collabsed ? 'pi pi-chevron-down' : 'pi pi-chevron-right'}
        />
      ) : null}
    </div>
  );

  const renderElement =
    props.navbarTabsThirdLayer.length > 0 ? (
      <div>
        {tab}
        {collabsed ? thirdLayerComponents : null}
      </div>
    ) : (
      <Link style={{ textDecoration: 'none' }} to={props.to.valueOf()}>
        {tab}
        {collabsed ? thirdLayerComponents : null}
      </Link>
    );

  return <div>{renderElement}</div>;
};

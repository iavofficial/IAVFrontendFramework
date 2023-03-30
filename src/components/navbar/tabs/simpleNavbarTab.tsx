import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Tooltip } from 'primereact/tooltip';
import { BLUE0, GRAY2, GRAY4, TAB_HEIGHT, WHITE } from '../../../constants';
import { useTranslator } from '../../internationalization/translators';
import { NavbarPropsForTabType, navbarTabPropsSecondLayer } from './navbarTab';
import { SecondLayerNavbarTab } from './secondLayerNavbarTab';
import './tabs.scss';
import { generateHashForLength } from '../../../services/hash';

export interface Props {
  navbarCollabsed: boolean;
}

export const SimpleNavbarTab: NavbarPropsForTabType<Props> = (props) => {
  const active = useLocation().pathname === props.to;
  const [hovering, setHovering] = useState(false);
  const [collabsed, setCollabsed] = useState(false);

  console.log('hier dein uselocation: ', useLocation().pathname);
  console.log('hier dein propsto: ', props.to);

  const t = useTranslator();

  const tabStyleDefault = {
    height: TAB_HEIGHT,
    width: props.navbarCollabsed ? '40px' : '240px',
    marginBottom: '16px',
    cursor: active || props.disabled ? 'default' : 'pointer',
    backgroundColor: (active || hovering) && !props.disabled ? BLUE0 : 'white',
    color: (active || hovering) && !props.disabled ? 'white' : 'black',
    opacity: props.disabled ? 0.5 : 1,
  };

  const secondLayerComponents = props.navbarTabsSecondLayer.map(
    (secondLayerElement: navbarTabPropsSecondLayer) => {
      console.log('hier dein secondlayereelement.to: ', secondLayerElement.to);

      return (
        <SecondLayerNavbarTab
          navbarCollabsed={props.navbarCollabsed}
          navbarTabsThirdLayer={secondLayerElement.navbarTabsThirdLayer}
          to={secondLayerElement.to}
          name={secondLayerElement.name}
        />
      );
    }
  );

  const tabStyleCustomized = {
    height: TAB_HEIGHT,
    width: props.navbarCollabsed ? '40px' : '240px',
    cursor: active || props.disabled ? 'default' : 'pointer',
    backgroundColor:
      (active || hovering) && !props.disabled
        ? props.colorOptions?.tabHoverBackground
        : props.colorOptions?.tabBackground,
    color:
      (active || hovering) && !props.disabled
        ? props.colorOptions?.tabTextHoverColor
        : props.colorOptions?.tabTextColor,
    opacity: props.disabled ? 0.5 : 1,
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
        style={props.colorOptions ? tabStyleCustomized : tabStyleDefault}
      >
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

        {props.navbarTabsSecondLayer.length > 0 ? (
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
    </div>
  );

  const renderElement =
    props.navbarTabsSecondLayer.length > 0 ? (
      <div>
        {tab}
        {collabsed ? secondLayerComponents : null}
      </div>
    ) : (
      <Link style={{ textDecoration: 'none' }} to={props.to.valueOf()}>
        {tab}
        {collabsed ? secondLayerComponents : null}
      </Link>
    );

  return props.disabled ? tab : <div>{renderElement}</div>;
};

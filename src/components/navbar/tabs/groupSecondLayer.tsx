import React, { useEffect, useState } from 'react';
import { Tooltip } from 'primereact/tooltip';
import { BLUE0, GRAY2, GRAY4, TAB_HEIGHT, WHITE } from '../../../constants';
import { useTranslator } from '../../internationalization/translators';
import './tabs.scss';
import { generateHashForLength } from '../../../services/hash';
import {
  NavbarPropsForGroupTypeSecondLayer,
  navbarTabProps,
} from './navbarTabTypes';
import { PrivilegedNavbarTab } from './privilegedNavbarTab';
import { NavbarTab } from './navbarTab';
import { calculateLineColor } from '../../../services/calculateLineColor';
import { SpaceBetweenElement } from './spaceBetweenElement';

export interface Props {
  navbarCollabsed: boolean;
  firstLayerCollabsed: boolean;
}

export const GroupSecondLayer: NavbarPropsForGroupTypeSecondLayer<Props> = (
  props
) => {
  const [hovering, setHovering] = useState(false);
  const [secondLayerCollabsed, setSecondLayerCollabsed] = useState(false);
  const t = useTranslator();

  const styleActiveLineFirstLayer = {
    heigth: '100%',
    width: '2px',
    marginRight: '3px',
    backgroundColor: calculateLineColor(hovering, props.firstLayerCollabsed),
  };

  const styleActiveLineSecondLayer = {
    heigth: '100%',
    width: '2px',
    marginRight: '3px',
    backgroundColor: calculateLineColor(hovering, secondLayerCollabsed),
  };

  const thirdLayerComponents = props.tabAndContent.map(
    (tabOrGroupElement: navbarTabProps, index: number) => {
      return tabOrGroupElement.permittedGroups.length > 0 ? (
        <PrivilegedNavbarTab
          secondLayerCollabsed={secondLayerCollabsed}
          firstLayerCollabsed={props.firstLayerCollabsed}
          name={tabOrGroupElement.name}
          disabled={tabOrGroupElement.disabled}
          selectedIcon={tabOrGroupElement.selectedIcon}
          deselectedIcon={tabOrGroupElement.deselectedIcon}
          permittedGroups={tabOrGroupElement.permittedGroups}
          renderElement={tabOrGroupElement.renderElement}
          to={tabOrGroupElement.to}
          navbarCollabsed={props.navbarCollabsed}
          lastElementSecondLayer={props.tabAndContent.length - 1 === index}
          lastElementFirstLayer={false}
        />
      ) : (
        <NavbarTab
          secondLayerCollabsed={secondLayerCollabsed}
          firstLayerCollabsed={props.firstLayerCollabsed}
          name={tabOrGroupElement.name}
          disabled={tabOrGroupElement.disabled}
          selectedIcon={tabOrGroupElement.selectedIcon}
          deselectedIcon={tabOrGroupElement.deselectedIcon}
          permittedGroups={tabOrGroupElement.permittedGroups}
          renderElement={tabOrGroupElement.renderElement}
          to={tabOrGroupElement.to}
          navbarCollabsed={props.navbarCollabsed}
          lastElementSecondLayer={props.tabAndContent.length - 1 === index}
          lastElementFirstLayer={false}
        />
      );
    }
  );

  const tabStyleDefault = {
    height: TAB_HEIGHT,
    width: props.navbarCollabsed ? '40px' : '240px',
    cursor: 'pointer',
    backgroundColor: hovering ? BLUE0 : 'white',
    color: hovering ? 'white' : 'black',
    opacity: 1,
  };
  const identifier = generateHashForLength(4);
  const identifierLegal = 'a' + identifier;
  const identifierWithDot = '.' + identifierLegal;

  return props.navbarCollabsed ? (
    <>
      <div
        className="flex align-items-center justify-content-start generalTab-collabsed"
        style={tabStyleDefault}
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
      >
        <div id="navbarTab-collabsed-line" style={styleActiveLineFirstLayer} />
        <div style={styleActiveLineSecondLayer} />
        <img
          style={{ width: '24px' }}
          className={identifierLegal}
          src={
            hovering
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
      <SpaceBetweenElement
        firstLayerCollabsed={props.firstLayerCollabsed}
        secondLayerCollabsed={secondLayerCollabsed}
        navbarCollabsed={props.navbarCollabsed}
      />

      {secondLayerCollabsed ? thirdLayerComponents : null}
    </>
  ) : (
    <div id="navbar-tab-with-childtabs" style={{ borderColor: GRAY2 }}>
      <div
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
        className="flex align-items-center justify-content-between"
        id="navbartab-general"
        style={tabStyleDefault} //Add customstyle
        onClick={() => setSecondLayerCollabsed(!secondLayerCollabsed)}
      >
        <div className="flex" style={{ height: '100%' }}>
          <div style={styleActiveLineFirstLayer} />
          <div style={styleActiveLineSecondLayer} />
          <div className="flex align-items-center">
            <img
              src={
                hovering
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
        <i
          style={{
            cursor: 'pointer',
            fontSize: '15px',
            color: hovering ? WHITE : GRAY4,
          }}
          className={
            secondLayerCollabsed ? 'pi pi-chevron-down' : 'pi pi-chevron-right'
          }
        />
      </div>
      <SpaceBetweenElement
        firstLayerCollabsed={props.firstLayerCollabsed}
        secondLayerCollabsed={secondLayerCollabsed}
        navbarCollabsed={props.navbarCollabsed}
      />
      {secondLayerCollabsed ? thirdLayerComponents : null}
    </div>
  );
};

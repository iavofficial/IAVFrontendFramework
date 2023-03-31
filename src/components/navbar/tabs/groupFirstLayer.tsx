import React, { useState } from 'react';

import { Tooltip } from 'primereact/tooltip';
import { BLUE0, GRAY2, GRAY4, TAB_HEIGHT, WHITE } from '../../../constants';
import { useTranslator } from '../../internationalization/translators';

import './tabs.scss';
import { generateHashForLength } from '../../../services/hash';
import {
  groupPropsBasicFirstLayer,
  NavbarPropsForGroupTypeFirstLayer,
  navbarTabProps,
} from './navbarTabTypes';
import { SecondLayerTabelements } from './secondLayerTabelements';
import { calculateLineColor } from '../../../services/calculateLineColor';
import { SpaceBetweenElement } from './spaceBetweenElement';

export interface Props {
  navbarCollabsed: boolean;
}

export const GroupFirstLayer: NavbarPropsForGroupTypeFirstLayer<Props> = (
  props
) => {
  const [hovering, setHovering] = useState(false);
  const [firstLayerCollabsed, setFirstLayerCollabsed] = useState(false);
  const t = useTranslator();

  const secondLayerComponents = props.tabAndContent.map(
    (
      tabOrGroupElement: navbarTabProps | groupPropsBasicFirstLayer,
      index: number
    ) => {
      return (
        <SecondLayerTabelements
          firstLayerCollabsed={firstLayerCollabsed}
          navbarCollabsed={props.navbarCollabsed}
          tabOrGroupElement={tabOrGroupElement}
          lastElementFirstLayer={props.tabAndContent.length - 1 === index}
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

  const styleActiveLineFirstLayer = {
    backgroundColor: calculateLineColor(hovering, firstLayerCollabsed),
    marginRight: '8px',
  };

  const identifier = generateHashForLength(4);
  const identifierLegal = 'a' + identifier;
  const identifierWithDot = '.' + identifierLegal;

  return props.navbarCollabsed ? (
    <>
      <div
        className="flex align-items-center justify-content-start"
        style={tabStyleDefault}
        id="navbartab-general"
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
      >
        <div
          id="navbarTab-collabsed-line"
          className="generalTab-collabsed"
          style={styleActiveLineFirstLayer}
        />

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
        firstLayerCollabsed={firstLayerCollabsed}
        secondLayerCollabsed={false}
        navbarCollabsed={props.navbarCollabsed}
      />
      {firstLayerCollabsed ? secondLayerComponents : null}
    </>
  ) : (
    <div id="navbar-tab-with-childtabs" style={{ borderColor: GRAY2 }}>
      <div
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
        className="flex align-items-center justify-content-between"
        id="navbartab-general"
        style={tabStyleDefault}
        onClick={() => {
          setFirstLayerCollabsed(!firstLayerCollabsed);
        }}
      >
        <div className="flex" style={{ height: '100%' }}>
          <div
            id="navbarTab-collabsed-line"
            style={styleActiveLineFirstLayer}
          />
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
            firstLayerCollabsed ? 'pi pi-chevron-down' : 'pi pi-chevron-right'
          }
        />
      </div>
      <SpaceBetweenElement
        firstLayerCollabsed={firstLayerCollabsed}
        secondLayerCollabsed={false}
        navbarCollabsed={props.navbarCollabsed}
      />
      {firstLayerCollabsed ? secondLayerComponents : null}
    </div>
  );
};

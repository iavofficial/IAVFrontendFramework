import React, { useState } from 'react';
import { Accordion, AccordionTab } from 'primereact/accordion';
import '../../css/tabGroup.css';
import '../navbar.scss';
import { TranslateFunctionType } from '../../../contexts/language';
import { useTranslator } from '../../internationalization/translators';
import {
  BLUE0,
  BLUE3,
  GRAY2,
  GRAY4,
  TAB_HEIGHT,
  WHITE,
} from '../../../constants';
import { generateHashForLength } from '../../../services/hash';
import { Tooltip } from 'primereact/tooltip';
import { LAYER } from './tabLayer';
import { calculateSecondLineColorGroupTop } from '../../../services/calculateLineColorGroup';

interface Props {
  name: string | ((t: TranslateFunctionType) => string);
  logo?: string;
  collapsible?: boolean;
  fontWeightBold: boolean;
  collapsed?: boolean;
  accordionHeaderTextColor?: string;
  navbarCollapsed: boolean;
  layer?: LAYER;
}

export const TabGroup = (props: React.PropsWithChildren<Props>) => {
  const t = useTranslator();
  const [hovering, setHovering] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  console.log('props collapsed: ', props.collapsed);

  const collapsible =
    props.collapsible !== undefined ? props.collapsible : true;

  const tabStyleDefault = {
    height: '40px',
    width: props.navbarCollapsed ? '40px' : '240px',
    cursor: 'pointer',
    backgroundColor: hovering ? BLUE0 : 'white',
    color: hovering ? 'white' : 'black',
    opacity: 1,
    padding: props.navbarCollapsed ? '0px' : '0px 16px 0px 0px',
  };

  const styleActiveLineFirstLayerTop = {
    marginRight: '2px',
    marginLeft: '3px',
    width: '2px',
    height: '40px',
    backgroundColor: BLUE0,
    // backgroundColor: calculateLineColorForTabs(
    //   hovering,
    //   active,
    //   props.firstLayerCollabsed?
    // )
  };

  const styleActiveLineSecondLayerTop = {
    heigth: '40px',
    width: '2px',
    marginRight: '3px',
    backgroundColor: calculateSecondLineColorGroupTop(
      props.layer as LAYER,
      hovering
    ),
  };

  const styleActiveLineFirstLayerBottom = {
    marginRight: '2px',
    marginLeft: '3px',
    backgroundColor: BLUE0,
    width: '2px',
    height: '16px',
    // backgroundColor: calculateLineColorForTabs(
    //   hovering,
    //   active,
    //   props.firstLayerCollabsed?
    // )
  };

  const styleActiveLineSecondLayerBottom = {
    heigth: '16px',
    width: '2px',
    marginRight: '3px',

    backgroundColor: props.layer === LAYER.ONE ? WHITE : BLUE0,
    // calculateLineColorForTabs(
    //   hovering,
    //   active,
    //   props.secondLayerCollabsed?
    // ),
  };

  const identifier = generateHashForLength(4);
  const identifierLegal = 'a' + identifier;
  const identifierWithDot = '.' + identifierLegal;

  const groupElement = props.navbarCollapsed ? (
    <>
      <div
        className="flex align-items-center"
        style={tabStyleDefault}
        id="navbartab-general"
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
      >
        <div style={styleActiveLineFirstLayerTop} />
        <div id="secondActiveLine" style={styleActiveLineSecondLayerTop} />

        <img
          style={{ width: '24px', height: '24px', objectFit: 'contain' }}
          className={identifierLegal}
          src={props.logo}
        />
        <Tooltip
          content={props.name instanceof Function ? props.name(t) : props.name}
          target={identifierWithDot}
          id="hover-image"
        />
      </div>
    </>
  ) : (
    <div
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      className="flex align-items-center justify-content-between"
      style={tabStyleDefault}
      onClick={() => {
        setCollapsed(!collapsed);
      }}
    >
      <div className="flex" style={{ height: '100%' }}>
        <div style={styleActiveLineFirstLayerTop} />
        <div style={styleActiveLineSecondLayerTop} />
        <div className="flex align-items-center">
          <img
            style={{ width: '24px', height: '24px', objectFit: 'contain' }}
            src={props.logo}
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
        className={collapsed ? 'pi pi-chevron-down' : 'pi pi-chevron-right'}
      />
    </div>
  );

  return (
    <>
      {groupElement}
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
      {collapsed ? props.children : null}
    </>
  );
};

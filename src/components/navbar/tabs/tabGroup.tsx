import React, { ReactElement, useContext, useEffect, useState } from 'react';
import '../../css/tabGroup.css';
import '../navbar.css';
import { TranslateFunctionType } from '../../../contexts/language';
import { useTranslator } from '../../internationalization/translators';
import { BLACK, BLUE0, GREY3, GREY4, GREY5, WHITE } from '../../../constants';
import { generateHashOfLength } from '../../../services/hash';
import { Tooltip } from 'primereact/tooltip';
import { LAYER } from './tabLayer';
import {
  calculateFirstLineColorGroupTop,
  calculateSecondLineColorGroupTop,
  calculateFirstLineColorGroupBottom,
  revertColor,
} from '../../../services/calculateLineColorGroup';
import { navbarTabProps } from './navbarTab';
import { ColorSettingsContext } from '../../../contexts/colorsettings';
import { SvgIcon } from './SvgIcon';

interface Props {
  name: string | ((t: TranslateFunctionType) => string);
  logo?: ReactElement;
  collapsible?: boolean;
  fontWeightBold: boolean;
  collapsed?: boolean;
  isLastElementOfLayer?: boolean;
  accordionHeaderTextColor?: string;
  navbarCollapsed: boolean;
  layer?: LAYER;
}

type PropsWithNavbarTabChildren<T> = T & {
  children: ReactElement<navbarTabProps>[];
};

export const TabGroup = (props: PropsWithNavbarTabChildren<Props>) => {
  const t = useTranslator();
  const colorSettingsContext = useContext(ColorSettingsContext);
  const [hovering, setHovering] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  let highlightColor = colorSettingsContext?.darkmode ? GREY3 : BLUE0;
  let mainColor = colorSettingsContext?.darkmode ? GREY5 : WHITE;

  let letteringHighlightColor = WHITE;
  let letteringMainColor = colorSettingsContext?.darkmode ? GREY3 : BLACK;

  let iconHighlightColor = WHITE;
  let iconMainColor = colorSettingsContext?.darkmode ? GREY3 : BLUE0;

  const collapsible =
    props.collapsible !== undefined ? props.collapsible : true;

  useEffect(() => {
    if (!collapsible) {
      setCollapsed(true);
    }
  }, [collapsible]);

  const tabStyleDefault = {
    height: '40px',
    width: props.navbarCollapsed ? '40px' : '240px',
    cursor: 'pointer',
    backgroundColor: hovering ? highlightColor : mainColor,
    color: hovering ? 'white' : letteringMainColor,
    opacity: 1,
    padding: props.navbarCollapsed ? '0px' : '0px 16px 0px 0px',
  };

  const styleActiveLineFirstLayerTop = {
    marginRight: '2px',
    marginLeft: '3px',
    width: '2px',
    height: '40px',
    backgroundColor: hovering
      ? revertColor(
          calculateFirstLineColorGroupTop(
            highlightColor,
            mainColor,
            props.layer as LAYER,
            collapsed,
            props.collapsed
          ),
          highlightColor,
          mainColor
        )
      : calculateFirstLineColorGroupTop(
          highlightColor,
          mainColor,
          props.layer as LAYER,
          collapsed,
          props.collapsed
        ),
  };

  const styleActiveLineFirstLayerBottom = {
    marginRight: '2px',
    marginLeft: '3px',

    width: '2px',
    height: '16px',
    backgroundColor: calculateFirstLineColorGroupBottom(
      highlightColor,
      mainColor,
      collapsed,
      props.collapsed as boolean,
      props.isLastElementOfLayer as boolean
    ),
  };

  const styleActiveLineSecondLayerTop = {
    heigth: '40px',
    width: '2px',
    marginRight: '3px',
    backgroundColor: hovering
      ? revertColor(
          calculateSecondLineColorGroupTop(
            highlightColor,
            mainColor,
            props.layer as LAYER,
            collapsed,
            props.collapsed
          ),
          highlightColor,
          mainColor
        )
      : calculateSecondLineColorGroupTop(
          highlightColor,
          mainColor,
          props.layer as LAYER,
          collapsed,
          props.collapsed
        ),
  };

  const styleActiveLineSecondLayerBottom = {
    heigth: '16px',
    width: '2px',
    marginRight: '3px',
    backgroundColor: calculateSecondLineColorGroupTop(
      highlightColor,
      mainColor,
      props.layer as LAYER,
      collapsed,
      props.collapsed
    ),
  };

  const identifier = generateHashOfLength(4);
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

        <SvgIcon
          color={hovering ? iconHighlightColor : iconMainColor}
          element={props.logo}
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
        if (collapsible) {
          setCollapsed(!collapsed);
        }
      }}
    >
      <div className="flex" style={{ height: '100%' }}>
        <div style={styleActiveLineFirstLayerTop} />
        <div style={styleActiveLineSecondLayerTop} />
        <div className="flex align-items-center">
          <SvgIcon
            color={hovering ? iconHighlightColor : iconMainColor}
            element={props.logo}
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
          color: hovering ? WHITE : GREY3,
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
      {collapsed ? (
        props.children.map((child) => {
          if (React.isValidElement(child)) {
            return React.cloneElement(child, { collapsed: collapsed });
          }
          return child;
        })
      ) : (
        <React.Fragment />
      )}
    </>
  );
};

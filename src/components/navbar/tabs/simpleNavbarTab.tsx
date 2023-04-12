import React, { useContext, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Tooltip } from 'primereact/tooltip';
import { BLACK, BLUE0, GREY3, GREY5, WHITE } from '../../../constants';
import { useTranslator } from '../../internationalization/translators';
import './tabs.css';
import { generateHashOfLength } from '../../../services/hash';
import { navbarTab } from './navbarTab';
import { LAYER } from './tabLayer';
import {
  calculateFirstLineTabLayer,
  calculateFirstLineTabLayerBottom,
  calculateSecondLineTabLayer,
  calculateSecondLineTabLayerBottom,
} from '../../../services/calculateLineColorTab';
import { revertColor } from '../../../services/calculateLineColorGroup';
import { ColorSettingsContext } from '../../../contexts/colorsettings';
import { SvgIcon } from './SvgIcon';

export interface Props {}

export const SimpleNavbarTab: navbarTab<Props> = (props) => {
  const [hovering, setHovering] = useState(false);
  const colorSettingsContext = useContext(ColorSettingsContext);
  const t = useTranslator();
  const active = useLocation().pathname === props.to;

  //TODO: Add colorSettingsContextColorManagement
  let highlightColor = colorSettingsContext?.darkmode ? GREY3 : BLUE0;
  let mainColor = colorSettingsContext?.darkmode ? GREY5 : WHITE;

  let letteringHighlightColor = WHITE;
  let letteringMainColor = colorSettingsContext?.darkmode ? GREY3 : BLACK;

  let iconHighlightColor = WHITE;
  let iconMainColor = colorSettingsContext?.darkmode ? GREY3 : BLUE0;

  const styleActiveLineFirstLayerTop = {
    marginRight: '2px',
    marginLeft: '3px',
    width: '2px',
    height: '40px',
    backgroundColor:
      hovering || active
        ? revertColor(
            calculateFirstLineTabLayer(
              highlightColor,
              mainColor,
              props.layer as LAYER,
              props.collapsed
            ),
            highlightColor,
            mainColor
          )
        : calculateFirstLineTabLayer(
            highlightColor,
            mainColor,
            props.layer as LAYER,
            props.collapsed
          ),
  };

  const styleActiveLineFirstLayerBottom = {
    marginRight: '2px',
    marginLeft: '3px',
    width: '2px',
    height: '16px',
    backgroundColor: calculateFirstLineTabLayerBottom(
      highlightColor,
      mainColor,
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
            calculateSecondLineTabLayer(
              highlightColor,
              mainColor,
              props.layer as LAYER,
              props.collapsed
            ),
            highlightColor,
            mainColor
          )
        : calculateSecondLineTabLayer(
            highlightColor,
            mainColor,
            props.layer as LAYER,
            props.collapsed
          ),
  };

  const styleActiveLineSecondLayerBottom = {
    heigth: '16px',
    width: '2px',
    marginRight: '3px',
    backgroundColor: calculateSecondLineTabLayerBottom(
      highlightColor,
      mainColor,
      props.collapsed as boolean,
      props.isLastElementOfLayer as boolean,
      props.layer as LAYER
    ),
  };

  const tabStyleDefault = {
    height: '40px',
    width: props.navbarCollapsed ? '40px' : '240px',
    cursor: active || props.disabled ? 'default' : 'pointer',
    backgroundColor:
      (active || hovering) && !props.disabled ? highlightColor : mainColor,
    color:
      (active || hovering) && !props.disabled
        ? letteringHighlightColor
        : letteringMainColor,
    opacity: props.disabled ? 0.5 : 1,
  };

  const identifier = generateHashOfLength(4);
  const identifierLegal = 'a' + identifier;
  const identifierWithDot = '.' + identifierLegal;

  const navbarTab = props.navbarCollapsed ? (
    <div
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      className={'flex align-items-center ' + identifierLegal}
      style={tabStyleDefault}
    >
      <div style={styleActiveLineFirstLayerTop} />
      <div id="secondActiveLine" style={styleActiveLineSecondLayerTop} />

      <SvgIcon
        color={
          (active || hovering) && !props.disabled
            ? iconHighlightColor
            : iconMainColor
        }
        element={props.icon}
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
        <SvgIcon
          color={
            (active || hovering) && !props.disabled
              ? iconHighlightColor
              : iconMainColor
          }
          element={props.icon}
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

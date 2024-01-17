import React, { useContext, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Tooltip } from 'primereact/tooltip';
import { BLACK, BLUE0, GREY3, GREY4, GREY5, WHITE } from '../../../constants';
import { useTranslator } from '../../internationalization/translators';
import './tabs.css';
import { generateHashOfLength } from '../../../utils/hash';
import { navbarTab } from './navbarTab';
import { ColorSettingsContext } from '../../../contexts/colorsettings';
import { SvgIcon } from './svgIcon';

export interface Props {
  
}

export const SimpleNavbarTab: navbarTab<Props> = (props) => {
  const [hovering, setHovering] = useState(false);
  const colorSettingsContext = useContext(ColorSettingsContext);
  const t = useTranslator();
  const active = useLocation().pathname === props.to;

  let highlightColor = colorSettingsContext?.colorOptions.navbarColorOptions?.tabColorOptions
    ?.highlightColor
    ? colorSettingsContext?.colorOptions.navbarColorOptions?.tabColorOptions?.highlightColor
    : colorSettingsContext?.darkmode
    ? GREY3
    : BLUE0;
  let mainColor = colorSettingsContext?.colorOptions.navbarColorOptions?.tabColorOptions
    ?.mainColor
    ? colorSettingsContext?.colorOptions.navbarColorOptions?.tabColorOptions?.mainColor
    : colorSettingsContext?.darkmode
    ? GREY5
    : WHITE;

  let letteringHighlightColor = colorSettingsContext?.colorOptions.navbarColorOptions
    ?.tabColorOptions?.letteringHighlightColor
    ? colorSettingsContext?.colorOptions.navbarColorOptions?.tabColorOptions
        ?.letteringHighlightColor
    : WHITE;
  let letteringMainColor = colorSettingsContext?.colorOptions.navbarColorOptions
    ?.tabColorOptions?.letteringMainColor
    ? colorSettingsContext?.colorOptions.navbarColorOptions?.tabColorOptions
        ?.letteringMainColor
    : colorSettingsContext?.darkmode
    ? GREY3
    : BLACK;

  let iconHighlightColor = colorSettingsContext?.colorOptions.navbarColorOptions
    ?.tabColorOptions?.iconHighlightColor
    ? colorSettingsContext?.colorOptions.navbarColorOptions?.tabColorOptions
        ?.iconHighlightColor
    : WHITE;
  let iconMainColor = colorSettingsContext?.colorOptions.navbarColorOptions?.tabColorOptions
    ?.iconMainColor
    ? colorSettingsContext?.colorOptions.navbarColorOptions?.tabColorOptions?.iconMainColor
    : colorSettingsContext?.darkmode
    ? GREY3
    : BLUE0;

  const tabStyleDefault = {
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
      className={'default-general-navbar-style flex align-items-center ' + identifierLegal}
      style={tabStyleDefault}
    >

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
      className="default-general-navbar-style flex "
      style={tabStyleDefault}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >

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
    <div className="navbar-tab-space">
      {props.disabled ? (
        <>
          {navbarTab}
          <div
            className="flex"
            style={{ width: props.navbarCollapsed ? '40px' : '240px' }}
          >
            <div style={{ width: '80%' }} />
          </div>
        </>
      ) : (
        <>
          <Link style={{ textDecoration: 'none' }} to={props.to.valueOf()}>
            {navbarTab}
          </Link>
        </>
      )}
    </div>
  );
};

import React, { ReactElement, useContext, useEffect, useState } from 'react';
import '../navbar.css';
import { useTranslator } from '../../internationalization/translators';
import { BLACK, BLUE0, GREY3, GREY5, WHITE } from '../../../constants';
import { generateHashOfLength } from '../../../utils/hash';
import { Tooltip } from 'primereact/tooltip';
import { navbarTabProps } from './navbarTab';
import { ColorSettingsContext } from '../../../contexts/colorsettings';
import { SvgIcon } from './svgIcon';
import { TranslateFunctionType } from '../../../types/translationFunction';

interface Props {
  name: string | ((t: TranslateFunctionType) => string);
  logo?: ReactElement;
  collapsible?: boolean;
  collapsed?: boolean;

  navbarCollapsed: boolean;
}

type PropsWithNavbarTabChildren<T> = T & {
  children: ReactElement<navbarTabProps>[];
};

export const TabGroup = (props: PropsWithNavbarTabChildren<Props>) => {
  const t = useTranslator();
  const colorSettingsContext = useContext(ColorSettingsContext);
  const [hovering, setHovering] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  let highlightColor = colorSettingsContext?.navbarColorOptions?.tabColorOptions
    ?.highlightColor
    ? colorSettingsContext?.navbarColorOptions?.tabColorOptions?.highlightColor
    : colorSettingsContext?.darkmode
    ? GREY3
    : BLUE0;
  let mainColor = colorSettingsContext?.navbarColorOptions?.tabColorOptions
    ?.mainColor
    ? colorSettingsContext?.navbarColorOptions?.tabColorOptions?.mainColor
    : colorSettingsContext?.darkmode
    ? GREY5
    : WHITE;

  let letteringHighlightColor = colorSettingsContext?.navbarColorOptions
    ?.tabColorOptions?.letteringHighlightColor
    ? colorSettingsContext?.navbarColorOptions?.tabColorOptions
        ?.letteringHighlightColor
    : WHITE;
  let letteringMainColor = colorSettingsContext?.navbarColorOptions
    ?.tabColorOptions?.letteringMainColor
    ? colorSettingsContext?.navbarColorOptions?.tabColorOptions
        ?.letteringMainColor
    : colorSettingsContext?.darkmode
    ? GREY3
    : BLACK;

  let iconHighlightColor = colorSettingsContext?.navbarColorOptions
    ?.tabColorOptions?.iconHighlightColor
    ? colorSettingsContext?.navbarColorOptions?.tabColorOptions
        ?.iconHighlightColor
    : WHITE;
  let iconMainColor = colorSettingsContext?.navbarColorOptions?.tabColorOptions
    ?.iconMainColor
    ? colorSettingsContext?.navbarColorOptions?.tabColorOptions?.iconMainColor
    : colorSettingsContext?.darkmode
    ? GREY3
    : BLUE0;

  let arrowMainColor = colorSettingsContext?.navbarColorOptions?.tabColorOptions
    ?.arrowMainColor
    ? colorSettingsContext?.navbarColorOptions?.tabColorOptions?.arrowMainColor
    : GREY3;
  let arrowHighlightColor = colorSettingsContext?.navbarColorOptions
    ?.tabColorOptions?.arrowHighlightColor
    ? colorSettingsContext?.navbarColorOptions?.tabColorOptions
        ?.arrowHighlightColor
    : WHITE;

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
    color: hovering ? letteringHighlightColor : letteringMainColor,
    opacity: 1,
    padding: props.navbarCollapsed ? '0px' : '0px 16px 0px 0px',
  };

  const identifier = generateHashOfLength(4);
  const identifierLegal = 'a' + identifier;
  const identifierWithDot = '.' + identifierLegal;

  const groupElement = props.navbarCollapsed ? (
    <>
      <div
        className={'flex align-items-center ' + identifierLegal}
        style={tabStyleDefault}
        id="navbartab-general"
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
      >
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
      className="flex align-items-center justify-content-between navbar-tab-space"
      style={tabStyleDefault}
      onClick={() => {
        if (collapsible) {
          setCollapsed(!collapsed);
        }
      }}
    >
      <div className="flex" style={{ height: '100%' }}>
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
          color: hovering ? arrowHighlightColor : arrowMainColor,
        }}
        className={collapsed ? 'pi pi-chevron-down' : 'pi pi-chevron-left'}
      />
    </div>
  );

  return (
    <>
      {groupElement}
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

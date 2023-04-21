import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import './navbar.css';
import '../css/globalColors.css';
import { TabAndContentWrapper } from './wrapper/tabAndContentWrapper';
import { MenuSettingsOptions } from '../header/SettingsMenu';
import { useTranslator } from '../internationalization/translators';
import { Tooltip } from 'primereact/tooltip';
import SimpleBar from 'simplebar-react';
import 'simplebar-react/dist/simplebar.min.css';
import { ColorSettingsContext } from '../../contexts/colorsettings';
import { calculateNavbarArrowFunctionColor } from '../../services/calculateNavbarArrowColor';
import { BLUE3, GREEN, GREY1 } from '../../constants';
import { generateHashOfLength } from '../../services/hash';
import { NavbarSettingsContext } from '../../contexts/navbarContext';

interface Props {
  tabAndContentWrappers: TabAndContentWrapper[];
  menuOptions?: MenuSettingsOptions;
  documentsLabelKey?: string;
  collabsibleNavbar?: boolean;
}

export const Navbar = (props: Props) => {
  const t = useTranslator();
  const colorSettingsContext = useContext(ColorSettingsContext);
  const navbarSettingsContext = useContext(NavbarSettingsContext);

  const identifier = generateHashOfLength(4);
  const identifierLegal = 'a' + identifier;
  const identifierWithDot = '.' + identifierLegal;

  return (
    <div
      id="navbar"
      className={
        (colorSettingsContext?.darkmode ? 'bg-grey-5' : 'bg-white-1') +
        ' flex flex-column'
      }
      style={{
        padding: '16px 0px 0px 0px',
        backgroundColor:
          colorSettingsContext?.navbarColorOptions?.backgroundColor,
      }}
    >
      <SimpleBar
        style={{
          width: navbarSettingsContext?.navbarCollapsed ? '40px' : '240px',
          height: navbarSettingsContext?.navbarCollapsed ? '83vh' : '87vh',
          color: colorSettingsContext?.navbarColorOptions?.scrollbarColor
            ? colorSettingsContext?.navbarColorOptions.scrollbarColor
            : GREY1,
          position: 'relative',
          overflowX: 'visible',
        }}
      >
        <>
          {props.tabAndContentWrappers.map((wrapper: TabAndContentWrapper) =>
            wrapper.getNavbarComponent(navbarSettingsContext?.navbarCollapsed!)
          )}
        </>
      </SimpleBar>
      <div style={{ marginTop: 'auto' }}>
        <div
          className={
            'text-center flex ' +
            (navbarSettingsContext?.navbarCollapsed ? 'flex-column' : 'px-3 ')
          }
          style={{
            justifyContent: navbarSettingsContext?.navbarCollapsed
              ? 'center'
              : 'space-between',
            marginBottom: '8px',
          }}
        >
          <Link
            style={{
              fontSize: '13px',
              fontWeight: 'bolder',
              textDecoration: 'none',
            }}
            to="/documents"
          >
            <i
              style={{
                color: colorSettingsContext?.navbarColorOptions
                  ?.legalDocumentsIconColor
                  ? colorSettingsContext?.navbarColorOptions
                      ?.legalDocumentsIconColor
                  : BLUE3,
                marginBottom: navbarSettingsContext?.navbarCollapsed
                  ? '16px'
                  : '',
                fontWeight: 'bold',
              }}
              className={'pi pi-info-circle ' + identifierLegal}
            />
          </Link>
          <Tooltip
            content={t(
              props.documentsLabelKey ? props.documentsLabelKey : 'Imprint'
            )}
            target={identifierWithDot}
            id="hover-image"
          />
          {props.collabsibleNavbar && props.collabsibleNavbar ? (
            <i
              onClick={() =>
                navbarSettingsContext?.setNavbarCollapsed(
                  !navbarSettingsContext.navbarCollapsed
                )
              }
              style={{
                cursor: 'pointer',
                color:
                  colorSettingsContext?.navbarColorOptions
                    ?.navbarCollapseArrowColor,
              }}
              className={calculateNavbarArrowFunctionColor(
                navbarSettingsContext?.navbarCollapsed!,
                colorSettingsContext?.darkmode as boolean
              )}
            />
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
};

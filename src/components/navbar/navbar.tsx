import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { ContextMenu } from 'primereact/contextmenu';
import './navbar.css';
import '../css/globalColors.css';
import UserPic from '../../assets/images/user.png';
import Settings from '../../assets/images/settings.png';
import { Clock } from '../clock';
import { AuthContext } from '../../contexts/auth';
import { TabAndContentWrapper } from './wrapper/tabAndContentWrapper';
import { MenuSettingsOptions } from '../header/SettingsMenu';
import { WHITE, BLUE3, GREEN, GREY1 } from '../../constants';
import { useTranslator } from '../internationalization/translators';
import SimpleBar from 'simplebar-react';
import 'simplebar-react/dist/simplebar.min.css';
import { ColorSettingsContext } from '../../contexts/colorsettings';
import { calculateNavbarArrowFunctionColor } from '../../services/calculateNavbarArrowColor';

interface Props {
  tabAndContentWrappers: TabAndContentWrapper[];
  menuOptions?: MenuSettingsOptions;
  documentsLabelKey?: string;
  collabsible?: boolean;
  colorOptions?: {
    navbarColorSettings?: {
      menuSettingsBackground?: string;
      menuSettingsTextColor?: string;
      clockColor?: string;
      documentsColor?: string;
      dateTextColor?: string;
      navbarBackground?: string;
    };
  };
}

export const Navbar = (props: Props) => {
  const t = useTranslator();
  const colorSettingsContext = useContext(ColorSettingsContext);
  const [navbarCollapsed, setNavbarCollapsed] = useState(() =>
    localStorage.getItem('navbarCollapsed')
      ? Boolean(JSON.parse(localStorage.getItem('navbarCollapsed') as string))
      : false
  );

  const setNavbarCollapsedValue = (navbarCollapsedValue: boolean): void => {
    localStorage.setItem(
      'navbarCollapsed',
      JSON.stringify(navbarCollapsedValue)
    );
    setNavbarCollapsed(navbarCollapsedValue);
  };

  return (
    <div
      id="navbar"
      className={
        (colorSettingsContext?.darkmode ? 'bg-grey-5' : 'bg-white') +
        ' flex flex-column'
      }
      style={{
        padding: '16px 0px 0px 0px',
        backgroundColor:
          props.colorOptions?.navbarColorSettings?.navbarBackground,
      }}
    >
      <SimpleBar
        style={{
          width: navbarCollapsed ? '40px' : '240px',
          height: navbarCollapsed ? '83vh' : '87vh',
          color: GREY1,
          position: 'relative',
          overflowX: 'visible',
        }}
      >
        <>
          {props.tabAndContentWrappers.map((wrapper: TabAndContentWrapper) =>
            wrapper.getNavbarComponent(navbarCollapsed)
          )}
        </>
      </SimpleBar>
      <div style={{ marginTop: 'auto' }}>
        <div
          className={
            'text-center flex ' + (navbarCollapsed ? 'flex-column' : 'px-3 ')
          }
          style={{
            justifyContent: navbarCollapsed ? 'center' : 'space-between',
            marginBottom: '8px',
          }}
        >
          <Link
            style={{
              fontSize: '13px',
              fontWeight: 'bolder',
              color: props.colorOptions?.navbarColorSettings?.documentsColor
                ? props.colorOptions?.navbarColorSettings?.documentsColor
                : 'black',
              textDecoration: 'none',
            }}
            to="/documents"
          >
            {/* {t(props.documentsLabelKey ? props.documentsLabelKey : 'Imprint')} */}
            <i
              style={{
                color: BLUE3,
                marginBottom: navbarCollapsed ? '16px' : '',
              }}
              className="pi pi-info-circle"
            />
          </Link>
          {props.collabsible && props.collabsible ? (
            <i
              onClick={() => setNavbarCollapsedValue(!navbarCollapsed)}
              style={{ cursor: 'pointer' }}
              className={calculateNavbarArrowFunctionColor(
                navbarCollapsed,
                colorSettingsContext?.darkmode as boolean
              )}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
};

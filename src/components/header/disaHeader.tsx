import React, { ReactElement, useContext, useState } from 'react';
import './disaHeader.css';
import '../css/globalColors.css';
import { ContextMenu } from 'primereact/contextmenu';
import appLogoLightMode from '../../assets/images/app_logo_lightMode.svg';
import appLogoDarkMode from '../../assets/images/app_logo_darkMode.svg';
import userIconLightMode from '../../assets/images/icon_user_lightMode.svg';
import userIconDarkMode from '../../assets/images/icon_user_darkMode.svg';
import notificationPicLightMode from '../../assets/images/icon_notification_lightMode.svg';
import notificationPicDarkMode from '../../assets/images/icon_notification_darkMode.svg';
import settingsLightMode from '../../assets/images/icon_settings_lightMode.svg';
import settingsDarkMode from '../../assets/images/icon_settings_darkMode.svg';
import companyLogoLightMode from '../../assets/images/company_logo_lightMode.svg';
import companyLogoDarkMode from '../../assets/images/company_logo_darkMode.svg';
import { BLUE0, BLUE1, MAGENTA2 } from '../../constants';
import { MenuSettingsOptions, SettingsMenu } from './SettingsMenu';
import { UserMenu } from './UserMenu';
import { ColorSettingsContext } from '../../contexts/colorsettings';

interface Props {
  headerOptions?: {
    reactElementRight?: ReactElement;
    reactElementLeft?: ReactElement;
    letteringElementLeft?: string;
    hideLeft?: boolean;
    hideRight?: boolean;
  };
  colorOptions?: {
    headerBackground?: string;
  };
  menuOptions?: MenuSettingsOptions;
}

export const DisaHeader = (props: Props) => {
  const menuRef = React.createRef<ContextMenu>();
  const userRef = React.createRef<ContextMenu>();
  const colorSettingsContext = useContext(ColorSettingsContext);

  const companyLogoDefault = (props: Props) => (
    <img
      src={
        colorSettingsContext?.darkmode
          ? companyLogoDarkMode
          : companyLogoLightMode
      }
      alt="Company Logo"
      style={{
        display: props.headerOptions?.hideRight ? 'none' : 'flex',
        width: '130px',
        marginRight: '-10px',
      }}
    />
  );

  const appLogoDefault = (props: Props) => (
    <div
      style={{
        display: props.headerOptions?.hideLeft ? 'none' : 'flex',
        alignItems: 'center',
        width: '420px',
      }}
    >
      <img
        id="iav-logo"
        src={
          colorSettingsContext?.darkmode ? appLogoDarkMode : appLogoLightMode
        }
        alt="DISA Logo"
        style={{
          width: '420px',
        }}
      />
    </div>
  );

  const hideSettingsMenu = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      menuRef.current?.hide(e);
    }
  };

  const hideUserMenu = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      userRef.current?.hide(e);
    }
  };

  return (
    <div
      id="disa-header"
      className={
        (colorSettingsContext?.darkmode ? 'bg-grey-5' : 'bg-blue-0') +
        ' flex justify-content-between align-items-center'
      }
      style={{
        backgroundColor: props.colorOptions?.headerBackground,
      }}
    >
      <div id="left-element" className={'flex'}>
        {props.headerOptions?.reactElementLeft
          ? props.headerOptions?.reactElementLeft
          : appLogoDefault(props)}
      </div>
      <div
        className="flex justify-content-between align-items-center"
        id="right-element"
      >
        <SettingsMenu
          ref={menuRef}
          hideMenu={hideSettingsMenu}
          menuOptions={props.menuOptions}
        />
        <UserMenu ref={userRef} hideMenu={hideUserMenu} />
        <div
          id="right-element-user-section"
          className={'flex align-items-center justify-content-end'}
        >
          <div
            className="flex justify-content-center align-items-center"
            style={{
              margin: '0rem 1rem 0rem 0rem',
              position: 'relative',
              cursor: 'pointer',
            }}
          >
            <img
              src={
                colorSettingsContext?.darkmode
                  ? notificationPicDarkMode
                  : notificationPicLightMode
              }
            />
            <div
              className="flex justify-content-center align-items-center"
              style={{
                position: 'absolute',
                transform: 'translate(18px, -10px)',
                width: '16px',
                height: '16px',
                borderRadius: '100%',
                backgroundColor: MAGENTA2,
                color: 'white',
                fontSize: '12px',
              }}
            >
              3
            </div>
          </div>
          <a
            className={'flex align-items-center justify-content-end'}
            href="#"
            style={{
              margin: '0rem 1rem 0rem 1rem',
              cursor: 'pointer',
            }}
            onClick={(e) => {
              if (menuRef.current) {
                menuRef.current.show(e);
              }
            }}
            onKeyDown={(e) => hideSettingsMenu(e)}
          >
            <img
              src={
                colorSettingsContext?.darkmode
                  ? settingsDarkMode
                  : settingsLightMode
              }
            />
          </a>
          <a
            className={'flex align-items-center justify-content-end'}
            href="#"
            style={{
              margin: '0rem 0rem 0rem 1rem',
              cursor: 'pointer',
            }}
            onClick={(e) => {
              if (userRef.current) {
                userRef.current.show(e);
              }
            }}
            onKeyDown={(e) => hideUserMenu(e)}
          >
            <img
              className="user-logo"
              src={
                colorSettingsContext?.darkmode
                  ? userIconDarkMode
                  : userIconLightMode
              }
            />
          </a>
        </div>
        <div
          id="right-element-companylogo"
          className="flex justify-content-end align-items-center"
        >
          {props.headerOptions?.reactElementRight
            ? props.headerOptions?.reactElementRight
            : companyLogoDefault(props)}
        </div>
      </div>
    </div>
  );
};

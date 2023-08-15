import React, { ReactElement, useContext } from 'react';
import './header.css';
import '../css/globalColors.css';
import { ContextMenu } from 'primereact/contextmenu';
import UserIcon from '../../assets/svg/icon_user.svg';
import CompanyLogo from '../../assets/svg/company_logo.svg';
import AppLogo from '../../assets/svg/app_logo.svg';
import SettingsIcon from '../../assets/svg/icon_settings.svg';
import { BLUE3, GREY3, WHITE } from '../../constants';
import { MenuSettingsOptions, SettingsMenu } from './settingsMenu';
import { UserMenu } from './userMenu';
import { ColorSettingsContext } from '../../contexts/colorsettings';

interface Props {
  headerOptions?: {
    reactElementRight?: ReactElement;
    reactElementLeft?: ReactElement;
    hideLeft?: boolean;
    hideRight?: boolean;
  };
  menuOptions?: MenuSettingsOptions;
}

export const Header = (props: Props) => {
  const menuRef = React.createRef<ContextMenu>();
  const userRef = React.createRef<ContextMenu>();
  const colorSettingsContext = useContext(ColorSettingsContext);

  const companyLogoDefault = (props: Props) => (
    <div
      style={{
        display: props.headerOptions?.hideRight ? 'none' : 'flex',
        alignItems: 'center',
      }}
    >
      <CompanyLogo fill={colorSettingsContext?.darkmode ? BLUE3 : WHITE} />
    </div>
  );

  const appLogoDefault = (props: Props) => (
    <div
      style={{
        display: props.headerOptions?.hideLeft ? 'none' : 'flex',
        alignItems: 'center',
      }}
    >
      <AppLogo fill={colorSettingsContext?.darkmode ? BLUE3 : WHITE} />
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
      id="header"
      className={
        (colorSettingsContext?.darkmode ? 'bg-grey-5' : 'bg-blue-0') +
        ' flex justify-content-between align-items-center'
      }
      style={{
        backgroundColor:
          colorSettingsContext?.headerColorOptions?.backgroundColor,
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
          {/* TODO: In the next Development step the implementation of the notification maybe included  */}
          {/* <div
            className="flex justify-content-center align-items-center"
            style={{
              margin: '0rem 1rem 0rem 0rem',
              position: 'relative',
              cursor: 'pointer',
            }}
          >
            <NotificationIcon
              fill={colorSettingsContext?.darkmode ? GREY3 : WHITE}
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
          </div> */}
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
            <SettingsIcon
              fill={
                colorSettingsContext?.headerColorOptions?.settingsLogoColor
                  ? colorSettingsContext?.headerColorOptions?.settingsLogoColor
                  : colorSettingsContext?.darkmode
                  ? GREY3
                  : WHITE
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
            <UserIcon
              fill={
                colorSettingsContext?.headerColorOptions?.userLogoColor
                  ? colorSettingsContext?.headerColorOptions?.userLogoColor
                  : colorSettingsContext?.darkmode
                  ? GREY3
                  : WHITE
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

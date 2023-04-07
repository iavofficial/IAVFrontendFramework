import React, { ReactElement, useContext, useState } from 'react';
import './disaHeader.scss';
import { ContextMenu } from 'primereact/contextmenu';
import AppLogo from '../../assets/images/app_logo.png';
import appLogo from '../assets/images/appLogo.png';
import UserPic from '../../assets/images/icon_user.svg';
import NotificationPic from '../../assets/images/icon-notification.svg';
import Settings from '../../assets/images/icon_settings.svg';
import CompanyLogo from '../../assets/images/company_logo.png';
import { BLUE0, BLUE1, MAGENTA2 } from '../../constants';
import { MenuSettingsOptions, SettingsMenu } from './SettingsMenu';
import { Avatar } from 'primereact/avatar';
import { Badge } from 'primereact/badge';
import { UserMenu } from './UserMenu';

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

const companyLogoDefault = (props: Props) => (
  <img
    src={CompanyLogo}
    alt="Company Logo"
    style={{
      display: props.headerOptions?.hideRight ? 'none' : 'flex',
      height: '25px',
      marginRight: '24px',
    }}
  />
);

const appLogoDefault = (props: Props) => (
  <div
    style={{
      display: props.headerOptions?.hideLeft ? 'none' : 'flex',
      alignItems: 'center',
      height: '75px',
      width: '271px',
    }}
  >
    <img
      id="iav-logo"
      src={AppLogo}
      alt="DISA Logo"
      style={{
        height: '40px',
        width: '125px',
        marginLeft: '24px',
        marginRight: '16px',
      }}
    />
    <h5 style={{ color: 'white', fontSize: '15px', fontWeight: 'lighter' }}>
      {props.headerOptions?.letteringElementLeft
        ? props.headerOptions.letteringElementLeft
        : 'Remote Service Monitor'}
    </h5>
  </div>
);

export const DisaHeader = (props: Props) => {
  const menuRef = React.createRef<ContextMenu>();
  const userRef = React.createRef<ContextMenu>();

  const hideSettingsMenu = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      menuRef.current?.hide(e);
    }
  };

  const hideUserMenu = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      console.log('triggerd');
      userRef.current?.hide(e);
    }
  };

  return (
    <div
      id="disa-header"
      className={'flex justify-content-between align-items-center'}
      style={{
        backgroundColor: props.colorOptions?.headerBackground
          ? props.colorOptions?.headerBackground
          : BLUE0,
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
            <img src={NotificationPic} />
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
            <img src={Settings} />
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
            <img className="user-logo" src={UserPic} />
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

import React from 'react';
import AppLogo from '../../assets/images/app_logo.png';

export interface Props {
  hideAppLogo: boolean | undefined;
}

export const AppLogoDefault = (props: Props) => {
  return (
    <div
      style={{
        display: props.hideAppLogo ? 'none' : 'flex',
        alignItems: 'center',
        height: '75px',
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
        Remote Service Monitor
      </h5>
    </div>
  );
};

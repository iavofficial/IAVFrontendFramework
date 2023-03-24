import React, { ReactElement } from 'react';
import './css/disaHeader.css';
import AppLogo from '../assets/images/app_logo.png';
import appLogo from '../assets/images/appLogo.png';
import CompanyLogo from '../assets/images/company_logo.png';
import { BLUE0, BLUE1 } from '../constants';

interface Props {
  headerOptions?: {
    reactElementRight?: ReactElement;
    reactElementLeft?: ReactElement;
    reactElementFull?: ReactElement;
    letteringElementLeft?: string;
    hideLeft?: boolean;
    hideRight?: boolean;
  };
  colorOptions?: {
    headerBackground?: string;
  };
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
  const disaHeader = props.headerOptions?.reactElementFull ? (
    <div
      id="disa-header"
      className={'flex justify-content-center align-items-center'}
    >
      {props.headerOptions.reactElementFull}
    </div>
  ) : (
    <div
      id="disa-header"
      className={'flex justify-content-between align-items-center'}
      style={{
        backgroundColor: props.colorOptions?.headerBackground
          ? props.colorOptions?.headerBackground
          : BLUE0,
      }}
    >
      <div id="left-element" className={'flex align-items-center'}>
        {props.headerOptions?.reactElementLeft
          ? props.headerOptions?.reactElementLeft
          : appLogoDefault(props)}
      </div>
      <div
        id="right-element"
        className="flex justify-content-end align-items-center"
      >
        {props.headerOptions?.reactElementRight
          ? props.headerOptions?.reactElementRight
          : companyLogoDefault(props)}
      </div>
    </div>
  );

  return disaHeader;
};

import React from 'react';
import CompanyLogo from '../../assets/images/company_logo.png';

export interface Props {
  hideCompanyLogo: boolean | undefined;
}

export const CompanyLogoDefault = (props: Props) => {
  return (
    <img
      src={CompanyLogo}
      alt="Company Logo"
      style={{
        display: props.hideCompanyLogo ? 'none' : 'flex',
        height: '25px',
        marginRight: '24px',
      }}
    />
  );
};

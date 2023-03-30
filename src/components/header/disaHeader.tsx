import React, { ReactElement } from 'react';
import './disaHeader.scss';
import { BLUE0, BLUE1 } from '../../constants';
import { AppLogoDefault } from './appLogoDefault';
import { CompanyLogoDefault } from './companyLogoDefault';

interface Props {
  headerOptions?: {
    reactElementRight?: ReactElement;
    reactElementLeft?: ReactElement;
    hideLeft?: boolean;
    hideRight?: boolean;
  };
  colorOptions?: {
    headerBackground?: string;
  };
}

export const DisaHeader = (props: Props) => {
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
      <div id="left-element" className={'flex align-items-center'}>
        {props.headerOptions?.reactElementLeft ? (
          props.headerOptions?.reactElementLeft
        ) : (
          <AppLogoDefault hideAppLogo={props.headerOptions?.hideLeft} />
        )}
      </div>
      <div
        id="right-element"
        className="flex justify-content-end align-items-center"
      >
        {props.headerOptions?.reactElementRight ? (
          props.headerOptions?.reactElementRight
        ) : (
          <CompanyLogoDefault
            hideCompanyLogo={props.headerOptions?.hideRight}
          />
        )}
      </div>
    </div>
  );
};

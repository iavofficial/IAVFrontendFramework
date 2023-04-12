import React from 'react';
import { Button } from 'primereact/button';
import { ProgressSpinner } from 'primereact/progressspinner';
import { BLUE3 } from '../../constants';

interface Props {
  isLoading: boolean;
  style?: {
    backGroundColor?: string;
  };
}

export const LoginButtonWithSpinner = (props: Props) => (
  <>
    {props.isLoading && (
      <ProgressSpinner
        style={{ height: '30px', width: '30px', float: 'left' }}
      />
    )}
    <Button
      label="Login"
      style={{
        width: '150px',
        float: 'right',
        border: 'none',
        borderRadius: '8px',
        backgroundColor: props.style?.backGroundColor
          ? props.style.backGroundColor
          : BLUE3,
      }}
    />
  </>
);

import React, { useContext } from 'react';
import { Button } from 'primereact/button';
import { ProgressSpinner } from 'primereact/progressspinner';
import { BLUE3, WHITE } from '../../constants';
import { ColorSettingsContext } from '../../contexts/colorsettings';

interface Props {
  isLoading: boolean;
}

export const LoginButtonWithSpinner = (props: Props) => {
  const colorSettingsContext = useContext(ColorSettingsContext);

  return (
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
          color: colorSettingsContext?.colorOptions.authenticationColorOptions
            ?.loginButtonTextColor
            ? colorSettingsContext?.colorOptions.authenticationColorOptions
                ?.loginButtonTextColor
            : WHITE,
          backgroundColor: colorSettingsContext?.colorOptions.authenticationColorOptions
            ?.loginButtonBackgroundColor
            ? colorSettingsContext?.colorOptions.authenticationColorOptions
                ?.loginButtonBackgroundColor
            : BLUE3,
        }}
      />
    </>
  );
};

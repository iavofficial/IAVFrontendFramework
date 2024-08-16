import React, {useContext} from "react";
import {Button} from "primereact/button";
import {ProgressSpinner} from "primereact/progressspinner";
import {ColorSettingsContext} from "../../contexts/colorsettings";

interface Props {
  isLoading: boolean;
}

export const LoginButtonWithSpinner = (props: Props) => {
  const colorSettingsContext = useContext(ColorSettingsContext);

  const loginButtonTextColor =
    colorSettingsContext.currentColors.authenticationView.loginButtonTextColor;
  const loginButtonBackgroundColor =
    colorSettingsContext.currentColors.authenticationView
      .loginButtonBackgroundColor;

  return (
    <>
      {props.isLoading && (
        <ProgressSpinner
          style={{ height: "30px", width: "30px", float: "left" }}
        />
      )}
      <Button
        label="Login"
        style={{
          width: "150px",
          float: "right",
          border: "none",
          borderRadius: "8px",
          color: loginButtonTextColor,
          backgroundColor: loginButtonBackgroundColor,
        }}
      />
    </>
  );
};

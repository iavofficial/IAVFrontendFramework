import React, { FormEvent } from "react";
import { Link } from "react-router-dom";
import { BLUE3, WHITE } from "../../../constants";
import { AuthContext } from "../../../contexts/auth";
import { LoginButtonWithSpinner } from "../loginButtonWithSpinner";
import { useState } from "react";
import { useContext } from "react";
import { useTranslator } from "../../internationalization/translators";
import { AuthenticationViewProps } from "../authenticationView";
import "../authenticationView.css";
import "../../css/globalColors.css";
import loginBackgroundLightMode from "../../../assets/png/login_background_lightMode.png";
import loginBackgroundDarkMode from "../../../assets/png/login_background_darkMode.png";
import { Dropdown, DropdownChangeEvent } from "primereact/dropdown";
import { LanguageContext } from "../../../contexts/language";
import { parseLanguageRessourcesIntoDropdownFormat } from "../../../utils/parseLanguageRessourcesIntoDropdownFormat";
import { ColorSettingsContext } from "../../../contexts/colorsettings";
import { generateHashOfLength } from "../../../utils/hash";
import { Tooltip } from "primereact/tooltip";
import { AppLogoPlaceholder } from "../../appLogoPlaceholder";

export const AWSAuthenticationView = (props: AuthenticationViewProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const langContext = useContext(LanguageContext);
  const colorSettingsContext = useContext(ColorSettingsContext);

  const authContext = useContext(AuthContext);
  const t = useTranslator();

  const passwortRequirementsTextColor =
    colorSettingsContext.currentColors.authenticationView
      .passwortRequirementsTextColor;
  const inputFieldDescriptionTextColor =
    colorSettingsContext.currentColors.authenticationView
      .inputFieldDescriptionTextColor;
  const inputFieldBackgroundColor =
    colorSettingsContext.currentColors.authenticationView
      .inputFieldBackgroundColor;
  const inputFieldTextColor =
    colorSettingsContext.currentColors.authenticationView.inputFieldTextColor;
  const headerBackgroundColor =
    colorSettingsContext.currentColors.authenticationView.headerBackgroundColor;
  const fullScreenBackgroundColor =
    colorSettingsContext.currentColors.authenticationView
      .fullScreenBackgroundColor;
  const loginFormBackgroundColor =
    colorSettingsContext.currentColors.authenticationView
      .loginFormBackgroundColor;
  const legalNoticeIconColor =
    colorSettingsContext.currentColors.authenticationView.legalNoticeIconColor;
  const companyTextColor =
    colorSettingsContext.currentColors.authenticationView.companyTextColor;
  const themeTogglerColor =
    colorSettingsContext.currentColors.authenticationView.themeTogglerColor;

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (authContext?.isNewPasswordRequired) {
      authContext?.completePassword(password);
    } else {
      authContext?.login({ email: email, password: password });
    }
  };

  const getErrorText = (error: undefined | { [key: string]: any } | string) => {
    if (error) {
      if (typeof error === "object") {
        if (error.code) {
          if (error.code === "UserGroupError") {
            return t("invalid_access_configuration"); // user was not added to a group
          } else if (error.code === "NotAuthorizedException") {
            return t("invalid_username_or_password"); // invalid user credentials
          } else if (error.code === "InvalidPasswordException") {
            return t("password_requirements_not_met"); // set password does not conform to password policy
          } else {
            return t("server_error");
          }
        } else if (error.message) {
          if (error.message === "UserGroupError") {
            return t("invalid_access_configuration");
          }
          return error.message;
        }
      } else {
        return t("server_error");
      }
    }
    return "";
  };

  const companyLogoDefault = (props: AuthenticationViewProps) => {
    return (
      <div
        style={{
          display: props.headerOptions?.hideRight ? "none" : "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          color: colorSettingsContext?.darkmode ? BLUE3 : WHITE,
          width: "100%",
          fontSize: "32px",
          paddingRight: "16px",
        }}
      >
        LOGO
      </div>
    );
  };

  const NewPasswordForm = (
    <div style={{ width: "100%", height: "100%" }}>
      <div
        style={{ margin: "0px 24px 0px 24px" }}
        className={"flex flex-column"}
      >
        <div
          style={{
            color: passwortRequirementsTextColor,
          }}
        >
          <p>{t("replace_temporary_password")}</p>
          <ul>
            <li>{t("password_req_8_characters")}</li>
            <li>{t("password_req_upper_lower_case")}</li>
            <li>{t("password_req_special_character")}</li>
            <li>{t("password_req_one_digit")}</li>
          </ul>
        </div>
        <form autoComplete="off" onSubmit={submit}>
          <div>
            <label
              style={{
                fontWeight: "normal",
                marginBottom: "2px",
                fontSize: "12px",
                color: inputFieldDescriptionTextColor,
              }}
              className={
                "inputLabel " + (authContext?.loginError ? "invalid" : "")
              }
            >
              {t("New_password")}
            </label>
            <input
              name="password"
              type="password"
              id="inputPassword"
              style={{
                marginBottom: "40px",
                width: "100%",
                backgroundColor: inputFieldBackgroundColor,
                color: inputFieldTextColor,
              }}
              className={
                "form-control p-inputtext " +
                (authContext?.loginError ? "invalid" : "")
              }
              onChange={(ev) => setPassword(ev.target.value)}
              required
              autoFocus
            />

            <LoginButtonWithSpinner isLoading={authContext?.isLoading} />
            <div className="invalid">
              {getErrorText(authContext?.loginError)}
            </div>
          </div>
        </form>
      </div>
    </div>
  );

  const LoginForm = (
    <form
      style={{
        width: "100%",
        height: "100%",
      }}
      onSubmit={submit}
    >
      <div
        style={{ margin: "40px 24px 0px 24px" }}
        className={"flex flex-column"}
      >
        <label
          style={{
            fontWeight: "normal",
            marginBottom: "2px",
            fontSize: "12px",
            color: inputFieldDescriptionTextColor,
          }}
          className="inputLabel"
        >
          {t("Email_address")}
        </label>
        <input
          value={email.valueOf()}
          onChange={(ev) => setEmail(ev.target.value)}
          name="email"
          type="email"
          className="p-inputtext"
          required
          autoFocus
          style={{
            marginBottom: "40px",
            backgroundColor: inputFieldBackgroundColor,
            color: inputFieldTextColor,
          }}
        />
        <label
          style={{
            fontWeight: "normal",
            marginBottom: "2px",
            fontSize: "12px",
            color: inputFieldDescriptionTextColor,
          }}
          className="inputLabel"
        >
          {t("Password")}
        </label>
        <input
          value={password.valueOf()}
          onChange={(ev) => setPassword(ev.target.value)}
          name="password"
          type="password"
          className="p-inputtext"
          required
          style={{
            marginBottom: "40px",
            backgroundColor: inputFieldBackgroundColor,
            color: inputFieldTextColor,
          }}
        />
        <div>
          <LoginButtonWithSpinner isLoading={authContext?.isLoading} />
        </div>
        <div style={{ marginTop: "20px" }} className="invalid">
          {getErrorText(authContext?.loginError)}
        </div>
      </div>
    </form>
  );

  const header = (props: AuthenticationViewProps) => (
    <div
      className="flex justify-content-between"
      style={{
        backgroundColor: headerBackgroundColor,
        color: "white",
        alignItems: "center",
        height: "56px",
      }}
    >
      <div
        id="left-element-authentication"
        className="flex align-items-center default-app-logo-text-style"
      >
        {props.headerOptions?.reactElementLeft ? (
          props.headerOptions?.reactElementLeft
        ) : (
          <AppLogoPlaceholder />
        )}
      </div>
      <div
        id="right-element-authentication"
        className="flex justify-content-end align-items-center default-app-logo-text-style"
      >
        {props.headerOptions?.reactElementRight
          ? props.headerOptions?.reactElementRight
          : companyLogoDefault(props)}
      </div>
    </div>
  );

  const identifier = generateHashOfLength(4);
  const identifierLegal = "a" + identifier;
  const identifierWithDot = "." + identifierLegal;
  return (
    <div
      className="flex"
      style={{
        height: "100%",
        background: "",
        backgroundColor: fullScreenBackgroundColor,
      }}
    >
      {colorSettingsContext?.colorOptions.authenticationView
        ?.fullScreenBackgroundColor ? (
        <></>
      ) : (
        <img
          style={{
            inset: "0px",
            position: "absolute",
            zIndex: "-100",
            height: "100vh",
            width: "100vw",
            objectFit: "cover",
          }}
          src={
            props.authOptions?.backgroundImage
              ? props.authOptions?.backgroundImage
              : colorSettingsContext?.darkmode
              ? loginBackgroundDarkMode
              : loginBackgroundLightMode
          }
        />
      )}
      <div
        className="flex flex-column shadow-6"
        style={{
          width: "620px",
          margin: "auto",
          position: "relative",
          backgroundColor: loginFormBackgroundColor,
        }}
      >
        <div>{header(props)}</div>
        <div className="flex flex-column" style={{ justifyContent: "center" }}>
          <div
            style={{ width: "100%", padding: "24px 24px 0px 0px" }}
            className="flex align-items-center justify-content-end"
          >
            {props.authOptions?.preventDarkmode === true ? (
              <></>
            ) : (
              <>
                <i
                  onClick={() =>
                    colorSettingsContext?.setDarkmode(
                      !colorSettingsContext.darkmode
                    )
                  }
                  style={{
                    color: themeTogglerColor,
                  }}
                  className={`switch-colormode-logos pi ${
                    colorSettingsContext.darkmode ? "pi-moon" : "pi-sun"
                  }`}
                />
              </>
            )}

            {!props.hideLanguageSelection && (
              <Dropdown
                style={{
                  width: "160px",
                  backgroundColor: inputFieldBackgroundColor,
                  color: inputFieldTextColor,
                }}
                placeholder={
                  langContext?.resources[langContext.activeLang].translation
                    .option_name
                }
                onChange={function (event: DropdownChangeEvent) {
                  langContext?.selectLanguage(event.value.key);
                }}
                options={parseLanguageRessourcesIntoDropdownFormat(
                  langContext?.resources
                )}
                optionLabel="label"
              />
            )}
          </div>
          {authContext?.isNewPasswordRequired ? NewPasswordForm : LoginForm}
        </div>

        {!props.hideLegalDocuments && (
          <Link
            style={{
              position: "absolute",
              bottom: "12px",
              left: "16px",
              textDecoration: "none",
            }}
            to="/documents"
            target="_blank"
          >
            <span
              className={"pi pi-info-circle " + identifierLegal}
              style={{
                fontSize: "medium",
                fontWeight: "bold",
                color: legalNoticeIconColor,
              }}
            />
          </Link>
        )}

        <Tooltip
          content={t(
            props.authOptions?.documentsLabelKey
              ? props.authOptions?.documentsLabelKey
              : "Imprint"
          )}
          target={identifierWithDot}
          id="hover-image"
        />
        <span
          style={{
            alignSelf: "center",
            padding: "24px",
            fontSize: "11px",
            color: companyTextColor,
          }}
        >
          &copy;{" "}
          {props.authOptions?.companyText
            ? props.authOptions?.companyText
            : "IAV GmbH 2024"}
        </span>
      </div>
    </div>
  );
};

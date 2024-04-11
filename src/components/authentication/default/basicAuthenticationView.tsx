import React, { FormEvent, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { WHITE, BLUE3 } from "../../../constants";
import { AuthContext } from "../../../contexts/auth";
import { LoginButtonWithSpinner } from "../loginButtonWithSpinner";
import { useTranslator } from "../../internationalization/translators";
import { AuthenticationViewProps } from "../authenticationView";
import "../authenticationView.css";
import "../../css/globalColors.css";
import loginBackgroundLightMode from "../../../assets/png/login_background_lightMode.png";
import loginBackgroundDarkMode from "../../../assets/png/login_background_darkMode.png";
import CompanyLogo from "../../../assets/svg/company_logo.svg";
import { Dropdown, DropdownChangeEvent } from "primereact/dropdown";
import { LanguageContext } from "../../../contexts/language";
import { parseLanguageRessourcesIntoDropdownFormat } from "../../../utils/parseLanguageRessourcesIntoDropdownFormat";
import { ColorSettingsContext } from "../../../contexts/colorsettings";
import { generateHashOfLength } from "../../../utils/hash";
import { Tooltip } from "primereact/tooltip";
import { AppLogoPlaceholder } from "../../appLogoPlaceholder";

export const BasicAuthenticationView = (props: AuthenticationViewProps) => {
  const colorSettingsContext = useContext(ColorSettingsContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const langContext = useContext(LanguageContext);

  const authContext = useContext(AuthContext);
  const t = useTranslator();

  const headerBackgroundColor =
    colorSettingsContext.currentColors.authenticationView.headerBackgroundColor;
  const fullScreenBackgroundColor =
    colorSettingsContext.currentColors.authenticationView
      .fullScreenBackgroundColor;
  const loginFormBackgroundColor =
    colorSettingsContext.currentColors.authenticationView
      .loginFormBackgroundColor;
  const inputFieldDescriptionTextColor =
    colorSettingsContext.currentColors.authenticationView
      .inputFieldDescriptionTextColor;
  const inputFieldBackgroundColor =
    colorSettingsContext.currentColors.authenticationView
      .inputFieldBackgroundColor;
  const inputFieldTextColor =
    colorSettingsContext.currentColors.authenticationView.inputFieldTextColor;
  const legalNoticeIconColor =
    colorSettingsContext.currentColors.authenticationView.legalNoticeIconColor;
  const companyTextColor =
    colorSettingsContext.currentColors.authenticationView.companyTextColor;
  const themeTogglerColor =
    colorSettingsContext.currentColors.authenticationView.themeTogglerColor;

  // These two functions life on the class instance not on the prototype thanks to @babel/plugin-proposal-class-properties.
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    authContext?.login({ email: email, password: password });
  };

  const companyLogoDefault = (props: AuthenticationViewProps) => (
    <div
      style={{
        display: props.headerOptions?.hideRight ? "none" : "flex",
        alignItems: "center",
      }}
    >
      <CompanyLogo fill={colorSettingsContext?.darkmode ? BLUE3 : WHITE} />
    </div>
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
        className="flex justify-content-end align-items-center"
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
        position: "relative",
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
          position: "relative",
          width: "620px",
          margin: "auto",
          backgroundColor: loginFormBackgroundColor,
        }}
      >
        <div>{header(props)}</div>
        <div
          className="flex flex-column justify-content-center align-items-center"
          style={{ marginBottom: "30px" }}
        >
          <div
            style={{ width: "100%", padding: "24px 24px 0px 0px" }}
            className="flex align-items-center justify-content-end"
          >
            {props.authOptions?.preventDarkmode === true ? (
              <React.Fragment />
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
                id="change-language-dropdown"
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
                className="inputLabel"
                style={{
                  fontWeight: "normal",
                  marginBottom: "2px",
                  fontSize: "12px",
                  color: inputFieldDescriptionTextColor,
                }}
              >
                {t("Email_address")}
              </label>
              <input
                value={email.valueOf()}
                onChange={(ev) => setEmail(ev.target.value)}
                name="email"
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
                className="inputLabel"
                style={{
                  fontWeight: "normal",
                  marginBottom: "2px",
                  fontSize: "12px",
                  color: inputFieldDescriptionTextColor,
                }}
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
            </div>
          </form>
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
            : "IAV GmbH 2023"}
        </span>
      </div>
    </div>
  );
};

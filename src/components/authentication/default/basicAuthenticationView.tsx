import React, { FormEvent, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { WHITE, BLUE3 } from "../../../constants";
import { AuthContext } from "../../../contexts/auth";
import { LoginButtonWithSpinner } from "../loginButtonWithSpinner";
import { useTranslator } from "../../internationalization/translators";
import { AuthenticationViewProps } from "../authenticationView";
import "../authenticationView.css";
import "../../css/globalColors.css";
import loginBackgroundLightMode from "../../../assets/images/login_background_lightMode.png";
import loginBackgroundDarkMode from "../../../assets/images/login_background_darkMode.png";
import { ReactComponent as CompanyLogo } from "../../../assets/images/company_logo.svg";
import { ReactComponent as AppLogo } from "../../../assets/images/app_logo.svg";
import { Dropdown, DropdownChangeEvent } from "primereact/dropdown";
import { LanguageContext } from "../../../contexts/language";
import { parseLanguageRessourcesIntoDropdownFormat } from "../../../services/parseLanguageRessourcesIntoDropdownFormat";
import { ColorSettingsContext } from "../../../contexts/colorsettings";
import { generateHashOfLength } from "../../../services/hash";
import { Tooltip } from "primereact/tooltip";

export const BasicAuthenticationView = (props: AuthenticationViewProps) => {
  const colorSettingsContext = useContext(ColorSettingsContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const langContext = useContext(LanguageContext);

  const authContext = useContext(AuthContext);
  const t = useTranslator();

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

  const appLogoDefault = (props: AuthenticationViewProps) => (
    <div
      style={{
        display: props.headerOptions?.hideLeft ? "none" : "flex",
        alignItems: "center",
      }}
    >
      <AppLogo fill={colorSettingsContext?.darkmode ? BLUE3 : WHITE} />
    </div>
  );

  const header = (props: AuthenticationViewProps) => (
    <div
      className={
        (colorSettingsContext?.darkmode ? "bg-grey-5" : "bg-blue-0") +
        " flex justify-content-between"
      }
      style={{
        backgroundColor:
          colorSettingsContext?.authenticationColorOptions
            ?.headerBackgroundColor,
        color: "white",
        alignItems: "center",
        height: "56px",
      }}
    >
      <div
        id="left-element-authentication"
        className={"flex align-items-center"}
      >
        {props.headerOptions?.reactElementLeft
          ? props.headerOptions?.reactElementLeft
          : appLogoDefault(props)}
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
        backgroundColor:
          colorSettingsContext?.authenticationColorOptions
            ?.fullScreenBackgroundColor,
      }}
    >
      {colorSettingsContext?.authenticationColorOptions
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
        className={
          (colorSettingsContext?.darkmode ? "bg-grey-5" : "bg-white-1") +
          " flex flex-column shadow-6"
        }
        style={{
          position: "relative",
          width: "620px",
          margin: "auto",
          backgroundColor:
            colorSettingsContext?.authenticationColorOptions
              ?.loginFormBackgroundColor,
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
                {colorSettingsContext?.darkmode ? (
                  <i
                    onClick={() =>
                      colorSettingsContext?.setDarkmode(
                        !colorSettingsContext.darkmode
                      )
                    }
                    className={"pi pi-sun switch-colormode-logos color-white"}
                  />
                ) : (
                  <i
                    onClick={() =>
                      colorSettingsContext?.setDarkmode(
                        !colorSettingsContext.darkmode
                      )
                    }
                    className="pi pi-moon switch-colormode-logos"
                  />
                )}
              </>
            )}

            {!props.hideLanguageSelection && (
              <Dropdown
                id="change-language-dropdown"
                className={
                  colorSettingsContext?.darkmode
                    ? "bg-grey-5 color-white"
                    : "bg-white-1 color-black"
                }
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
                style={{ width: "160px" }}
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
                style={{
                  fontWeight: "normal",
                  marginBottom: "2px",
                  fontSize: "12px",
                  color:
                    colorSettingsContext?.authenticationColorOptions
                      ?.inputFieldDescriptionTextColor,
                }}
                className={
                  (colorSettingsContext?.darkmode
                    ? "color-white"
                    : "color-black") + " inputLabel"
                }
              >
                {t("Email_address")}
              </label>
              <input
                value={email.valueOf()}
                onChange={(ev) => setEmail(ev.target.value)}
                name="email"
                className={
                  (colorSettingsContext?.darkmode
                    ? "bg-grey-4 color-white"
                    : "bg-white-1 color-black") + " p-inputtext"
                }
                required
                autoFocus
                style={{
                  marginBottom: "40px",
                  backgroundColor:
                    colorSettingsContext?.authenticationColorOptions
                      ?.inputFieldBackgroundColor,
                  color:
                    colorSettingsContext?.authenticationColorOptions
                      ?.inputFieldTextColor,
                }}
              />
              <label
                style={{
                  fontWeight: "normal",
                  marginBottom: "2px",
                  fontSize: "12px",
                  color:
                    colorSettingsContext?.authenticationColorOptions
                      ?.inputFieldDescriptionTextColor,
                }}
                className={
                  (colorSettingsContext?.darkmode
                    ? "color-white"
                    : "color-black") + " inputLabel"
                }
              >
                {t("Password")}
              </label>
              <input
                value={password.valueOf()}
                onChange={(ev) => setPassword(ev.target.value)}
                name="password"
                type="password"
                className={
                  (colorSettingsContext?.darkmode
                    ? "bg-grey-4 color-white"
                    : "bg-white-1 color-black") + " p-inputtext"
                }
                required
                style={{
                  marginBottom: "40px",
                  backgroundColor:
                    colorSettingsContext?.authenticationColorOptions
                      ?.inputFieldBackgroundColor,
                  color:
                    colorSettingsContext?.authenticationColorOptions
                      ?.inputFieldTextColor,
                }}
              />
              <div>
                <LoginButtonWithSpinner isLoading={authContext?.isLoading} />
              </div>
            </div>
          </form>
        </div>

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
              color: colorSettingsContext?.authenticationColorOptions
                ?.legalNoticeIconColor
                ? colorSettingsContext?.authenticationColorOptions
                    ?.legalNoticeIconColor
                : BLUE3,
            }}
          />
        </Link>
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
          className={
            colorSettingsContext?.darkmode ? "color-white" : "color-black"
          }
          style={{
            alignSelf: "center",
            padding: "24px",
            fontSize: "11px",
            color:
              colorSettingsContext?.authenticationColorOptions
                ?.companyTextColor,
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

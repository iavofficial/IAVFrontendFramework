/**
 * Copyright © 2025 IAV GmbH Ingenieurgesellschaft Auto und Verkehr, All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import React, {FormEvent, useContext, useState} from "react";
import {Link} from "react-router-dom";
import {useTranslator} from "@iavofficial/frontend-framework/translators";
import {AuthenticationViewProps} from "@iavofficial/frontend-framework-shared/authenticationViewProps";
import loginBackgroundLightMode from "../assets/png/login_background_lightMode.png";
import loginBackgroundDarkMode from "../assets/png/login_background_darkMode.png";
import {Dropdown, DropdownChangeEvent} from "primereact/dropdown";
import {LanguageContext} from "@iavofficial/frontend-framework/language";
import {parseLanguageResourcesIntoDropdownFormat} from "@iavofficial/frontend-framework-shared/parseLanguageResourcesIntoDropdownFormat";
import {generateHashOfLength} from "@iavofficial/frontend-framework-shared/hash";
import {Tooltip} from "primereact/tooltip";
import CompanyLogo from "../assets/svg/companyLogo";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {
  AWSAuthenticatorAuthDispatch,
  AWSAuthenticator,
  AWSAuthenticatorStoreState,
} from "../awsAuthenticatorModule";
import {ColorSettingsContext} from "@iavofficial/frontend-framework-shared/colorSettingsContext";
import {LoginButtonWithSpinner} from "@iavofficial/frontend-framework-shared/loginButtonWithSpinner";
import {AppLogoPlaceholder} from "@iavofficial/frontend-framework-shared/appLogoPlaceholder";
import {MandatoryModuleNames} from "@iavofficial/frontend-framework-shared/mandatoryModuleNames";
import {
  APPLICATION_LOGO_PLACEHOLDER,
  BLUE3,
  PADDING_GAB,
  WHITE,
} from "@iavofficial/frontend-framework-shared/constants";

interface AWSAuthenticationViewProps extends AuthenticationViewProps {
  module: AWSAuthenticator;
}

export const awsAuthenticationViewFactory = (module: AWSAuthenticator) => {
  return (props: AuthenticationViewProps) => (
    <AWSAuthenticationView module={module} {...props} />
  );
};

export const AWSAuthenticationView = (props: AWSAuthenticationViewProps) => {
  const {module} = props;

  const dispatch = useDispatch<AWSAuthenticatorAuthDispatch>();
  const useAuthSelector: TypedUseSelectorHook<AWSAuthenticatorStoreState> =
    useSelector;

  const isNewPasswordRequired = useAuthSelector(
    (state) =>
      state[MandatoryModuleNames.Authentication].extras.isNewPasswordRequired,
  );
  const loginError =
    useAuthSelector(
      (state) => state[MandatoryModuleNames.Authentication].extras.loginError,
    ) ?? "";
  const isLoading = useAuthSelector(
    (state) => state[MandatoryModuleNames.Authentication].isLoading,
  );

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const langContext = useContext(LanguageContext);
  const colorSettingsContext = useContext(ColorSettingsContext);

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
    if (isNewPasswordRequired) {
      dispatch(module.extras.completePassword({newPassword: password}));
    } else {
      dispatch(module.login({credentials: {email: email, password: password}}));
    }
  };

  const companyLogoDefault = (props: AuthenticationViewProps) => (
    <div
      style={{
        display: props.headerOptions?.hideRight ? "none" : "flex",
        alignItems: "center",
        paddingRight: `${PADDING_GAB}px`,
      }}
    >
      <CompanyLogo fill={colorSettingsContext?.darkmode ? BLUE3 : WHITE} />
    </div>
  );

  const NewPasswordForm = (
    <div style={{width: "100%", height: "100%"}}>
      <div style={{margin: "0px 24px 0px 24px"}} className={"flex flex-column"}>
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
              className={"inputLabel " + (loginError ? "invalid" : "")}
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
                "form-control p-inputtext " + (loginError ? "invalid" : "")
              }
              onChange={(ev) => setPassword(ev.target.value)}
              required
              autoFocus
            />

            <LoginButtonWithSpinner isLoading={isLoading} />
            <div className="invalid">{t(loginError)}</div>
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
        style={{margin: "40px 24px 0px 24px"}}
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
          <LoginButtonWithSpinner isLoading={isLoading} />
        </div>
        <div style={{marginTop: "20px"}} className="invalid">
          {t(loginError)}
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
          <AppLogoPlaceholder
            appLogoPlaceholder={APPLICATION_LOGO_PLACEHOLDER}
          />
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
        <div className="flex flex-column" style={{justifyContent: "center"}}>
          <div
            style={{width: "100%", padding: "24px 24px 0px 0px"}}
            className="flex align-items-center justify-content-end"
          >
            {props.authOptions?.preventDarkmode === true ? (
              <></>
            ) : (
              <>
                <i
                  onClick={() =>
                    colorSettingsContext?.setDarkmode(
                      !colorSettingsContext.darkmode,
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
                options={parseLanguageResourcesIntoDropdownFormat(
                  langContext?.resources,
                )}
                optionLabel="label"
              />
            )}
          </div>
          {isNewPasswordRequired ? NewPasswordForm : LoginForm}
        </div>

        {!props.hideLegalDocuments && (
          <Link
            style={{
              position: "absolute",
              bottom: "12px",
              left: `${PADDING_GAB}px`,
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
              : "Imprint",
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

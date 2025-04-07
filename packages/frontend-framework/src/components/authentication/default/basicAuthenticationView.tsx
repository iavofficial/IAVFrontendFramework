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
import {
  APPLICATION_LOGO_PLACEHOLDER,
  BLUE3,
  PADDING_GAB,
  WHITE,
} from "@iavofficial/frontend-framework-shared/constants";
import loginBackgroundLightMode from "../../../assets/png/login_background_lightMode.png";
import loginBackgroundDarkMode from "../../../assets/png/login_background_darkMode.png";
import {Dropdown, DropdownChangeEvent} from "primereact/dropdown";
import CompanyLogo from "../../../assets/svg/companyLogo";
import TextField from "../../helper/textfield/TextField";
import {AuthenticationViewProps} from "@iavofficial/frontend-framework-shared/authenticationViewProps";
import {generateHashOfLength} from "@iavofficial/frontend-framework-shared/hash";
import {parseLanguageResourcesIntoDropdownFormat} from "@iavofficial/frontend-framework-shared/parseLanguageResourcesIntoDropdownFormat";
import {LoginButtonWithSpinner} from "@iavofficial/frontend-framework-shared/loginButtonWithSpinner";
import {AppLogoPlaceholder} from "@iavofficial/frontend-framework-shared/appLogoPlaceholder";
import {ColorSettingsContext} from "@iavofficial/frontend-framework-shared/colorSettingsContext";
import {useModule} from "@iavofficial/frontend-framework-shared/moduleContext";
import {MandatoryModuleNames} from "@iavofficial/frontend-framework-shared/moduleNames";
import {
  useDefaultDispatch,
  useDefaultSelector,
} from "@iavofficial/frontend-framework-shared/moduleDefaults";
import {useModuleTranslation} from "@iavofficial/frontend-framework-shared/useModuleTranslation";

export const BasicAuthenticationView = (props: AuthenticationViewProps) => {
  const authModule = useModule(MandatoryModuleNames.Authenticator);
  const intModule = useModule(MandatoryModuleNames.Internationalizer);

  const colorSettingsContext = useContext(ColorSettingsContext);

  const dispatch = useDefaultDispatch();

  const isLoading = useDefaultSelector(
    (state) => state[MandatoryModuleNames.Authenticator].isLoading,
  );

  const t = useModuleTranslation();
  const activeLang = useDefaultSelector(
    (state) => state[MandatoryModuleNames.Internationalizer].activeLang,
  );

  const [triedToSubmit, setTriedToSubmit] = useState<boolean>(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const headerBackgroundColor =
    colorSettingsContext.currentColors.authenticationView.headerBackgroundColor;
  const fullScreenBackgroundColor =
    colorSettingsContext.currentColors.authenticationView
      .fullScreenBackgroundColor;
  const loginFormBackgroundColor =
    colorSettingsContext.currentColors.authenticationView
      .loginFormBackgroundColor;
  const inputFieldBackgroundColor =
    colorSettingsContext.currentColors.authenticationView
      .inputFieldBackgroundColor;
  const inputFieldTextColor =
    colorSettingsContext.currentColors.authenticationView.inputFieldTextColor;
  const companyTextColor =
    colorSettingsContext.currentColors.authenticationView.companyTextColor;
  const themeTogglerColor =
    colorSettingsContext.currentColors.authenticationView.themeTogglerColor;
  const legalLinkColor =
    colorSettingsContext.currentColors.authenticationView.legalLinkColor;

  const {passwordErrorMessage} = props.authOptions?.errorMessages || {};

  const isAtLeastOneDocumentVisible = props.legalDocuments?.some(
    (document) => !document.isHidden,
  );
  // These two functions life on the class instance not on the prototype thanks to @babel/plugin-proposal-class-properties.
  const submit = (event: FormEvent<HTMLFormElement>) => {
    setTriedToSubmit(true);
    event.preventDefault();
    dispatch(
      authModule.login({credentials: {email: email, password: password}}),
    );
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
          style={{marginBottom: "30px"}}
        >
          <div
            style={{width: "100%", padding: "24px 24px 0px 0px"}}
            className="flex align-items-center justify-content-end"
          >
            {props.authOptions?.preventDarkmode === true ? (
              <React.Fragment />
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
                id="change-language-dropdown"
                style={{
                  width: "160px",
                  backgroundColor: inputFieldBackgroundColor,
                  color: inputFieldTextColor,
                }}
                placeholder={
                  intModule.translationResources[activeLang].translation
                    .option_name
                }
                onChange={function (event: DropdownChangeEvent) {
                  intModule.selectActiveLang(event.value.key);
                }}
                options={parseLanguageResourcesIntoDropdownFormat(
                  intModule.translationResources,
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
              style={{margin: "40px 24px 0px 24px"}}
              className={"flex flex-column"}
            >
              <TextField
                style={{
                  marginBottom: "30px",
                  backgroundColor: inputFieldBackgroundColor,
                  color: inputFieldTextColor,
                }}
                label={t({key: "Email_address"})}
                id="email"
                name="email"
                required={true}
                autoFocus={true}
                value={email.valueOf()}
                onChange={(event) => setEmail(event.target.value)}
              />
              <TextField
                label={t({key: "Password"})}
                id="password"
                name="password"
                type="password"
                required={true}
                error={triedToSubmit && !isLoading}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                helperText={passwordErrorMessage || t({key: "wrong_password"})}
              />
              <div>
                <LoginButtonWithSpinner isLoading={isLoading} />
              </div>
            </div>
          </form>
        </div>
        <div
          className="flex"
          style={{
            alignSelf: "center",
            padding: "24px",
            fontSize: "12px",
            gap: "20px",
            alignItems: "center",
          }}
        >
          <span
            style={{
              color: companyTextColor,
              minWidth: "94px"
            }}
          >
            &copy;{" "}
            {props.authOptions?.companyText
              ? props.authOptions?.companyText
              : "Company 2025"}
          </span>

          {isAtLeastOneDocumentVisible && (
            <>
              <span style={{color: "var(--grey-2)"}}>|</span>
              <div
                className="flex"
                style={{
                  alignItems: "center",
                  gap: "5px",
                }}
              >
                {props.legalDocuments
                  ?.filter((document) => !document.isHidden)
                  .map((document) => (
                    <Link
                      key={document.path}
                      className="legal-doc-link"
                      style={{color: legalLinkColor, fontSize: "12px"}}
                      to={document.path}
                      target="_blank"
                    >
                      {t({key: document.titleTranslationKey})}
                    </Link>
                  ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

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

import React, {FormEvent, useContext, useMemo, useState} from "react";
import {AuthenticationViewProps} from "@iavofficial/frontend-framework-shared/authenticationViewProps";
import loginBackgroundLightMode from "../assets/png/login_background_lightMode.png";
import loginBackgroundDarkMode from "../assets/png/login_background_darkMode.png";
import {Dropdown, DropdownChangeEvent} from "primereact/dropdown";
import {
    parseLanguageResourcesIntoDropdownFormat
} from "@iavofficial/frontend-framework-shared/parseLanguageResourcesIntoDropdownFormat";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {
    AwsAuthenticator,
    AwsAuthenticatorAuthDispatch,
    AwsAuthenticatorState,
    AwsAuthenticatorStoreState,
} from "../awsAuthenticatorModule";
import {ColorSettingsContext} from "@iavofficial/frontend-framework-shared/colorSettingsContext";
import {AwsAuthenticatorExtras} from "../awsAuthenticatorTypes";
import {AuthModule} from "@iavofficial/frontend-framework-shared/authenticatorModule";
import {MandatoryModuleNames} from "@iavofficial/frontend-framework-shared/moduleNames";
import {InternationalizerModule} from "@iavofficial/frontend-framework-shared/internationalizerModule";
import {useDefaultSelector} from "@iavofficial/frontend-framework-shared/moduleDefaults";
import {useModuleContext} from "@iavofficial/frontend-framework-shared/moduleContext";
import {NewPasswordForm} from "./auth_view/newPasswordForm";
import {LoginForm} from "./auth_view/loginForm";
import makeStyles from "@iavofficial/frontend-framework-shared/makeStyles";
import {Header} from "./auth_view/header";
import {ImprintLoginContainer} from "@iavofficial/frontend-framework-shared/imprintLoginContainer";

const useStyles = makeStyles(({
                                  fullScreenBackgroundColor,
                                  loginFormBackgroundColor,
                                  themeTogglerColor,
                                  companyTextColor,
                                  inputFieldBackgroundColor,
                                  inputFieldTextColor
                              }: {
    fullScreenBackgroundColor: string;
    loginFormBackgroundColor: string;
    themeTogglerColor: string;
    companyTextColor: string;
    inputFieldBackgroundColor: string;
    inputFieldTextColor: string;
}) => ({
    container: {
        height: "100%",
        background: "",
        backgroundColor: fullScreenBackgroundColor,
    },
    backgroundImage: {
        inset: "0px",
        position: "absolute",
        zIndex: "-100",
        height: "100vh",
        width: "100vw",
        objectFit: "cover",
    },
    loginFormContainer: {
        width: "620px",
        margin: "auto",
        position: "relative",
        backgroundColor: loginFormBackgroundColor
    },
    loginFormContentContainer: {
        justifyContent: "center"
    },
    dropdownContainer: {
        width: "100%",
        padding: "24px 24px 0px 0px"
    },
    darkModeIcon: {
        color: themeTogglerColor
    },
    imprintWrapper: {
        alignSelf: "center",
        padding: "24px",
        fontSize: "12px",
        gap: "20px",
        alignItems: "center"
    },
    companyText: {
        color: companyTextColor
    },
    dropdown: {
        width: "160px",
        backgroundColor: inputFieldBackgroundColor,
        color: inputFieldTextColor,
    }
}));

type NecessaryAuthModuleAttributes = {
    extras: AwsAuthenticatorExtras;
} & Omit<AuthModule<AwsAuthenticatorState>, "useModuleLifecycle">;

export const AwsAuthenticationView = <
    TModules extends {
        [MandatoryModuleNames.Authenticator]: NecessaryAuthModuleAttributes;
        [MandatoryModuleNames.Internationalizer]: InternationalizerModule;
    } = {
        [MandatoryModuleNames.Authenticator]: AwsAuthenticator;
        [MandatoryModuleNames.Internationalizer]: InternationalizerModule;
    },
>(
    props: AuthenticationViewProps,
) => {
    const {modules} = useModuleContext<TModules>();
    const authenticationModule = modules[MandatoryModuleNames.Authenticator];
    const intModule = modules[MandatoryModuleNames.Internationalizer];

    const dispatch = useDispatch<AwsAuthenticatorAuthDispatch>();
    const useTypedSelector: TypedUseSelectorHook<AwsAuthenticatorStoreState> =
        useSelector;

    const isNewPasswordRequired = useTypedSelector(
        (state) =>
            state[MandatoryModuleNames.Authenticator].extras.isNewPasswordRequired,
    );
    const loginError =
        useTypedSelector(
            (state) => state[MandatoryModuleNames.Authenticator].extras.loginError,
        ) ?? "";

    const isLoading = useTypedSelector(
        (state) => state[MandatoryModuleNames.Authenticator].isLoading,
    );

    const activeLang = useDefaultSelector(
        (state) => state[MandatoryModuleNames.Internationalizer].activeLang,
    );

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const colorSettingsContext = useContext(ColorSettingsContext);

    const t = intModule.useTranslation();

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
    const companyTextColor =
        colorSettingsContext.currentColors.authenticationView.companyTextColor;
    const themeTogglerColor =
        colorSettingsContext.currentColors.authenticationView.themeTogglerColor;
    const legalLinkColor =
        colorSettingsContext.currentColors.authenticationView.legalLinkColor;

    const {classes, cx} = useStyles({
        fullScreenBackgroundColor,
        loginFormBackgroundColor,
        companyTextColor,
        themeTogglerColor,
        inputFieldBackgroundColor,
        inputFieldTextColor
    })

    const submit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (isNewPasswordRequired) {
            dispatch(
                authenticationModule.extras.completePassword({newPassword: password}),
            );
        } else {
            dispatch(
                authenticationModule.login({
                    credentials: {email: email, password: password},
                }),
            );
        }
    };

    const backgroundImage = useMemo(() => {
        return props.authOptions?.backgroundImage
            ? props.authOptions.backgroundImage
            : colorSettingsContext?.darkmode
                ? loginBackgroundDarkMode as string
                : loginBackgroundLightMode as string;
    }, [props.authOptions?.backgroundImage, colorSettingsContext?.darkmode]);

    return (
        <div className={cx("flex", classes.container)}>
            {colorSettingsContext?.colorOptions.authenticationView
                ?.fullScreenBackgroundColor ? (
                <></>
            ) : (
                <img
                    className={classes.backgroundImage}
                    src={backgroundImage}
                    alt="Background image"
                />
            )}
            <div className={cx("flex flex-column shadow-6", classes.loginFormContainer)}>
                <Header
                    headerBackgroundColor={headerBackgroundColor}
                    hideLanguageSelection={props.hideLanguageSelection}
                    headerOptions={props.headerOptions}
                    authOptions={props.authOptions}
                    hideImprint={props.hideImprint}
                    hidePrivacyPolicy={props.hidePrivacyPolicy}
                />
                <div className={cx("flex flex-column", classes.loginFormContentContainer)}>
                    <div className={cx("flex align-items-center justify-content-end", classes.dropdownContainer)}>
                        {props.authOptions?.preventDarkmode === true ? (
                            <></>
                        ) : (
                            <>
                                <i
                                    onClick={() => colorSettingsContext?.setDarkmode(!colorSettingsContext.darkmode,)}
                                    className={cx(`switch-colormode-logos pi ${
                                        colorSettingsContext.darkmode ? "pi-moon" : "pi-sun"
                                    }`, classes.darkModeIcon)}
                                />
                            </>
                        )}

                        {!props.hideLanguageSelection && (
                            <Dropdown
                                className={classes.dropdown}
                                placeholder={intModule.translationResources[activeLang].translation.option_name}
                                onChange={function (event: DropdownChangeEvent) {
                                    intModule.selectActiveLang(event.value.key);
                                }}
                                options={parseLanguageResourcesIntoDropdownFormat(intModule.translationResources,)}
                                optionLabel="label"
                            />
                        )}
                    </div>
                    {isNewPasswordRequired ?
                        <NewPasswordForm
                            passwortRequirementsTextColor={passwortRequirementsTextColor}
                            inputFieldDescriptionTextColor={inputFieldDescriptionTextColor} t={t}
                            submit={submit} loginError={loginError}
                            inputFieldBackgroundColor={inputFieldBackgroundColor}
                            inputFieldTextColor={inputFieldTextColor} setPassword={setPassword}
                            isLoading={isLoading}/> :
                        <LoginForm
                            submit={submit}
                            inputFieldDescriptionTextColor={inputFieldDescriptionTextColor}
                            email={email}
                            setEmail={setEmail}
                            t={t}
                            inputFieldBackgroundColor={inputFieldBackgroundColor}
                            inputFieldTextColor={inputFieldTextColor}
                            password={password}
                            setPassword={setPassword}
                            isLoading={isLoading}
                            loginError={loginError}/>
                    }
                </div>

                <div className={cx("flex", classes.imprintWrapper)}>
          <span className={classes.imprintWrapper}>
            &copy;{" "}
              {props.authOptions?.companyText ? props.authOptions?.companyText : "Company 2025"}
          </span>
                    {!(props.hideImprint === true && props.hidePrivacyPolicy === true) && (
                        <ImprintLoginContainer
                            hideImprint={props.hideImprint}
                            legalLinkColor={legalLinkColor}
                            hidePrivacyPolicy={props.hidePrivacyPolicy}
                            t={t}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

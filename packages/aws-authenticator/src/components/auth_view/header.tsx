import {AuthenticationViewProps} from "@iavofficial/frontend-framework-shared/authenticationViewProps";
import {AppLogoPlaceholder} from "@iavofficial/frontend-framework-shared/appLogoPlaceholder";
import {APPLICATION_LOGO_PLACEHOLDER} from "@iavofficial/frontend-framework-shared/constants";
import {CompanyLogoDefault} from "./companyLogoDefault";
import React from "react";

interface Props extends AuthenticationViewProps {
    headerBackgroundColor: string;
}

export const Header = (props: Props) => (
    <div>
        <div
            className="flex justify-content-between"
            style={{
                backgroundColor: props.headerBackgroundColor,
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
                    : <CompanyLogoDefault
                        hideLanguageSelection={props.hideLanguageSelection}
                        headerOptions={props.headerOptions}
                        authOptions={props.authOptions}
                        hideImprint={props.hideImprint}
                        hidePrivacyPolicy={props.hidePrivacyPolicy}/>
                }
            </div>
        </div>
    </div>
);
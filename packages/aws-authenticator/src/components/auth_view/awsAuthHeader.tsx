import React from "react";
import {AuthenticationViewProps} from "@iavofficial/frontend-framework-shared/authenticationViewProps";
import {AppLogoPlaceholder} from "@iavofficial/frontend-framework-shared/appLogoPlaceholder";
import {APPLICATION_LOGO_PLACEHOLDER} from "@iavofficial/frontend-framework-shared/constants";
import {CompanyLogoDefault} from "./companyLogoDefault";
import makeStyles from "@iavofficial/frontend-framework-shared/makeStyles";

const useStyles = makeStyles(({headerBackgroundColor}: { headerBackgroundColor: string }) => ({
    container: {
        backgroundColor: headerBackgroundColor,
        color: "white",
        alignItems: "center",
        height: "56px",
    },

}));

interface Props extends AuthenticationViewProps {
    headerBackgroundColor: string
}

export const Header = (props: Props) => {

    const {headerBackgroundColor} = props

    const {classes, cx} = useStyles({headerBackgroundColor});

    return (
        <div
            className={cx("flex justify-content-between", classes.container}
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
                        headerOptions={props.headerOptions}
                        hideLanguageSelection={props.hideLanguageSelection}
                        authOptions={props.authOptions}
                        hideImprint={props.hideImprint}
                        hidePrivacyPolicy={props.hidePrivacyPolicy}
                    />}
            </div>
        </div>
    )
};

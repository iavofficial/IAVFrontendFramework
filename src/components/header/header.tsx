import React, {ReactElement, useContext} from "react";
import "./header.css";
import "../css/globalColors.css";
import {ContextMenu} from "primereact/contextmenu";
import UserIcon from "../../assets/svg/icon_user.svg";
import CompanyLogo from "../../assets/svg/company_logo_neutral.svg";
import SettingsIcon from "../../assets/svg/icon_settings.svg";
import {BLUE3, PADDING_GAB, WHITE} from "../../constants";
import {SettingsMenu, SettingsMenuOptions} from "./settingsMenu";
import {UserMenu, UserMenuOptions} from "./userMenu";
import {ColorSettingsContext} from "../../contexts/colorsettings";
import {AppLogoPlaceholder} from "../appLogoPlaceholder";

export interface HeaderOptions {
    reactElementRight?: ReactElement;
    reactElementLeft?: ReactElement;
    hideLeft?: boolean;
    hideRight?: boolean;
    hideUserIcon?: boolean;
    headerElements?: ReactElement[];
}

interface Props {
    headerOptions?: HeaderOptions;
    settingsMenuOptions?: SettingsMenuOptions;
    userMenuOptions?: UserMenuOptions;
}

export const Header = (props: Props) => {
    const menuRef = React.createRef<ContextMenu>();
    const userRef = React.createRef<ContextMenu>();
    const colorSettingsContext = useContext(ColorSettingsContext);

    const headerBackgroundColor =
        colorSettingsContext.currentColors.header.backgroundColor;
    const settingsIconColor =
        colorSettingsContext.currentColors.header.settingsIconColor;
    const userIconColor = colorSettingsContext.currentColors.header.userIconColor;

    const companyLogoDefault = (props: Props) => (
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

    const hideSettingsMenu = (e: React.KeyboardEvent) => {
        if (e.key === "Escape") {
            menuRef.current?.hide(e);
        }
    };

    const hideUserMenu = (e: React.KeyboardEvent) => {
        if (e.key === "Escape") {
            userRef.current?.hide(e);
        }
    };

    return (
        <div
            id="header"
            className={
                (colorSettingsContext?.darkmode ? "bg-grey-5" : "bg-blue-0") +
                " flex justify-content-between align-items-center"
            }
            style={{
                backgroundColor: headerBackgroundColor,
            }}
        >
            <div id="left-element" className="flex default-app-logo-text-style">
                {props.headerOptions?.reactElementLeft ? (
                    props.headerOptions?.reactElementLeft
                ) : (
                    <AppLogoPlaceholder />
                )}
            </div>

            <div
                className="flex justify-content-between align-items-center"
                id="right-element"
            >
                <SettingsMenu
                    ref={menuRef}
                    hideMenu={hideSettingsMenu}
                    menuOptions={props.settingsMenuOptions}
                />
                <UserMenu
                    ref={userRef}
                    hideMenu={hideUserMenu}
                    userMenuOptions={props.userMenuOptions}
                />
                <div
                    id="right-element-user-section"
                    className={"flex align-items-center justify-content-end"}
                >
                    {
                        props.headerOptions?.headerElements?.map(headerElement => {
                            return (
                                <>
                                    {headerElement}
                                </>
                            )
                        })
                    }
                    <a
                        className={"flex align-items-center justify-content-end"}
                        href="#"
                        style={{
                            margin: "0rem 1rem 0rem 1rem",
                            cursor: "pointer",
                        }}
                        onClick={(e) => {
                            if (menuRef.current) {
                                menuRef.current.show(e);
                            }
                        }}
                        onKeyDown={(e) => hideSettingsMenu(e)}
                    >
                        <SettingsIcon fill={settingsIconColor} />
                    </a>
                    <a
                        className={"flex align-items-center justify-content-end"}
                        href="#"
                        style={{
                            margin: "0rem 0rem 0rem 1rem",
                            cursor: "pointer",
                        }}
                        onClick={(e) => {
                            if (userRef.current) {
                                userRef.current.show(e);
                            }
                        }}
                        onKeyDown={(e) => hideUserMenu(e)}
                    >
                        {!props.headerOptions?.hideUserIcon && (
                            <UserIcon fill={userIconColor} />
                        )}
                    </a>
                </div>
                <div
                    id="right-element-companylogo"
                    className="flex justify-content-end align-items-center"
                >
                    {props.headerOptions?.reactElementRight
                        ? props.headerOptions?.reactElementRight
                        : companyLogoDefault(props)}
                </div>
            </div>
        </div>
    );
};



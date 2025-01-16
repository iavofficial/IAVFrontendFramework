/**
 * Copyright © 2024 IAV GmbH Ingenieurgesellschaft Auto und Verkehr, All Rights Reserved.
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

import React, {ReactElement, useContext} from "react";
import "./header.css";
import "../css/globalColors.css";
import {ContextMenu} from "primereact/contextmenu";
import UserIcon from "../../assets/svg/userIcon";
import CompanyLogo from "../../assets/svg/companyLogo";
import SettingsIcon from "../../assets/svg/settingsIcon";
import {BLUE3, PADDING_GAB, WHITE} from "../../constants";
import {SettingsMenu, SettingsMenuOptions} from "./settingsMenu";
import {UserMenu, UserMenuOptions} from "./userMenu";
import {ColorSettingsContext} from "../../contexts/colorsettings";
import {AppLogoPlaceholder} from "../appLogoPlaceholder";
import HeaderIcon from "./headerIcon";

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
          {props.headerOptions?.headerElements?.map((headerElement, index) => {
            return <React.Fragment key={index}>{headerElement}</React.Fragment>;
          })}
          <HeaderIcon
            style={{margin: "0rem 1rem 0rem 1rem"}}
            onClick={(e) => {
              if (menuRef.current) {
                menuRef.current.show(e);
              }
            }}
            onKeyDown={(e) => hideSettingsMenu(e)}
          >
            <SettingsIcon fill={settingsIconColor} />
          </HeaderIcon>
          <HeaderIcon
            style={{margin: "0rem 0rem 0rem 1rem"}}
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
          </HeaderIcon>
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

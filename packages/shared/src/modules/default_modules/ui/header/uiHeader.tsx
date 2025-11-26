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

import React, {useContext, useRef} from "react";
import {UIHeaderProps} from "../../../../types/modules/ui/header/headerModuleInterfaces";
import {
  APPLICATION_LOGO_PLACEHOLDER,
  BLUE3,
  PADDING_GAB,
  WHITE,
} from "../../../../constants/constants";
import {AppLogoPlaceholder} from "../../../../components/appLogoPlaceholder";
import {ColorSettingsContext} from "../../../../contexts/colorSettingsContext";
import {ContextMenu} from "primereact/contextmenu";

import makeStyles from "../../../../utils/styles/makeStyles";
import HeaderIcon from "./icon/headerIcon";
import SettingsIcon from "./icon/settingsIcon";
import UserIcon from "./icon/userIcon";
import {SettingsMenu} from "./components/settingsMenu";
import {UserMenu} from "./components/userMenu";
import {CompanyLogo} from "../../../../components/svgWrapper/companyLogo";

const useStyles = makeStyles(
  ({darkMode, headerBg}: {darkMode: boolean; headerBg: string}) => ({
    root: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      backgroundColor: headerBg,
    },
    left: {
      display: "flex",
    },
    right: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
    userSection: {
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-end",
    },
    icon: {
      margin: "0 1rem 0 1rem",
      cursor: "pointer",
    },
    iconUser: {
      margin: "0 0 0 1rem",
      cursor: "pointer",
    },
    companyLogo: {
      display: "flex",
      justifyContent: "flex-end",
      alignItems: "center",
      paddingRight: `${PADDING_GAB}px`,
    },
  }),
);

export const UIHeader: React.FC<UIHeaderProps> = (props) => {
  const menuRef = useRef<ContextMenu | null>(null);
  const userRef = useRef<ContextMenu | null>(null);
  const colorSettingsContext = useContext(ColorSettingsContext);

  const headerBackgroundColor =
    colorSettingsContext?.currentColors?.header?.backgroundColor ??
    "transparent";
  const settingsIconColor =
    colorSettingsContext?.currentColors?.header?.settingsIconColor ??
    (colorSettingsContext?.darkmode ? WHITE : BLUE3);
  const userIconColor =
    colorSettingsContext?.currentColors?.header?.userIconColor ??
    (colorSettingsContext?.darkmode ? WHITE : BLUE3);

  const {classes} = useStyles({
    darkMode: !!colorSettingsContext?.darkmode,
    headerBg: headerBackgroundColor,
  });

  const companyLogoDefault = () => (
    <div
      className={classes.companyLogo}
      style={{display: props.headerOptions?.hideRight ? "none" : "flex"}}
    >
      <CompanyLogo
        dataTestId={"company-logo"}
        fill={colorSettingsContext?.darkmode ? BLUE3 : WHITE}
      />
    </div>
  );

  const hideSettingsMenu = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") menuRef.current?.hide(e as any);
  };

  const hideUserMenu = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") userRef.current?.hide(e as any);
  };

  return (
    <div id="header" className={classes.root}>
      <div
        id="left-element"
        className={`${classes.left} default-app-logo-text-style`}
      >
        {props.headerOptions?.reactElementLeft ? (
          props.headerOptions.reactElementLeft
        ) : (
          <AppLogoPlaceholder
            dataTestId={"app-logo-placeholder"}
            appLogoPlaceholder={APPLICATION_LOGO_PLACEHOLDER}
          />
        )}
      </div>

      <div className={classes.right} id="right-element">
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

        <div id="right-element-user-section" className={classes.userSection}>
          {props.headerOptions?.headerElements?.map((el, i) => (
            <React.Fragment key={i}>{el}</React.Fragment>
          ))}

          <HeaderIcon
            dataTestId="header-settings-icon"
            className={classes.icon}
            onClick={(e: any) => menuRef.current?.show(e)}
            onKeyDown={hideSettingsMenu}
          >
            <SettingsIcon fill={settingsIconColor} />
          </HeaderIcon>

          <HeaderIcon
            dataTestId="header-user-icon"
            className={classes.iconUser}
            onClick={(e: any) => userRef.current?.show(e)}
            onKeyDown={hideUserMenu}
          >
            {!props.headerOptions?.hideUserIcon &&
              (props.headerOptions?.userIcon ? (
                <div
                  style={{
                    width: 31.666,
                    height: 31.666,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {props.headerOptions.userIcon}
                </div>
              ) : (
                <UserIcon fill={userIconColor} />
              ))}
          </HeaderIcon>
        </div>

        <div id="right-element-companylogo" className={classes.companyLogo}>
          {props.headerOptions?.reactElementRight
            ? props.headerOptions.reactElementRight
            : companyLogoDefault()}
        </div>
      </div>
    </div>
  );
};

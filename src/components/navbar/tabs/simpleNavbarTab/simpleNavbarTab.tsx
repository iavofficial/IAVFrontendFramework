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

import React, {ReactElement, useContext, useMemo, useState} from "react";
import {Link, useLocation} from "react-router-dom";
import {useTranslator} from "../../../internationalization/translators";
import "../tabs.css";
import {GroupableNavbarTab, NavbarTabProps} from "../typesNavbarTab";
import {ColorSettingsContext} from "../../../../contexts/colorsettings";
import {SimpleNavbarTabCollapsed} from "./simpleNavbarTabCollapsed";
import {SimpleNavbarTabUnfolded} from "./simpleNavbarTabUnfolded";
import {
  determineCurrentColor,
  determineCurrentColorInsideGroup,
} from "../../../../utils/determineCurrentColor";
import {
  DEFAULT_ELEMENTSIZE,
  GAB_NAVBAR_UNFOLDED,
  NAVBAR_WIDTH_UNFOLDED,
} from "../../../../constants";
import {InjectedOptionsGroupableByWrapperToTab} from "../../types/typesInjectedOptions";

export interface NestedNavbarTabProps {
  additionalClassNames: string;
  setHovering: (state: boolean) => void;
  style: object;
  iconColor: string;
  name: string;
  icon?: ReactElement;
}

export const SimpleNavbarTab: GroupableNavbarTab = (
  props: NavbarTabProps<InjectedOptionsGroupableByWrapperToTab> & {},
) => {
  const navbarCollapsed = props.frameworkInjectedOptions.navbarCollapsed;
  const path = props.frameworkInjectedOptions.path;
  const insideActiveGroup = props.frameworkInjectedOptions.groupActive;

  const [hovering, setHovering] = useState(false);
  const colorSettingsContext = useContext(ColorSettingsContext);
  const t = useTranslator();

  const regex = useMemo(() => {
    let regexString = path;
    // Escape slashes
    regexString = regexString.replaceAll("/", "\\/");
    // Add start (^) and boundary condition with trailing /.*
    regexString = `^${regexString}(\\/.*)?$`;
    return new RegExp(regexString);
  }, [path]);

  const active = regex.test(useLocation().pathname);

  const tabBackgroundDefaultColor =
    colorSettingsContext.currentColors.navbar.content.default
      .tabBackgroundDefaultColor;
  const tabBackgroundHoverColor =
    colorSettingsContext.currentColors.navbar.content.hover
      .tabBackgroundHoverColor;
  const tabBackgroundActiveColor =
    colorSettingsContext.currentColors.navbar.content.active
      .tabBackgroundActiveColor;
  const insideActiveGroupColor =
    colorSettingsContext.currentColors.navbar.content.insideActiveGroupColor;

  const fontDefaultColor =
    colorSettingsContext.currentColors.navbar.content.default
      .tabFontDefaultColor;
  const fontHoverColor =
    colorSettingsContext.currentColors.navbar.content.hover.tabFontHoverColor;
  const fontActiveColor =
    colorSettingsContext.currentColors.navbar.content.active.tabFontActiveColor;

  const iconDefaultColor =
    colorSettingsContext.currentColors.navbar.content.default
      .tabIconDefaultColor;
  const iconHoverColor =
    colorSettingsContext.currentColors.navbar.content.hover.tabIconHoverColor;
  const iconActiveColor =
    colorSettingsContext.currentColors.navbar.content.active.tabIconActiveColor;

  const tabState = {
    isActive: active,
    isHovering: hovering,
    isDisabled: props.disabled,
    isInsideActiveGroup: insideActiveGroup,
  };

  const backgroundColor = determineCurrentColorInsideGroup(tabState, {
    activeColor: tabBackgroundActiveColor,
    hoverColor: tabBackgroundHoverColor,
    defaultColor: tabBackgroundDefaultColor,
    insideActiveGroupColor: insideActiveGroupColor,
  });

  const fontColor = determineCurrentColor(tabState, {
    activeColor: fontActiveColor,
    hoverColor: fontHoverColor,
    defaultColor: fontDefaultColor,
  });

  const iconColor = determineCurrentColor(tabState, {
    defaultColor: iconDefaultColor,
    hoverColor: iconHoverColor,
    activeColor: iconActiveColor,
  });

  const tabStyleDefault = {
    width: navbarCollapsed
      ? `${DEFAULT_ELEMENTSIZE}px`
      : `${NAVBAR_WIDTH_UNFOLDED - 2 * GAB_NAVBAR_UNFOLDED}px`,
    cursor: active || props.disabled ? "default" : "pointer",
    backgroundColor: backgroundColor,
    color: fontColor,
    opacity: props.disabled ? 0.5 : 1,
  };

  const additionalClassNames = !insideActiveGroup ? "navbar-tab-space" : "";

  const nestedProps = {
    style: tabStyleDefault,
    setHovering: setHovering,
    icon: props.icon,
    name: props.name instanceof Function ? props.name(t) : props.name,
    additionalClassNames: additionalClassNames,
    iconColor: iconColor,
  };

  const navbarTab = navbarCollapsed ? (
    <SimpleNavbarTabCollapsed {...nestedProps} />
  ) : (
    <SimpleNavbarTabUnfolded {...nestedProps} />
  );

  const styleHidden = props.hidden ? {display: "none"} : {};

  return (
    <div style={styleHidden}>
      {props.disabled ? (
        <>{navbarTab}</>
      ) : (
        <Link
          style={{
            textDecoration: "none",
          }}
          to={path}
        >
          {navbarTab}
        </Link>
      )}
    </div>
  );
};

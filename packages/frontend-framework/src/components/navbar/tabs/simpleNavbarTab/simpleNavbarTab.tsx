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

import React, {ReactElement, useContext, useMemo, useState} from "react";
import "../tabs.css";
import {GroupableNavbarTab, NavbarTabProps} from "../typesNavbarTab";
import {SimpleNavbarTabCollapsed} from "./simpleNavbarTabCollapsed";
import {SimpleNavbarTabUnfolded} from "./simpleNavbarTabUnfolded";
import {
  determineCurrentColor,
  determineCurrentColorInsideGroup,
} from "../../../../utils/determineCurrentColor";
import {InjectedOptionsGroupableByWrapperToTab} from "../../types/typesInjectedOptions";
import {
  DEFAULT_ELEMENT_SIZE,
  GAB_NAVBAR_UNFOLDED,
  NAVBAR_WIDTH_UNFOLDED,
} from "@iavofficial/frontend-framework-shared/constants";
import {ColorSettingsContext} from "@iavofficial/frontend-framework-shared/colorSettingsContext";
import {useModule} from "@iavofficial/frontend-framework-shared/moduleContext";
import {MandatoryModuleNames} from "@iavofficial/frontend-framework-shared/moduleNames";
import {useModuleTranslation} from "@iavofficial/frontend-framework-shared/useModuleTranslation";

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
  const routerModule = useModule(MandatoryModuleNames.Router);

  const navbarCollapsed = props.frameworkInjectedOptions.navbarCollapsed;
  const path = props.frameworkInjectedOptions.path;
  const insideActiveGroup = props.frameworkInjectedOptions.groupActive;

  const [hovering, setHovering] = useState(false);
  const colorSettingsContext = useContext(ColorSettingsContext);
  const t = useModuleTranslation();

  const {isActive} = routerModule.useIsTabActive(path);

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
    isActive: isActive,
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
      ? `${DEFAULT_ELEMENT_SIZE}px`
      : `${NAVBAR_WIDTH_UNFOLDED - 2 * GAB_NAVBAR_UNFOLDED}px`,
    cursor: isActive || props.disabled ? "default" : "pointer",
    backgroundColor: backgroundColor,
    color: fontColor,
    opacity: props.disabled ? 0.5 : 1,
  };

  const additionalClassNames = !insideActiveGroup ? "navbar-tab-space" : "";

  const nestedProps = {
    style: tabStyleDefault,
    setHovering: setHovering,
    icon: props.icon,
    name:
      props.name instanceof Function
        ? props.name(t)
        : props.name,
    additionalClassNames: additionalClassNames,
    iconColor: iconColor,
  };

  const navbarTab = navbarCollapsed ? (
    <SimpleNavbarTabCollapsed {...nestedProps} />
  ) : (
    <SimpleNavbarTabUnfolded {...nestedProps} />
  );

  const styleHidden = props.hidden ? {display: "none"} : {};

  const Link = routerModule.Link;

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

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

import React, {ReactElement, useContext, useEffect, useState} from "react";
import "../../navbar.css";
import {useTranslator} from "../../../internationalization/translators";
import {ColorSettingsContext} from "../../../../contexts/colorsettings";
import {TranslateFunctionType} from "../../../../types/translationFunction";
import {TabGroupCollapsed} from "./tabGroupCollapsed";
import {TabGroupUnfolded} from "./tabGroupUnfolded";
import {GroupableTabAndContentWrapper} from "../../wrappers/typesWrappers";
import {InjectedOptionsByGroupToWrapper} from "../../types/typesInjectedOptions";
import {
  determineCurrentColor,
  determineCurrentColorInsideGroup,
} from "../../../../utils/determineCurrentColor";
import {
  DEFAULT_ELEMENTSIZE,
  NAVBAR_WIDTH_UNFOLDED,
} from "../../../../constants";

interface Props {
  name: string | ((t: TranslateFunctionType) => string);
  navbarCollapsed: boolean;
  wrappers: GroupableTabAndContentWrapper[];
  frameworkInjectedOptions: InjectedOptionsByGroupToWrapper;
  logo?: ReactElement;
  collapsible?: boolean;
}

export const TabGroup = (props: Props) => {
  const t = useTranslator();
  const colorSettingsContext = useContext(ColorSettingsContext);
  const [hovering, setHovering] = useState(false);
  const [groupTabCollapsed, setGroupTabCollapsed] = useState(true);

  const insideActiveGroup = props.frameworkInjectedOptions.groupActive;

  const insideActiveGroupColor =
    colorSettingsContext.currentColors.navbar.content.insideActiveGroupColor;

  const groupBackgroundDefaultColor =
    colorSettingsContext.currentColors.navbar.content.default
      .groupBackgroundDefaultColor;
  const groupBackgroundHoverColor =
    colorSettingsContext.currentColors.navbar.content.hover
      .groupBackgroundHoverColor;
  const groupBackgroundActiveColor =
    colorSettingsContext.currentColors.navbar.content.active
      .groupBackgroundActiveColor;

  const groupIconDefaultColor =
    colorSettingsContext.currentColors.navbar.content.default
      .groupIconDefaultColor;
  const groupIconHoverColor =
    colorSettingsContext.currentColors.navbar.content.hover.groupIconHoverColor;
  const groupIconActiveColor =
    colorSettingsContext.currentColors.navbar.content.active
      .groupIconActiveColor;

  const groupArrowDefaultColor =
    colorSettingsContext.currentColors.navbar.content.default
      .groupArrowDefaultColor;
  const groupArrowHoverColor =
    colorSettingsContext.currentColors.navbar.content.hover
      .groupArrowHoverColor;
  const groupArrowActiveColor =
    colorSettingsContext.currentColors.navbar.content.active
      .groupArrowActiveColor;

  const groupFontDefaultColor =
    colorSettingsContext.currentColors.navbar.content.default
      .groupFontDefaultColor;
  const groupFontHoverColor =
    colorSettingsContext.currentColors.navbar.content.hover.groupFontHoverColor;
  const groupFontActiveColor =
    colorSettingsContext.currentColors.navbar.content.active
      .groupFontActiveColor;

  const groupState = {
    isActive: !groupTabCollapsed,
    isHovering: hovering,
    isDisabled: false,
    isInsideActiveGroup: insideActiveGroup,
  };

  const backgroundColor = determineCurrentColorInsideGroup(groupState, {
    defaultColor: groupBackgroundDefaultColor,
    hoverColor: groupBackgroundHoverColor,
    activeColor: groupBackgroundActiveColor,
    insideActiveGroupColor: insideActiveGroupColor,
  });

  const iconColor = determineCurrentColor(groupState, {
    defaultColor: groupIconDefaultColor,
    hoverColor: groupIconHoverColor,
    activeColor: groupIconActiveColor,
  });

  const arrowColor = determineCurrentColor(groupState, {
    defaultColor: groupArrowDefaultColor,
    hoverColor: groupArrowHoverColor,
    activeColor: groupArrowActiveColor,
  });

  const fontColor = determineCurrentColor(groupState, {
    defaultColor: groupFontDefaultColor,
    hoverColor: groupFontHoverColor,
    activeColor: groupFontActiveColor,
  });

  const collapsible =
    props.collapsible !== undefined ? props.collapsible : true;

  useEffect(() => {
    if (!collapsible) {
      setGroupTabCollapsed(false);
    }
  }, [collapsible]);

  const tabStyleDefault = {
    width: props.navbarCollapsed
      ? `${DEFAULT_ELEMENTSIZE}px`
      : `${NAVBAR_WIDTH_UNFOLDED - 8}px`,
    backgroundColor: backgroundColor,
    color: fontColor,
  };

  let className = "default-nav-element-wrapper flex align-items-center";

  if (!insideActiveGroup) {
    className += " navbar-tab-space";
  }

  const tabComponentProperties = {
    name: props.name instanceof Function ? props.name(t) : props.name,
    hovering: hovering,
    logo: props.logo,
    groupTabCollapsed: groupTabCollapsed,
    colors: {
      iconColor,
      arrowColor,
    },
  };

  const groupElement = props.navbarCollapsed ? (
    <TabGroupCollapsed {...tabComponentProperties} />
  ) : (
    <TabGroupUnfolded {...tabComponentProperties} />
  );

  return (
    <>
      <div
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
        className={className}
        style={tabStyleDefault}
        onClick={() => {
          if (props.collapsible) {
            setGroupTabCollapsed(
              (prevGroupTabCollapsed: boolean) => !prevGroupTabCollapsed,
            );
          }
        }}
      >
        {groupElement}
      </div>
      {!groupTabCollapsed ? (
        props.wrappers.map((wrapper) =>
          wrapper.getNavbarComponent({
            groupActive: !groupTabCollapsed,
            navbarCollapsed: props.frameworkInjectedOptions.navbarCollapsed,
          }),
        )
      ) : (
        <React.Fragment />
      )}
    </>
  );
};

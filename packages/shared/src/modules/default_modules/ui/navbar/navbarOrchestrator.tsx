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

import React, {useContext} from "react";
import {UINavbar} from "./uiNavbar";
import {
  NavbarOptions,
  UINavbarProps,
} from "../../../../types/modules/ui/navbar/navbarModuleInterfaces";
import {useModuleTranslation} from "../../../hooks/useModuleTranslation";
import {ColorSettingsContext} from "../../../../contexts/colorSettingsContext";
import {
  DEFAULT_ELEMENT_SIZE,
  GAB_NAVBAR_COLLAPSED,
  NAVBAR_WIDTH_UNFOLDED,
  PADDING_GAB,
} from "../../../../constants/constants";
import {useModule} from "../../../../contexts/moduleContext";
import {MandatoryModuleNames} from "../../../../constants/moduleNames";
import {calculateNavbarArrowFunctionColor} from "../../../../utils/ui/navbar/calculateNavbarArrowFunctionColor";
import {
  useDefaultDispatch,
  useDefaultSelector,
} from "../../../module_orchestration/moduleDefaults";

type TabAndContentWrapperLike = {
  getNavbarComponent: (args: {navbarCollapsed: boolean}) => React.ReactElement;
};

type LegalDocLike = {
  path: string;
  titleTranslationKey: string;
  isHidden?: boolean;
};

export type NavbarOrchestratorProps = {
  tabAndContentWrappers: TabAndContentWrapperLike[];
  legalDocuments?: LegalDocLike[];
  navbarOptions?: NavbarOptions;
  uiComponent?: React.ComponentType<UINavbarProps>;
};

export const NavbarOrchestrator = (props: NavbarOrchestratorProps) => {
  const {tabAndContentWrappers, legalDocuments, navbarOptions, uiComponent} =
    props;

  const t = useModuleTranslation();
  const routerModule = useModule(MandatoryModuleNames.Router);
  const Link = routerModule.Link;

  const colorSettingsContext = useContext(ColorSettingsContext);

  const collapsed = useDefaultSelector(
    (s) => s[MandatoryModuleNames.UI].navbarCollapsed,
  );
  const collapsible = useDefaultSelector(
    (s) => s[MandatoryModuleNames.UI].collapsible,
  );

  const dispatch = useDefaultDispatch();
  const uiModule = useModule(MandatoryModuleNames.UI);
  const onToggleCollapse = () =>
    dispatch(uiModule.slice.actions.toggleNavbar(undefined));

  const breakAfterIndex =
    navbarOptions?.breakAfterIndex !== undefined &&
    Number.isFinite(navbarOptions.breakAfterIndex)
      ? Math.floor(navbarOptions.breakAfterIndex)
      : undefined;

  const bottomItemsStartIndex =
    breakAfterIndex === undefined
      ? tabAndContentWrappers.length
      : Math.min(
          Math.max(breakAfterIndex + 1, 0),
          tabAndContentWrappers.length,
        );

  const createNavbarItem = (w: TabAndContentWrapperLike) =>
    w.getNavbarComponent({navbarCollapsed: collapsed});

  const items = tabAndContentWrappers
    .slice(0, bottomItemsStartIndex)
    .map(createNavbarItem);
  const bottomItems = tabAndContentWrappers
    .slice(bottomItemsStartIndex)
    .map(createNavbarItem);

  const legalLinks =
    legalDocuments
      ?.filter((d) => !d.isHidden)
      .map((d) => (
        <Link
          key={d.path}
          className="legal-doc-link"
          style={{
            color:
              colorSettingsContext.currentColors.navbar.legalDocumentsLinkColor,
          }}
          to={d.path}
        >
          {t({key: d.titleTranslationKey})}
        </Link>
      )) ?? [];

  const dims = {
    collapsedWidth: DEFAULT_ELEMENT_SIZE + 2 * GAB_NAVBAR_COLLAPSED,
    unfoldedWidth: NAVBAR_WIDTH_UNFOLDED,
    paddingCollapsed: 2,
    paddingUnfolded: 4,
    paddingGab: PADDING_GAB,
  };

  const colors = {
    navbarBg: colorSettingsContext.currentColors.navbar.backgroundColor,
    legalLink:
      colorSettingsContext.currentColors.navbar.legalDocumentsLinkColor,
    collapseArrow:
      colorSettingsContext.currentColors.navbar.navbarCollapseArrowColor,
    scrollbar: colorSettingsContext.currentColors.navbar.scrollbarColor,
  };

  const arrowClassName = calculateNavbarArrowFunctionColor(collapsed);
  const UI = uiComponent ?? UINavbar;

  const uiProps: UINavbarProps = {
    items,
    bottomItems,
    legalLinks,
    collapsed,
    collapsible,
    onToggleCollapse,
    colors,
    dims,
    arrowClassName,
  };

  return <UI {...uiProps} />;
};

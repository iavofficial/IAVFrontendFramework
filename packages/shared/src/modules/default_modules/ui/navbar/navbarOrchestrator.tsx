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
import {UINavbarProps} from "../../../../types/modules/ui/navbar/navbarModuleInterfaces";
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
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {
  UIExtras,
  UIModuleType as IUIModule,
  UIStoreState,
} from "../../../../types/modules/ui/uiModuleInterfaces";

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
  uiComponent?: React.ComponentType<UINavbarProps>;
};

export const NavbarOrchestrator = (props: NavbarOrchestratorProps) => {
  const {tabAndContentWrappers, legalDocuments, uiComponent} = props;

  const t = useModuleTranslation();
  const routerModule = useModule(MandatoryModuleNames.Router);
  const Link = routerModule.Link;

  const colorSettingsContext = useContext(ColorSettingsContext);

  const useTypedSelector: TypedUseSelectorHook<UIStoreState> = useSelector;
  const collapsed = useTypedSelector(
    (s) => s[MandatoryModuleNames.UI].navbarCollapsed,
  );
  const collapsible = useTypedSelector(
    (s) => s[MandatoryModuleNames.UI].collapsible,
  );

  const dispatch = useDispatch();
  const uiModule = useModule(MandatoryModuleNames.UI) as IUIModule & {
    extras: UIExtras;
  };

  const items = tabAndContentWrappers.map((w) =>
    w.getNavbarComponent({navbarCollapsed: collapsed}),
  );

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

  const onToggleCollapse = () => dispatch(uiModule.extras.toggleNavbar());

  const uiProps: UINavbarProps = {
    items,
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

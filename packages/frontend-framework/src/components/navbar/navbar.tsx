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
import "./navbar.css";
import {TabAndContentWrapper} from "@iavofficial/frontend-framework-shared/typesWrappers";
import SimpleBar from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";
import {calculateNavbarArrowFunctionColor} from "../../utils/calculateNavbarArrowColor";
import {
  DEFAULT_ELEMENT_SIZE,
  GAB_NAVBAR_COLLAPSED,
  NAVBAR_WIDTH_UNFOLDED,
  PADDING_GAB,
} from "@iavofficial/frontend-framework-shared/constants";
import {ColorSettingsContext} from "@iavofficial/frontend-framework-shared/colorSettingsContext";
import {useModule} from "@iavofficial/frontend-framework-shared/moduleContext";
import {MandatoryModuleNames} from "@iavofficial/frontend-framework-shared/moduleNames";
import {useModuleTranslation} from "@iavofficial/frontend-framework-shared/useModuleTranslation";
import {LegalDocument} from "../imprint/legalDocument";
import { useDefaultDispatch, useDefaultSelector } from "@iavofficial/frontend-framework-shared/moduleDefaults";

interface Props {
  tabAndContentWrappers: TabAndContentWrapper[];
  legalDocuments?: LegalDocument[];
}

export const Navbar = (props: Props) => {
  const t = useModuleTranslation();

  const dispatch = useDefaultDispatch();

  const routerModule = useModule(MandatoryModuleNames.Router);
  const Link = routerModule.Link;

  const uiModule = useModule(MandatoryModuleNames.UI);
  const navbarCollapsed = useDefaultSelector(state => state.ui.navbarCollapsed);
  const collapsible = useDefaultSelector(state => state.ui.collapsible);
  const setNavbarCollapsed = 
  (navbarCollapsed: boolean) => dispatch(uiModule.slice.actions.setNavbarCollapsed(navbarCollapsed));

  const colorSettingsContext = useContext(ColorSettingsContext);

  const navbarColor = colorSettingsContext.currentColors.navbar.backgroundColor;

  const legalDocumentsColor =
    colorSettingsContext.currentColors.navbar.legalDocumentsLinkColor;

  const navbarCollapseArrowColor =
    colorSettingsContext.currentColors.navbar.navbarCollapseArrowColor;

  const scrollbarColor =
    colorSettingsContext.currentColors.navbar.scrollbarColor;

  const isAtLeastOneDocumentVisible = props.legalDocuments?.some(
    (document) => !document.isHidden,
  );

  return (
    <div className="h-full" style={{backgroundColor: navbarColor}}>
      <div id="navbar" className="h-full">
        <SimpleBar
          style={{
            height: "inherit",
            width: navbarCollapsed
              ? `${DEFAULT_ELEMENT_SIZE + 2 * GAB_NAVBAR_COLLAPSED}px`
              : `${NAVBAR_WIDTH_UNFOLDED}px`,
            padding: navbarCollapsed
              ? "0px 2px 0px 2px"
              : "0px 4px 0px 4px",
            color: scrollbarColor,
            position: "relative",
            overflowX: "visible",
            marginBottom: "30px",
            flex: "0 1 auto",
          }}
          className="custom-scrollbar"
        >
          <>
            {props.tabAndContentWrappers.map((wrapper: TabAndContentWrapper) =>
              wrapper.getNavbarComponent({
                navbarCollapsed: navbarCollapsed,
              }),
            )}
          </>
        </SimpleBar>
        <div
          id="navbar-bottom-wrapper"
          className={"text-center flex "}
          style={
            navbarCollapsed
              ? {
                  flexDirection: "column",
                  width: "44px",
                  gap: "10px",
                }
              : {}
          }
        >
          {isAtLeastOneDocumentVisible && (
            <div
              id="legal-doc-links"
              style={{
                flexDirection: navbarCollapsed
                  ? "unset"
                  : "row",
                writingMode: navbarCollapsed
                  ? "sideways-lr"
                  : "horizontal-tb",
                paddingLeft: navbarCollapsed
                  ? "0px"
                  : "12px",
              }}
            >
              {props.legalDocuments
                ?.filter((document) => !document.isHidden)
                .map((document) => (
                  <Link
                    key={document.path}
                    className="legal-doc-link"
                    style={{color: legalDocumentsColor}}
                    to={document.path}
                    target="_blank"
                  >
                    {t({key: document.titleTranslationKey})}
                  </Link>
                ))}
            </div>
          )}

          {collapsible && (
            <i
              onClick={() =>
                setNavbarCollapsed(
                  !navbarCollapsed,
                )
              }
              style={{
                ...(!navbarCollapsed && {
                  position: "absolute",
                  right: 0,
                }),
                cursor: "pointer",
                color: navbarCollapseArrowColor,
                margin: navbarCollapsed
                  ? "8px 0px 0px 0px"
                  : `0px ${PADDING_GAB}px 0px 0px`,
              }}
              className={calculateNavbarArrowFunctionColor(
                navbarCollapsed!,
              )}
            />
          )}
        </div>
      </div>
    </div>
  );
};

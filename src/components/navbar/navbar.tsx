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

import React, {useContext} from "react";
import {Link} from "react-router-dom";
import "./navbar.css";
import "../css/globalColors.css";
import {TabAndContentWrapper} from "./wrappers/typesWrappers";
import {useTranslator} from "../internationalization/translators";
import {Tooltip} from "primereact/tooltip";
import SimpleBar from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";
import {ColorSettingsContext} from "../../contexts/colorsettings";
import {calculateNavbarArrowFunctionColor} from "../../utils/calculateNavbarArrowColor";
import {generateHashOfLength} from "../../utils/hash";
import {NavbarSettingsContext} from "../../contexts/navbarContext";
import {
  DEFAULT_ELEMENTSIZE,
  GAB_NAVBAR_COLLAPSED,
  NAVBAR_WIDTH_UNFOLDED,
  PADDING_GAB,
} from "../../constants";

interface Props {
  tabAndContentWrappers: TabAndContentWrapper[];
  documentsLabelKey?: string;
  hideLegalDocuments?: boolean;
}

export const Navbar = (props: Props) => {
  const t = useTranslator();
  const colorSettingsContext = useContext(ColorSettingsContext);
  const navbarSettingsContext = useContext(NavbarSettingsContext);

  const navbarColor = colorSettingsContext.currentColors.navbar.backgroundColor;

  const legalDocumentsColor =
    colorSettingsContext.currentColors.navbar.legalDocumentsIconColor;

  const navbarCollapseArrowColor =
    colorSettingsContext.currentColors.navbar.navbarCollapseArrowColor;

  const scrollbarColor =
    colorSettingsContext.currentColors.navbar.scrollbarColor;

  const identifier = generateHashOfLength(4);
  const identifierLegal = "a" + identifier;
  const identifierWithDot = "." + identifierLegal;

  return (
    <div className="h-full" style={{backgroundColor: navbarColor}}>
      <div id="navbar" className="h-full">
        <SimpleBar
          style={{
            width: navbarSettingsContext.navbarCollapsed
              ? `${DEFAULT_ELEMENTSIZE + 2 * GAB_NAVBAR_COLLAPSED}px`
              : `${NAVBAR_WIDTH_UNFOLDED}px`,
            padding: navbarSettingsContext.navbarCollapsed
              ? "0px 2px 0px 2px"
              : "0px 4px 0px 4px",
            color: scrollbarColor,
            position: "relative",
            overflowX: "visible",
            marginBottom: "30px",
            flex: "0 1 auto",
            overflow: "clip",
          }}
        >
          <>
            {props.tabAndContentWrappers.map((wrapper: TabAndContentWrapper) =>
              wrapper.getNavbarComponent({
                navbarCollapsed: navbarSettingsContext.navbarCollapsed,
              }),
            )}
          </>
        </SimpleBar>
        <div
          id="navbar-bottom-wrapper"
          className={"text-center flex "}
          style={
            navbarSettingsContext.navbarCollapsed
              ? {
                  justifyContent: "center",
                  flexDirection: "column",
                }
              : {
                  justifyContent: "space-between",

                  paddingLeft: `${PADDING_GAB}px`,
                }
          }
        >
          {!props.hideLegalDocuments && (
            <Link
              style={{
                fontSize: "13px",
                fontWeight: "bolder",
                textDecoration: "none",
              }}
              to="/documents"
            >
              <i
                style={{
                  color: legalDocumentsColor,
                  fontWeight: "bold",
                }}
                className={"pi pi-info-circle " + identifierLegal}
              />
            </Link>
          )}

          <Tooltip
            content={t(
              props.documentsLabelKey ? props.documentsLabelKey : "Imprint",
            )}
            target={identifierWithDot}
            id="hover-image"
          />

          {navbarSettingsContext.collapsible && (
            <i
              onClick={() =>
                navbarSettingsContext.setNavbarCollapsed(
                  !navbarSettingsContext.navbarCollapsed,
                )
              }
              style={{
                cursor: "pointer",
                color: navbarCollapseArrowColor,

                margin: navbarSettingsContext.navbarCollapsed
                  ? " 8px 0px 0px 0px"
                  : ` 0px ${PADDING_GAB}px 0px 0px`,
              }}
              className={calculateNavbarArrowFunctionColor(
                navbarSettingsContext.navbarCollapsed!,
              )}
            />
          )}
        </div>
      </div>
    </div>
  );
};

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

import React from "react";
import SimpleBar from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";
import "./navbar.css";
import {UINavbarProps} from "../../../../types/modules/ui/navbar/navbarModuleInterfaces";

export const UINavbar: React.FC<UINavbarProps> = (props) => {
  const hasBottomItems = !!props.bottomItems?.length;
  const width = props.collapsed
    ? `${props.dims.collapsedWidth}px`
    : `${props.dims.unfoldedWidth}px`;
  const padding = props.collapsed
    ? `0px ${props.dims.paddingCollapsed}px`
    : `0px ${props.dims.paddingUnfolded}px`;

  return (
    <div
      className="h-full"
      style={{backgroundColor: props.colors.navbarBg}}
      data-testid="navbar-root"
    >
      <div id="navbar" className="h-full" data-testid="navbar-container">
        <SimpleBar
          className="custom-scrollbar"
          style={{
            height: "inherit",
            width,
            padding,
            color: props.colors.scrollbar,
            position: "relative",
            overflowX: "visible",
            marginBottom: "30px",
            flex: "0 1 auto",
          }}
        >
          {props.items.map((el, i) => (
            <React.Fragment key={i}>{el}</React.Fragment>
          ))}
        </SimpleBar>

        <div
          id="navbar-bottom-wrapper"
          className="text-center flex"
          style={
            props.collapsed
              ? {flexDirection: "column", width: "44px", gap: "10px"}
              : {flexDirection: "column", width}
          }
          data-testid="navbar-bottom-wrapper"
        >
          {hasBottomItems && (
            <div id="navbar-bottom-items" data-testid="navbar-bottom-items">
              {props.bottomItems?.map((el, i) => (
                <React.Fragment key={i}>{el}</React.Fragment>
              ))}
            </div>
          )}

          <div
            id="navbar-bottom-actions"
            style={{
              flexDirection: props.collapsed ? "column" : "row",
              gap: props.collapsed ? "10px" : "0px",
              justifyContent: props.collapsed
                ? "center"
                : props.legalLinks?.length
                  ? "space-between"
                  : "flex-end",
            }}
            data-testid="navbar-bottom-actions"
          >
            {!!props.legalLinks?.length && (
              <div
                id="legal-doc-links"
                style={{
                  flexDirection: props.collapsed ? "unset" : "row",
                  writingMode: props.collapsed
                    ? "sideways-lr"
                    : "horizontal-tb",
                  paddingLeft: props.collapsed
                    ? "0px"
                    : `${props.dims.collapsedWidth - 4}px`,
                  flex: props.collapsed ? "0 1 auto" : undefined,
                }}
                data-testid="navbar-legal-links"
              >
                {props.legalLinks}
              </div>
            )}

            {props.collapsible && (
              <i
                onClick={props.onToggleCollapse}
                style={{
                  cursor: "pointer",
                  color: props.colors.collapseArrow,
                  margin: props.collapsed
                    ? "8px 0px 0px 0px"
                    : `0px ${props.dims.paddingGab}px 0px 0px`,
                }}
                className={props.arrowClassName}
                data-testid="navbar-collapse-toggle"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

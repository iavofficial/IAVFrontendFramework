/**
 * Copyright © 2025 IAV GmbH Ingenieurgesellschaft Auto und Verkehr, All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import SimpleBar from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";
import "./navbar.css";
import {UINavbarProps} from "../../../../types/modules/ui/navbar/navbarModuleInterfaces";

export const UINavbar: React.FC<UINavbarProps> = (props) => {
  const width = props.collapsed
    ? `${props.dims.collapsedWidth}px`
    : `${props.dims.unfoldedWidth}px`;
  const padding = props.collapsed
    ? `0px ${props.dims.paddingCollapsed}px`
    : `0px ${props.dims.paddingUnfolded}px`;

  return (
    <div className="h-full" style={{backgroundColor: props.colors.navbarBg}}>
      <div id="navbar" className="h-full">
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
              : {}
          }
        >
          {!!props.legalLinks?.length && (
            <div
              id="legal-doc-links"
              style={{
                flexDirection: props.collapsed ? "unset" : "row",
                writingMode: props.collapsed ? "sideways-lr" : "horizontal-tb",
                paddingLeft: props.collapsed ? "0px" : "12px",
              }}
            >
              {props.legalLinks}
            </div>
          )}

          {props.collapsible && (
            <i
              onClick={props.onToggleCollapse}
              style={{
                ...(props.collapsed ? {} : {position: "absolute", right: 0}),
                cursor: "pointer",
                color: props.colors.collapseArrow,
                margin: props.collapsed
                  ? "8px 0px 0px 0px"
                  : `0px ${props.dims.paddingGab}px 0px 0px`,
              }}
              className={props.arrowClassName}
            />
          )}
        </div>
      </div>
    </div>
  );
};

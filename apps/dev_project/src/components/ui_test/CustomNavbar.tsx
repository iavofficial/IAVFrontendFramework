/**
 * Copyright ...
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { UINavbarProps } from "@iavofficial/frontend-framework-shared/navbarModuleInterfaces";

const CustomNavbar: React.FC<UINavbarProps> = ({
  items,
  legalLinks = [],
  collapsed,
  collapsible,
  onToggleCollapse,
  colors,
  dims,
  arrowClassName,
}) => {
  return (
    <div
      style={{
        width: collapsed ? dims.collapsedWidth : dims.unfoldedWidth,
        borderRight: "1px solid #eee",
        padding: collapsed ? dims.paddingCollapsed : dims.paddingUnfolded,
        display: "flex",
        flexDirection: "column",
        gap: 8,
        background: colors.navbarBg,
        overflow: "auto",
      }}
    >
      {collapsible && (
        <button
          onClick={onToggleCollapse}
          className={arrowClassName}
          style={{
            padding: 8,
            border: "1px solid #ddd",
            background: "#fff",
            cursor: "pointer",
          }}
        ></button>
      )}

      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        {items.map((node, i) => (
          <div key={i}>{node}</div>
        ))}
      </div>

      {!!legalLinks.length && (
        <div
          style={{
            marginTop: "auto",
            display: "flex",
            flexDirection: "column",
            gap: 4,
            color: colors.legalLink,
          }}
        >
          {legalLinks.map((linkNode, i) => (
            <div key={i}>{linkNode}</div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomNavbar;

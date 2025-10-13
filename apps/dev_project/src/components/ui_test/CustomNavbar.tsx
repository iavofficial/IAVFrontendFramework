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

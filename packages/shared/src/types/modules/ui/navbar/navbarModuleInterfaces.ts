/**
 * Copyright © 2025 IAV GmbH Ingenieurgesellschaft Auto und Verkehr, All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import {FFModule} from "../../generalModule";

export interface UINavbarProps {
  items: React.ReactNode[];
  legalLinks?: React.ReactNode[];
  collapsed: boolean;
  collapsible: boolean;
  onToggleCollapse: () => void;
  colors: {
    navbarBg: string;
    legalLink: string;
    collapseArrow: string;
    scrollbar: string;
  };
  dims: {
    collapsedWidth: number;
    unfoldedWidth: number;
    paddingCollapsed: number;
    paddingUnfolded: number;
    paddingGab: number;
  };
  arrowClassName: string;
}

export type NavbarModule = {
  UiLayerNavbar: React.ComponentType;
} & FFModule;

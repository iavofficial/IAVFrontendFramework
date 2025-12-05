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

import React, { PropsWithChildren } from "react";
import { Link, useLocation } from "react-router-dom";
import { makeStyles } from "../../../util/makeStyles.tsx";
import { BLUE3, MAGENTA1, WHITE } from "../../../constants.ts";
import Badge from "./badge/badge.tsx";
import { toRgba } from "../../../util/toRgba.ts";

const useStyles = makeStyles(() => ({
  link: {
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "7px",
    textDecoration: "none",
    color: "var(--primary-color)",
    padding: "11px 16px",
    borderRadius: "12px",
    fontSize: "15px",
    fontWeight: 500,
    background: toRgba(WHITE, 0.05),
    backdropFilter: "blur(10px)",
    WebkitBackdropFilter: "blur(10px)",
    transition: "all 0.3s ease",
    "&:hover": {
      background: toRgba(BLUE3, 0.18),
      transform: "translateX(3px)",
    },
  },
  activeLink: {
    background: toRgba(BLUE3, 0.35),
    backdropFilter: "blur(12px)",
    WebkitBackdropFilter: "blur(12px)",
    transform: "translateX(3px)",
    boxShadow: `0 4px 16px ${toRgba(BLUE3, 0.25)}`,
  },
  badge: {
    marginLeft: "6px",
    padding: "2px 8px",
    backgroundColor: MAGENTA1,
    color: WHITE,
    borderRadius: "8px",
    fontSize: "11px",
    fontWeight: 600,
    backdropFilter: "blur(8px)",
    WebkitBackdropFilter: "blur(8px)",
  },
}));

interface Props {
  key?: string;
  to: string;
  label: string;
  isNew?: boolean;
}

const NavigationItem: React.FC<PropsWithChildren<Props>> = (props) => {
  const { to, label, isNew } = props;

  const { classes } = useStyles();
  const location = useLocation();
  const segments = location.pathname.split("/").filter(Boolean);

  const base = segments.slice(0, 2).join("/");

  const target = `/${base}/${to}`;

  const isActive = location.pathname === target;

  return (
    <li key={to}>
      <Link
        to={target}
        className={`${classes.link} ${isActive ? classes.activeLink : ""}`}
      >
        {label}
        {isNew && <Badge />}
      </Link>
    </li>
  );
};

export default NavigationItem;

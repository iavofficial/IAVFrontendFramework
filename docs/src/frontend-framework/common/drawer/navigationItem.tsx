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
import makeStyles from "../../../util/makeStyles.tsx";
import { GREY2 } from "../../../constants.ts";
import { MAGENTA1 } from "@iavofficial/frontend-framework/constants";
import Badge from "./badge/badge.tsx";

const useStyles = makeStyles(() => ({
  link: {
    cursor: "pointer",
    display: "block",
    textDecoration: "none",
    color: "var(--primary-color)",
    padding: "8px",
    borderRadius: "4px",
    "&:hover": {
      backgroundColor: "#333",
      color: "#fff",
    },
  },
  activeLink: {
    backgroundColor: GREY2,
  },
  badge: {
    marginLeft: "4px",
    padding: "2px 6px",
    backgroundColor: MAGENTA1,
    color: "white",
    borderRadius: "6px",
    fontSize: "12px",
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

  const isActive = location.pathname.includes(to);

  return (
    <li key={to}>
      <Link
        to={to}
        className={`${classes.link} ${isActive ? classes.activeLink : ""}`}
      >
        {label}
        {isNew && <Badge />}
      </Link>
    </li>
  );
};

export default NavigationItem;

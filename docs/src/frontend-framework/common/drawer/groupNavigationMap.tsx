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

import React, { useState } from "react";
import { toRgba } from "../../../util/toRgba.ts";
import { makeStyles } from "../../../util/makeStyles.tsx";
import NavigationMap from "./navigationMap.tsx";
import { GroupRoute } from "../page/pathRoute.ts";
import Badge from "./badge/badge.tsx";
import { BLACK, BLUE3, WHITE } from "../../../constants.ts";

const useStyles = makeStyles(() => ({
  groupTitle: {
    width: "100%",
    cursor: "pointer",
    padding: "12px 18px",
    marginBottom: "12px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: 600,
    fontSize: "15px",
    border: "none",
    position: "relative",
    borderRadius: "14px",
    background: toRgba(WHITE, 0.06),
    backdropFilter: "blur(12px) saturate(160%)",
    WebkitBackdropFilter: "blur(12px) saturate(160%)",
    boxShadow: `0 4px 20px ${toRgba(BLACK, 0.15)}`,
    transition: "all 0.35s ease",
    "&:hover": {
      background: toRgba(BLUE3, 0.35),
      transform: "translateX(4px)",
      boxShadow: `0 6px 24px ${toRgba(BLUE3, 0.4)}`,
    },
  },
  groupList: {
    listStyle: "none",
    padding: 0,
    margin: 0,
    backdropFilter: "blur(8px)",
    WebkitBackdropFilter: "blur(8px)",
  },
  groupItem: {
    paddingLeft: "20px",
  },
  badge: {
    position: "absolute",
    right: "12px",
    top: "50%",
    transform: "translateY(-50%)",
    backdropFilter: "blur(10px)",
    WebkitBackdropFilter: "blur(10px)",
  },
}));
interface Props {
  groups: GroupRoute[];
}

const GroupNavigationMap: React.FC<Props> = (props) => {
  const { groups } = props;
  const { classes } = useStyles();

  const [openGroups, setOpenGroups] = useState<string[]>([]);

  const toggleGroup = (title: string) => {
    setOpenGroups((prev) => {
      if (prev.includes(title)) {
        return prev.filter((group) => group !== title);
      } else {
        return [...prev, title];
      }
    });
  };

  return groups.map((group) => {
    const isOpen = openGroups.includes(group.title);

    return (
      <div key={group.title}>
        <button
          className={classes.groupTitle}
          onClick={() => toggleGroup(group.title)}
        >
          {group.title}
          {group.isNew && <Badge className={classes.badge} />}
        </button>
        {isOpen && <NavigationMap routes={group.routes} />}
      </div>
    );
  });
};

export default GroupNavigationMap;

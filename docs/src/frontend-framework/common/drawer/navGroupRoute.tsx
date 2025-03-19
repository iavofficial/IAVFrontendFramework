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
import { GroupRoute } from "../page/pathRoute.ts";
import makeStyles from "../../../util/makeStyles.tsx";
import NavigationRoute from "./navigationRoute.tsx";
import { BLUE0 } from "../../../constants.ts";

const useStyles = makeStyles(() => ({
  groupTitle: {
    width: "100%",
    cursor: "pointer",
    padding: "8px 0",
    marginBottom: "8px",
    display: "block",
    fontWeight: "bold",
    border: "none",
    "&:hover": {
      backgroundColor: BLUE0,
      color: "#fff",
    },
    borderRadius: "8px",
  },
  groupList: {
    listStyle: "none",
    padding: 0,
    margin: 0,
  },
  groupItem: {
    paddingLeft: "16px",
  },
}));

interface Props {
  groups: GroupRoute[];
}

const NavGroupRoute: React.FC<Props> = ({ groups }) => {
  const { classes } = useStyles();

  const [isOpen, setIsOpen] = useState(false);

  return groups.map((group) => (
    <div key={group.title}>
      <button className={classes.groupTitle} onClick={() => setIsOpen(!isOpen)}>
        {group.title}
      </button>
      {isOpen && <NavigationRoute routes={group.routes} />}
    </div>
  ));
};

export default NavGroupRoute;

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
 **/

import React from "react";
import Badge from "./badge.tsx";
import makeStyles from "../../../../util/makeStyles.tsx";

const useStyles = makeStyles(() => ({
  headerContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    marginTop: "30px",
  },
  badge: {
    marginLeft: "8px",
    padding: "4px 8px",
    backgroundColor: "red",
    color: "white",
    borderRadius: "12px",
    fontSize: "12px",
  },
}));

interface Props {
  title: string;
}

const BadgeHeader: React.FC<Props> = (props) => {
  const { title, badgeText } = props;

  const { classes } = useStyles();

  return (
    <div className={classes.headerContainer}>
      <h3>{title}</h3>
      <Badge />
    </div>
  );
};

export default BadgeHeader;

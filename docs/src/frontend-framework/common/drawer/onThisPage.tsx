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

import React, { useEffect, useState } from "react";
import makeStyles from "../../../util/makeStyles.tsx";

const useStyles = makeStyles(() => ({
  pageNav: {
    position: "fixed",
    top: "61px",
    right: "0",
    width: "200px",
    height: "100%",
    backgroundColor: "#ffffff",
    borderLeft: "1px solid lightgray",
    zIndex: 1000,
    padding: "20px",
    fontSize: "0.875rem",
    overflowY: "auto",
  },
  heading: {
    fontSize: "1.25rem",
    marginTop: "1em",
    marginBottom: "1em",
  },
  list: {
    listStyle: "none",
    padding: 0,
  },
  listItem: {
    borderRadius: "4px",
    padding: "0px 10px",
    transition: "background-color 0.3s ease",
    marginBottom: "8px",
  },
  listItemH2: {
    marginLeft: "20px",
  },
  link: {
    textDecoration: "none",
    color: "#0056b3",
    "&:hover": {
      textDecoration: "underline",
    },
  },
}));

const OnThisPage: React.FC = () => {
  const { classes } = useStyles();
  const [headings, setHeadings] = useState<
    { id: string; text: string; tag: string }[]
  >([]);

  useEffect(() => {
    const elements = document.querySelectorAll("h1, h2");
    const newHeadings = Array.from(elements)
      .filter((el) => el.textContent !== "IAV Frontend Framework")
      .map((el) => {
        const id = el.textContent?.toLowerCase();
        el.id = id;
        return {
          id,
          text: el.textContent || "",
          tag: el.tagName.toLowerCase(),
        };
      });

    setHeadings(newHeadings);
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const target = document.getElementById(id);
    if (target) {
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <nav className={classes.pageNav}>
      <h3 className={classes.heading}>On this page</h3>
      <ul className={classes.list}>
        {headings.map((heading) => (
          <li
            key={heading.id}
            className={`${classes.listItem} ${heading.tag === "h2" ? classes.listItemH2 : ""}`}
          >
            <a
              href={`#${heading.id}`}
              className={classes.link}
              onClick={(e) => handleClick(e, heading.id)}
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default OnThisPage;

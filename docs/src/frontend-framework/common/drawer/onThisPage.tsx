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
import { makeStyles } from "../../../util/makeStyles.tsx";
import { toRgba } from "../../../util/toRgba.ts";
import { BLUE3, WHITE } from "../../../constants.ts";

const useStyles = makeStyles(() => ({
  pageNav: {
    position: "fixed",
    top: "61px",
    right: "0",
    width: "200px",
    height: "calc(100vh - 61px)",
    padding: "18px 20px",
    zIndex: 1000,
    overflowY: "auto",
    fontSize: "0.875rem",
    background: toRgba(WHITE, 0.06),
    backdropFilter: "blur(10px)",
    WebkitBackdropFilter: "blur(10px)",
    borderLeft: `1px solid ${toRgba(WHITE, 0.2)}`,
  },
  heading: {
    fontSize: "0.85rem",
    fontWeight: 600,
    textTransform: "uppercase",
    letterSpacing: "0.08em",
    marginTop: "0",
    marginBottom: "1rem",
    opacity: 0.8,
  },
  list: {
    listStyle: "none",
    padding: 0,
    margin: 0,
  },
  listItem: {
    borderRadius: "10px",
    padding: "6px 10px",
    marginBottom: "6px",
    transition: "all 0.25s ease",
    background: toRgba(WHITE, 0.03),
    "&:hover": {
      background: toRgba(BLUE3, 0.18),
      transform: "translateX(-3px)",
    },
  },
  listItemH2: {
    marginLeft: "16px",
  },
  link: {
    display: "block",
    textDecoration: "none",
    color: "var(--primary-color)",
    fontSize: "0.84rem",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
    overflow: "hidden",
    "&:hover": {
      textDecoration: "none",
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

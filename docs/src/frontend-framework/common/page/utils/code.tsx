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

import React, { PropsWithChildren, useState } from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { makeStyles } from "../../../../util/makeStyles.tsx";
import { ocean } from "react-syntax-highlighter/dist/cjs/styles/hljs";
import { BLACK, BLUE3, BLUE4, GREY2, WHITE } from "../../../../constants.ts";
import { toRgba } from "../../../../util/toRgba.ts";

const useStyles = makeStyles(({ center }) => ({
  wrapper: {
    position: "relative",
    width: "100%",
    margin: "8px 0",
  },
  codeBlock: {
    width: "100%",
    padding: "2px",
    borderRadius: "8px",
    overflowX: "auto",
    whiteSpace: "pre-wrap",
    fontSize: "0.875rem",
    lineHeight: "1.5",
    background: "#2b303b",
    paddingLeft: center ? "0px" : "8px",
  },
  title: {
    padding: "2px 0",
    color: GREY2,
    fontSize: "0.8rem",
    fontWeight: "bold",
  },
  copyButton: {
    position: "absolute",
    top: "6px",
    right: "6px",
    padding: "4px 8px",
    fontSize: "0.75rem",
    background: toRgba(BLACK, 0.1),
    border: "1px solid rgba(255,255,255,0.2)",
    borderRadius: "6px",
    cursor: "pointer",
    color: WHITE,
    transition: "all 0.2s ease",
    backdropFilter: "blur(6px)",
    "&:hover": {
      background: toRgba(BLACK, 0.2),
    },
  },
  copied: {
    background: toRgba(BLUE3, 0.2),
    borderColor: toRgba(BLUE4, 0.5),
  },
}));

interface Props {
  language: string;
  title?: string;
  center?: boolean;
}

const Code: React.FC<PropsWithChildren<Props>> = (props) => {
  const { language, children, title, center } = props;
  const { classes } = useStyles({ center });

  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(String(children));
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (e) {
      console.error("Copy failed", e);
    }
  };

  return (
    <div className={classes.wrapper}>
      <button
        className={`${classes.copyButton} ${copied ? classes.copied : ""}`}
        onClick={copyToClipboard}
      >
        {copied ? "Copied!" : "Copy"}
      </button>

      <div className={classes.codeBlock}>
        {title && <div className={classes.title}>{title}</div>}
        <SyntaxHighlighter language={language} style={ocean}>
          {children}
        </SyntaxHighlighter>
      </div>
    </div>
  );
};

export default Code;

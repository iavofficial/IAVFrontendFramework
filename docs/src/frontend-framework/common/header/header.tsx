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

import React, { useCallback, useEffect, useState } from "react";
import { makeStyles } from "../../../util/makeStyles.tsx";
import Title from "../page/text/title.tsx";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { versionMappings } from "../../versionMappings.ts";
import SearchHeaders from "./searchHeaders.tsx";
import { toRgba } from "../../../util/toRgba.ts";
import {
  BLACK,
  BLUE3,
  GREY4,
  GREY5,
  GREY6,
  WHITE,
} from "../../../constants.ts";

const useStyles = makeStyles(() => ({
  header: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "40px",
    padding: "10px 20px",
    zIndex: 1000,
    display: "flex",
    alignItems: "center",
    gap: "16px",
    background: toRgba(WHITE, 0.82),
    backdropFilter: "blur(14px)",
    WebkitBackdropFilter: "blur(14px)",
    borderBottom: "1px solid lightgray",
  },
  headerTitle: {
    fontSize: "1.4rem !important",
    fontWeight: 700,
    color: GREY5,
    paddingLeft: "6px",
    letterSpacing: "0.02em",
    whiteSpace: "nowrap",
  },
  versionDropdown: {
    marginLeft: "20px",
    position: "relative",
    display: "inline-block",
    fontFamily:
      "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    "&::after": {
      content: '"\\25BC"',
      position: "absolute",
      top: "50%",
      right: "14px",
      transform: "translateY(-50%)",
      pointerEvents: "none",
      color: GREY4,
      fontSize: "11px",
      opacity: 0.8,
    },
  },
  headerVersion: {
    appearance: "none",
    WebkitAppearance: "none",
    MozAppearance: "none",
    background: toRgba(WHITE, 0.9),
    color: GREY6,
    padding: "8px 34px 8px 14px",
    border: `1px solid ${toRgba(BLACK, 0.08)}`,
    borderRadius: "999px",
    fontSize: "13px",
    cursor: "pointer",
    outline: "none",
    transition: "all 0.25s ease",
    boxShadow: `0 1px 4px ${toRgba(BLACK, 0.06)}`,
    "&:hover": {
      background: toRgba(WHITE, 1),
      borderColor: BLUE3,
    },
    "&:focus": {
      borderColor: BLUE3,
      boxShadow: `0 0 0 2px ${toRgba(BLUE3, 0.25)}`,
    },
  },
}));

interface Props {
  projectName: string;
}

const Header: React.FC<Props> = (props) => {
  const { projectName } = props;
  const { classes } = useStyles();

  const { version } = useParams<{ version: string }>();

  const [versions, setVersions] = useState<string[]>([]);
  const [selectedVersion, setSelectedVersion] = useState<string>("");

  const navigate = useNavigate();
  const location = useLocation();

  const handleLocalVersionChange = useCallback(
    (newVersion: string) => {
      let newPath = location.pathname;
      newPath = newPath.replace(
        /\/docs\/([^\/]+)\/[^\/]+$/,
        `/${newVersion}/overview`,
      );
      newPath = newPath.replace(/\/index\.html$/, `/${newVersion}/overview`);
      navigate(newPath);
    },
    [location.pathname, navigate],
  );

  const handleVersionChange = useCallback(
    (newVersion: string) => {
      const newPath = location.pathname.replace(
        /^\/([^/]+)\/[^/]+/,
        `/$1/${newVersion}`,
      );
      navigate(newPath);
    },
    [location.pathname, navigate],
  );

  const getVersionList = useCallback(async (): Promise<string[] | null> => {
    return Object.keys(versionMappings).reverse();
  }, []);

  const isValidVersion = useCallback((version: string | undefined) => {
    return version && /^\d+\.\d+\.\d+$/.test(version);
  }, []);

  const loadVersions = useCallback(async () => {
    const versionList = await getVersionList();
    if (versionList) {
      if (isValidVersion(version)) {
        setVersions([
          version || "",
          ...versionList.filter((v) => v !== version && isValidVersion(v)),
        ]);
        setSelectedVersion(version || "");
      } else {
        setVersions(versionList);
        setSelectedVersion(versionList[0]);
      }
    }
  }, [getVersionList, isValidVersion, version]);

  useEffect(() => {
    const fetchVersion = async () => {
      if (!isValidVersion(version)) {
        const versionList = await getVersionList();
        if (versionList) {
          handleLocalVersionChange(`${versionList[0]}`);
        }
      }
    };
    fetchVersion();
  }, [
    version,
    handleVersionChange,
    getVersionList,
    handleLocalVersionChange,
    isValidVersion,
  ]);

  useEffect(() => {
    loadVersions();
  }, [loadVersions]);

  return (
    <header className={classes.header}>
      <a
        href={`https://github.com/iavofficial/${projectName}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <img
          alt="GitHub"
          height="32"
          src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"
          width="32"
        />
      </a>
      <Title className={classes.headerTitle}>IAV Frontend Framework</Title>
      <div className={classes.versionDropdown}>
        <label>
          <select
            className={classes.headerVersion}
            value={selectedVersion}
            onChange={(event) => handleVersionChange(event.target.value)}
          >
            {versions.map((version) => (
              <option key={version} value={version}>
                {version}
              </option>
            ))}
          </select>
        </label>
      </div>
      <SearchHeaders versionMappings={versionMappings} />
    </header>
  );
};

export default Header;

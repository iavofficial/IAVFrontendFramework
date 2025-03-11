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

import React, {useCallback, useEffect, useState} from "react";
import {DropdownChangeEvent} from 'primereact/dropdown';
import makeStyles from "../../../../src/components/content/style_options/makeStyles";
import Title from "../page/text/title.tsx";
import {useNavigate} from "react-router";

const useStyles = makeStyles(() => ({
    header: {
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "40px",
        backgroundColor: "#ffffff",
        borderBottom: "1px solid lightgray",
        zIndex: 1000,
        padding: "10px 20px",
        display: "flex",
        alignItems: "center",
    },
    headerTitle: {
        fontSize: "1.5rem !important",
        fontWeight: "bold",
        color: "#333",
        paddingLeft: "4px",
    },
    versionDropdown: {
        marginLeft: "20px",
        position: "relative",
        display: "inline-block",
        fontFamily: "Arial, sans-serif",
        "&::after": {
            content: '"\\25BC"',
            position: "absolute",
            top: "50%",
            right: "15px",
            transform: "translateY(-50%)",
            pointerEvents: "none",
            color: "#333",
            fontSize: "12px",
        },
    },
    headerVersion: {
        appearance: "none",
        backgroundColor: "#f0f0f0",
        color: "#333",
        padding: "10px 40px 10px 15px",
        border: "1px solid #ccc",
        borderRadius: "5px",
        fontSize: "14px",
        cursor: "pointer",
        outline: "none",
        transition: "all 0.3s ease",
        '&:hover': {
            backgroundColor: "#e0e0e0",
        },
        '&:focus': {
            borderColor: "#007BFF",
            boxShadow: "0 0 5px rgba(0, 123, 255, 0.5)",
        }
    },
    versionBanner: {
        marginLeft: "40px",
    }
}));

interface Props {
    projectName: string;
}

const Header: React.FC<Props> = (props) => {

    const {projectName} = props;

    const {classes} = useStyles();

    const [versions, setVersions] = useState<string[]>([]);
    const [selectedVersion, setSelectedVersion] = useState<string>("");

    const navigate = useNavigate();

    const extractVersionFromURL = (url: string): string => {
        const parts = url.split("/");
        return parts[parts.length - 2] || "latest";
    };

    const loadVersions = useCallback(async () => {
        const response = await fetch(`https://iavofficial.github.io/${projectName}/version-list.md`);
        if (response.ok) {
            const versionText = await response.text();
            console.log(versionText);
            const versionList = versionText
                .split("\n")
                .map(line => line.trim())
                .filter(line => line !== "")
                .sort((a, b) => b.localeCompare(a, undefined, {numeric: true}))

            const currentVersion = extractVersionFromURL(window.location.href);
            setVersions([currentVersion, ...versionList.filter(v => v !== currentVersion)]);
            setSelectedVersion(currentVersion);
        }
    }, []);

    useEffect(() => {
        loadVersions();
    }, [loadVersions]);

    const handleVersionChange = (event: React.ChangeEvent<DropdownChangeEvent>) => {
        const newVersion = event.target.value;
        setSelectedVersion(newVersion);
        const newPath = window.location.pathname.replace(
            new RegExp(`^/${projectName}/[^/]+`),
            `/${projectName}/${newVersion}`
        );
        navigate(newPath);
        window.location.reload();
    };

    return (
        <header className={classes.header}>
            <a href={`https://github.com/iavofficial/${projectName}`} target="_blank" rel="noopener noreferrer">
                <img alt="GitHub" height="32"
                     src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png" width="32"/>
            </a>
            <Title className={classes.headerTitle}>IAV Frontend Framework</Title>
            <div className={classes.versionDropdown}>
                <label>
                    <select className={classes.headerVersion} value={selectedVersion} onChange={handleVersionChange}>
                        {versions.map(version => (
                            <option key={version} value={version}>{version}</option>
                        ))}
                    </select>
                </label>
            </div>
        </header>
    );
};

export default Header;
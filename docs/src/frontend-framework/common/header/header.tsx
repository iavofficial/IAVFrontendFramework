import React, {useCallback, useEffect, useState} from "react";
import makeStyles from "../../../util/makeStyles.tsx";
import Title from "../page/text/title.tsx";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import {versionMappings} from "../../versionMappings.ts";

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

    const {version} = useParams<{ version: string }>();

    const [versions, setVersions] = useState<string[]>([]);
    const [selectedVersion, setSelectedVersion] = useState<string>("");

    const navigate = useNavigate();
    const location = useLocation();

    const handleLocalVersionChange = useCallback(
        (newVersion: string) => {
            let newPath = location.pathname;
            newPath = newPath.replace(/\/docs\/([^\/]+)\/[^\/]+$/, `/${newVersion}/overview`);
            newPath = newPath.replace(/\/index\.html$/, `/${newVersion}/overview`);
            navigate(newPath);
        },
        [location.pathname, navigate]
    );

    const handleVersionChange = useCallback((newVersion: string) => {
        const newPath = location.pathname.replace(
            /^\/([^/]+)\/[^/]+/,
            `/$1/${newVersion}`
        );
        navigate(newPath);
    }, [location.pathname, navigate]);

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
                setVersions([version || "", ...versionList.filter(v => v !== version && isValidVersion(v))]);
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
    }, [version, handleVersionChange, getVersionList, handleLocalVersionChange, isValidVersion]);

    useEffect(() => {
        loadVersions();
    }, [loadVersions]);

    return (
        <header className={classes.header}>
            <a href={`https://github.com/iavofficial/${projectName}`} target="_blank" rel="noopener noreferrer">
                <img alt="GitHub" height="32"
                     src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png" width="32"/>
            </a>
            <Title className={classes.headerTitle}>IAV Frontend Framework</Title>
            <div className={classes.versionDropdown}>
                <label>
                    <select className={classes.headerVersion} value={selectedVersion}
                            onChange={event => handleVersionChange(event.target.value)}>
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

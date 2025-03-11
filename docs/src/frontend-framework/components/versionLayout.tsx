import {Navigate, useParams} from "react-router-dom";
import Version1_4_0 from "../versions/1.4.0";
import Version1_5_0 from "../versions/1.5.0";
import React from "react";

interface Props {
    projectName: string;
}

const VersionLayout: React.FC<Props> = (props) => {

    const {projectName} = props;

    const {version} = useParams<{ version: string }>();

    const versions: Record<string, JSX.Element> = {
        "1.4.0": <Version1_4_0/>,
        "1.5.0": <Version1_5_0/>,
    };

    return versions[version] || <Navigate to={`/${projectName}/1.5.0`} replace/>;
};

export default VersionLayout;

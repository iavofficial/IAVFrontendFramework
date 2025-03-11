import {useParams} from "react-router-dom";
import Version1_1_0 from "../versions/1.1.0";
import Version1_3_0 from "../versions/1.3.0";
import React from "react";


const VersionLayout: React.FC = () => {

    const {version} = useParams<{ version: string }>();

    const versions: Record<string, JSX.Element> = {
        "1.1.0": <Version1_1_0/>,
        "1.3.0": <Version1_3_0/>,
    };

    return versions[version];
};

export default VersionLayout;

import React from "react";
import {useParams} from "react-router-dom";
import {versionMappings} from "../versionMappings.ts";

const VersionLayout: React.FC = () => {
    const {version} = useParams<{ version: string }>();

    const [Component, setComponent] = React.useState<React.ComponentType | null>(null);

    React.useEffect(() => {
        if (version && versionMappings[version]) {
            versionMappings[version]().then((module) => {
                setComponent(() => module.default);
            });
        }
    }, [version]);

    return Component ? <Component/> : <div>Loading...</div>;
};

export default VersionLayout;

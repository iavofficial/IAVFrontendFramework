import {useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";

const VersionLayout: React.FC = () => {
    const {version} = useParams<{ version: string }>();
    const [Component, setComponent] = useState<React.ComponentType | null>(null);

    useEffect(() => {
        const loadVersionComponent = async () => {
            try {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                //@ts-expect-error
                const module = await import(`../versions/${version}`);
                setComponent(() => module.default);
            } catch (error) {
                console.error(`Error loading version ${version}:`, error);
            }
        };

        if (version) {
            loadVersionComponent();
        }
    }, [version]);

    return Component ? <Component/> : <div>Loading...</div>;
};

export default VersionLayout;

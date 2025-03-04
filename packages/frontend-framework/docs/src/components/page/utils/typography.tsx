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

import React, {PropsWithChildren} from "react";
import {classNames} from "primereact/utils";
import makeStyles from "../../../../../src/components/content/style_options/makeStyles.tsx";

const useStyles = makeStyles(() => ({
    typography: {
        fontFamily: "Arial, sans-serif",
    },
    h1: {
        fontSize: "2rem", // Example size for h1
        fontWeight: "bold",
        margin: "16px 0",
    },
    h2: {
        fontSize: "1.5rem", // Example size for h2
        fontWeight: "bold",
        margin: "14px 0",
    },
    h3: {
        fontSize: "1rem", // Example size for h3
        fontWeight: "bold",
        margin: "12px 0",
    },
    p: {
        fontSize: "1rem",
        margin: "8px 0 20px 0",
        lineHeight: "1.5"
    },
}));

interface Props {
    className?: string;
    variant: "p" | "h1" | "h2" | "h3";
}

const Typography: React.FC<PropsWithChildren<Props>> = (props) => {

    const {className, variant, children} = props;

    const {classes} = useStyles();

    switch (variant) {
        case "h1":
            return <h1 className={classNames(className, classes.typography, classes.h1)}>{children}</h1>;
        case "h2":
            return <h2 className={classNames(className, classes.typography, classes.h2)}>{children}</h2>;
        case "h3":
            return <h3 className={classNames(className, classes.typography, classes.h3)}>{children}</h3>;
        case "p":
            return <p className={classNames(className, classes.typography, classes.p)}>{children}</p>;
        default:
            return null;
    }
};

export default Typography;

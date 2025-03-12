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

import React, {HTMLAttributeAnchorTarget} from "react";
import {Link} from "react-router-dom";
import makeStyles from "../../../../util/makeStyles.tsx";
import {BLUE3} from "@iavofficial/frontend-framework/constants";

const useStyles = makeStyles(() => ({
    link: {
        textDecoration: "none",
        color: BLUE3,
        borderRadius: "4px",
        transition: "background-color 0.3s ease",
        display: "inline-block",
        "&:hover": {
            textDecoration: "underline",
        }
    },
}));

interface Props {
    to: string;
    label: string;
    target?: HTMLAttributeAnchorTarget | undefined;
    className?: string;
}

const PageLink: React.FC<Props> = (props) => {

    const {to, className, label, target} = props;

    const {classes} = useStyles();

    return (
        <Link
            target={target}
            to={to}
            className={`${classes.link} ${className ? className : ""}`}>
            {label}
        </Link>
    );
};

export default PageLink;

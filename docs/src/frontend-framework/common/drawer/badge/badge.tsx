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

import React from "react";
import makeStyles from "../../../../util/makeStyles.tsx";
import {MAGENTA1} from "@iavofficial/frontend-framework/constants";

const useStyles = makeStyles(() => ({
    badge: {
        marginLeft: '4px',
        padding: '2px 6px',
        backgroundColor: MAGENTA1,
        color: 'white',
        borderRadius: '6px',
        fontSize: '12px',
        fontWeight: "bold"
    },
}));

interface Props {
    className?: string;
}

const Badge: React.FC<Props> = (props) => {

    const {classes} = useStyles();

    return (
        <span className={`${classes.badge} ${props.className}`}>New</span>
    )
}

export default Badge;
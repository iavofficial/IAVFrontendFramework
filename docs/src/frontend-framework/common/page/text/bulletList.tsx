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

import React from "react";
import makeStyles from "../../../../util/makeStyles.tsx";

const useStyles = makeStyles(({bulletType}) => ({
    list: {
        listStyleType: bulletType === "bullet" ? "disc" : bulletType === "number" ? "decimal" : "none",
        padding: 0,
        margin: 0,
        paddingLeft: bulletType ? "40px" : 0,
    },
    listItem: {
        marginBottom: "8px",
        lineHeight: "26px",
    },
}));

interface Props {
    items: string[];
    bulletType?: "bullet" | "number";
}

const BulletList: React.FC<Props> = (props) => {

    const {items, bulletType} = props;

    const {classes} = useStyles({bulletType});

    return (
        <ul className={classes.list}>
            {items.map((item, index) => (
                <li key={index} className={classes.listItem}>
                    {item}
                </li>
            ))}
        </ul>
    );
};

export default BulletList;

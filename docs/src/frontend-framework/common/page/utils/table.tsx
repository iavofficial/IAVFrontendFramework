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
import {BLUE3} from "@iavofficial/frontend-framework/constants";

const useStyles = makeStyles(() => ({
    table: {
        width: "100%",
        borderCollapse: "collapse",
        marginBottom: "1.5em",
        borderRadius: "8px",
        overflow: "hidden",
    },
    thead: {
        backgroundColor: BLUE3,
        color: "#fff",
    },
    tbody: {
        backgroundColor: "#fff",
    },
    th: {
        border: "1px solid #dee2e6",
        padding: "10px",
        textAlign: "left",
    },
    td: {
        border: "1px solid #dee2e6",
        padding: "10px",
        textAlign: "left",
    },
}));

export interface Column {
    title: string;
}

export type TableData<T extends { title: string }[]> = {
    [K in T[number]['title']]: string;
}[];

interface Props {
    columns: Column[];
    data: Array<Record<string, string>>;
}

const Table: React.FC<Props> = (props) => {
    const {columns, data} = props;
    const {classes} = useStyles();

    return (
        <table className={classes.table}>
            <thead className={classes.thead}>
            <tr>
                {columns.map((col) => (
                    <th key={col.title} className={classes.th}>
                        {col.title}
                    </th>
                ))}
            </tr>
            </thead>
            <tbody className={classes.tbody}>
            {data.map((row, index) => (
                <tr key={index}>
                    {columns.map((col) => (
                        <td key={col.title} className={classes.td}>
                            {row[col.title]}
                        </td>
                    ))}
                </tr>
            ))}
            </tbody>
        </table>
    );
};

export default Table;


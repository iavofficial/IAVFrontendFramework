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

import React, {PropsWithChildren} from "react";
import SyntaxHighlighter from 'react-syntax-highlighter';
import makeStyles from "../../../../util/makeStyles.tsx";
import {ocean} from "react-syntax-highlighter/dist/cjs/styles/hljs";
import { GREY2 } from "../../../../constants.ts";


const useStyles = makeStyles(({center}) => ({
    codeBlock: {
        width: "100%",
        padding: "2px",
        borderRadius: "8px",
        overflowX: "auto",
        whiteSpace: "pre-wrap",
        fontSize: "0.875rem",
        lineHeight: "1.5",
        background: "#2b303b",
        paddingLeft: center ? "0px" : "8px",
        margin: "8px 0",
    },
    title: {
        padding: "2px 0",
        color: GREY2,
        fontSize: "0.8rem",
        fontWeight: "bold",
    }
}));

interface Props {
    language: string;
    title?: string;
    center?: boolean;
}

const Code: React.FC<PropsWithChildren<Props>> = (props) => {

    const {language, children, title, center} = props;

    const {classes} = useStyles({center});

    return (
        <div className={classes.codeBlock}>
            {title && <div className={classes.title}>{title}</div>}
            <SyntaxHighlighter language={language} style={ocean}>
                {children}
            </SyntaxHighlighter>
        </div>
    );
};

export default Code;

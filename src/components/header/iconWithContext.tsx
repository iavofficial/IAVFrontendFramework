/**
 * Copyright © 2024 IAV GmbH Ingenieurgesellschaft Auto und Verkehr, All Rights Reserved.
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
import {classNames} from "primereact/utils";
import {Badge} from "primereact/badge";
import If from "../helper/If";

interface Props {
    icon: string;
    iconClassName?: string;
    style?: React.CSSProperties;
    onClick: (event: React.MouseEvent) => void;
    badge?: {
        active: boolean;
        value?: any | null | undefined;
        severity?: 'success' | 'info' | 'warning' | 'danger' | 'secondary' | 'contrast' | null | undefined;
        style?: React.CSSProperties
    }
}

export const IconWithContext: React.FC<PropsWithChildren<Props>> = (props) => {
    const {icon, iconClassName, style, onClick, children, badge} = props;

    return (
        <>
            <i
                style={{...style, fontSize: 19, margin: "0 1rem", cursor: "pointer"}}
                className={classNames(icon, iconClassName, badge && "p-overlay-badge")}
                onClick={onClick}
            />
            <If condition={badge?.active}>
                <Badge
                    style={{...badge?.style}}
                    value={badge?.value}
                    severity={badge?.severity}
                />
            </If>
            {children}
        </>
    );
};

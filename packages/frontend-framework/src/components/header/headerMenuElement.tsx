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

import React, {useEffect, useRef} from "react";
import {ContextMenu, ContextMenuProps} from "primereact/contextmenu";
import {IconWithContext} from "./iconWithContext";
import makeStyles from "../content/style_options/makeStyles";

const useStyles = makeStyles(() => ({
    openLeft: {
        transform: "rotate(180deg)",
    }
}));

interface Props extends ContextMenuProps {
    icon: string;
    iconClassName?: string;
    iconstyle?: React.CSSProperties;
    menuClassName?: string;
}

export const HeaderMenuElement: React.FC<Props> = (props) => {
    const {icon, iconClassName, iconstyle, menuClassName} = props;
    const {classes} = useStyles();
    const ref = useRef<ContextMenu>(null);

    useEffect(() => {
        const observer = new MutationObserver(() => {
            const submenuParents = document.querySelectorAll(".p-menuitem");
            submenuParents.forEach((menuitem) => {
                const submenu = menuitem.querySelector(".p-submenu-list") as HTMLElement | null;
                const icon = menuitem.querySelector(".p-submenu-icon") as HTMLElement | null;
                if (submenu && icon) {
                    icon.classList.forEach((className) => {
                        if (className.startsWith("openLeft-")) {
                            icon.classList.remove(className);
                        }
                    });
                    const left = submenu.style.left;
                    if (left.startsWith("-")) {
                        icon.classList.add(classes.openLeft);
                    }
                }
            });
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true,
            attributes: true,
            attributeFilter: ["style"],
        });

        return () => observer.disconnect();
    }, []);

    return (
        <IconWithContext
            icon={icon}
            iconClassName={iconClassName}
            style={iconstyle}
            onClick={(event) => ref.current?.show(event)}
        >
            <ContextMenu
                {...props}
                ref={ref}
                className={menuClassName}
            />
        </IconWithContext>
    );
};


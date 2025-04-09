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

import React, {useState} from "react";
import makeStyles from "../../../util/makeStyles.tsx";
import NavigationMap from "./navigationMap.tsx";
import {GroupRoute} from "../page/pathRoute.ts";
import Badge from "./badge/badge.tsx";

const useStyles = makeStyles(() => ({
    groupTitle: {
        width: '100%',
        cursor: 'pointer',
        padding: '8px 0',
        marginBottom: '8px',
        display: 'flex', // Flexbox, um Text und Badge nebeneinander zu positionieren
        alignItems: 'center', // Vertikale Ausrichtung auf der gleichen Höhe
        justifyContent: 'center', // Horizontal zentrieren des gesamten Inhalts
        fontWeight: 'bold',
        border: 'none',
        position: 'relative', // Damit das Badge rechts positioniert werden kann
        '&:hover': {
            backgroundColor: '#007bff',
            color: '#fff',
        },
        borderRadius: '8px',
    },
    groupList: {
        listStyle: 'none',
        padding: 0,
        margin: 0,
    },
    groupItem: {
        paddingLeft: '16px',
    },
    badge: {
        position: 'absolute',
        right: '10px',
        top: '50%',
        transform: 'translateY(-50%)',  // Vertikale Zentrierung des Badges
    },
}));

interface Props {
    groups: GroupRoute[];
}

const GroupNavigationMap: React.FC<Props> = (props) => {
    const {groups} = props;
    const {classes} = useStyles();

    const [openGroups, setOpenGroups] = useState<string[]>([]);

    const toggleGroup = (title: string) => {
        setOpenGroups((prev) => {
            if (prev.includes(title)) {
                return prev.filter((group) => group !== title);
            } else {
                return [...prev, title];
            }
        });
    };

    return groups.map((group) => {
        const isOpen = openGroups.includes(group.title);

        return (
            <div key={group.title}>
                <button
                    className={classes.groupTitle}
                    onClick={() => toggleGroup(group.title)}
                >
                    {group.title}
                    {group.isNew && <Badge className={classes.badge}/>}
                </button>
                {isOpen && <NavigationMap routes={group.routes}/>}
            </div>
        );
    });
};

export default GroupNavigationMap;

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

import React, {useContext, useMemo} from "react";
import "../css/globalColors.css";
import {ContentBar, ContentBarStyles, ContentBarStylesArray,} from "./contentBar";
import {BasicContentbarWrapper} from "./basicContentbarWrapper";
import {CustomContentbarWrapper} from "./customContentbarWrapper";
import {ContentLayout, ContentLayoutAndStyleProps,} from "./contentLayout";
import {ColorSettingsContext} from "../../contexts/colorsettings";
import {useSearchParams} from "react-router-dom";

export type ContentWithBarProps = {
    contentWrappers: BasicContentbarWrapper[] | CustomContentbarWrapper[];
    selectedId?: string; // optional, wird von URL überschrieben
    addable?: boolean;
    jumpToEndOfContentBar?: boolean;
    onClickAddButton?: () => any;
    onClickLeftSlideButton?: () => any;
    onClickRightSlideButton?: () => any;
};

export type ContentLayoutAndStyleAndWithBarProps = ContentLayoutAndStyleProps &
    ContentWithBarProps;

export const ContentWithBar = (
    props: React.PropsWithChildren<ContentLayoutAndStyleAndWithBarProps>,
) => {
    const colorSettingsContext = useContext(ColorSettingsContext);
    const [searchParams, setSearchParams] = useSearchParams();

    const contentAreaBackground =
        colorSettingsContext.currentColors.contentArea.backgroundColor;

    // Hole Tab-ID aus URL
    const selectedIdFromURL = searchParams.get("tab");
    const selectedId = useMemo(() => {
        if (selectedIdFromURL) return selectedIdFromURL;
        return props.selectedId ?? props.contentWrappers[0]?.getId();
    }, [selectedIdFromURL, props.selectedId, props.contentWrappers]);

    const selectedContentWrapper = useMemo(() => {
        return props.contentWrappers.find(
            (currentWrapper) => currentWrapper.getId() === selectedId,
        );
    }, [props.contentWrappers, selectedId]);

    const contentBarStyles = useMemo(() => {
        const tempContentbarStyles: ContentBarStylesArray = [];
        Object.values(ContentBarStyles).forEach((contentBarStyle) => {
            if (props.contentStyle?.appliedStyles?.includes(contentBarStyle)) {
                tempContentbarStyles.push(contentBarStyle);
                if (contentBarStyle === ContentBarStyles.SET_SPACING_COLOR) {
                    tempContentbarStyles.push(ContentBarStyles.SPACING);
                }
            }
        });
        return tempContentbarStyles;
    }, [props.contentStyle]);

    const handleTabChange = (id: string) => {
        setSearchParams((prev) => {
            const newParams = new URLSearchParams(prev);
            newParams.set("tab", id);
            return newParams;
        });
    };

    return (
        <div
            className="flex flex-column"
            style={{
                width: "100%",
                overflow: "auto",
                background: contentAreaBackground,
            }}
        >
            {props.contentWrappers.length >= 1 && (
                <ContentBar
                    selectedId={selectedId}
                    onClickLeftSlideButton={props.onClickLeftSlideButton}
                    onClickRightSlideButton={props.onClickRightSlideButton}
                    onClickAddButton={props.onClickAddButton}
                    addable={props.addable}
                    jumpToEndOfContentBar={props.jumpToEndOfContentBar}
                    contentElements={props.contentWrappers}
                    appliedStyles={contentBarStyles}
                    onSelectTab={handleTabChange}
                />
            )}

            <div
                className="w-full"
                style={{
                    height: "100%",
                    overflow: "auto",
                }}
            >
                <ContentLayout
                    layoutBehaviour={props.layoutBehaviour}
                    contentStyle={props.contentStyle}
                >
                    {selectedContentWrapper?.getContentAreaElement()}
                </ContentLayout>
            </div>
        </div>
    );
};

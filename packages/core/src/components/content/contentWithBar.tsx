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

import React, {useMemo} from "react";
import "../css/globalColors.css";
import {
  ContentBar,
  ContentBarStyles,
  ContentBarStylesArray,
} from "./contentBar";
import {BasicContentbarWrapper} from "./basicContentbarWrapper";
import {CustomContentbarWrapper} from "./customContentbarWrapper";
import {ContentLayout, ContentLayoutAndStyleProps} from "./contentLayout";

export type ContentWithBarProps = {
  contentWrappers: BasicContentbarWrapper[] | CustomContentbarWrapper[];
  selectedId: string;
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
  const selectedContentWrapper = useMemo(() => {
    return props.contentWrappers.find(
      (currentWrapper) => currentWrapper.getId() === props.selectedId,
    );
  }, [props.contentWrappers, props.selectedId]);

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

  return (
    <div className="flex flex-column" style={{width: "100%", overflow: "auto"}}>
      {props.contentWrappers.length >= 1 && (
        <ContentBar
          selectedId={props.selectedId}
          onClickLeftSlideButton={props.onClickLeftSlideButton}
          onClickRightSlideButton={props.onClickRightSlideButton}
          onClickAddButton={props.onClickAddButton}
          addable={props.addable}
          jumpToEndOfContentBar={props.jumpToEndOfContentBar}
          contentElements={props.contentWrappers}
          appliedStyles={contentBarStyles}
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

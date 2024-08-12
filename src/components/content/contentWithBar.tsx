import React, { useMemo } from "react";
import "../css/globalColors.css";
import { ContentBar, ContentBarStyles, ContentBarStylesArray } from "./contentBar";
import { BasicContentbarWrapper } from "./basicContentbarWrapper";
import { CustomContentbarWrapper } from "./customContentbarWrapper";
import { ContentLayout, ContentLayoutAndStyleProps, ContentLayoutProps } from "./contentLayout";
import { ContentStyleStyles } from "./contentStyle";

export type ContentWithBarProps = {
  contentWrappers: BasicContentbarWrapper[] | CustomContentbarWrapper[];
  selectedId: string;
  addable?: boolean;
  jumpToEndOfContentBar?: boolean;
  onClickAddButton?: () => any;
  onClickLeftSlideButton?: () => any;
  onClickRightSlideButton?: () => any;
};

export type ContentLayoutAndStyleAndWithBarProps = ContentLayoutAndStyleProps & ContentWithBarProps;

export const ContentWithBar = (props: React.PropsWithChildren<ContentLayoutAndStyleAndWithBarProps>) => {
  const selectedContentWrapper = useMemo(() => {
    return props.contentWrappers.find(
      (currentWrapper) => currentWrapper.getId() === props.selectedId
    );
  }, [props.contentWrappers, props.selectedId]);

  const contentBarStyles = useMemo(() => {
    let tempContentbarStyles: ContentBarStylesArray = [];
    Object.values(ContentBarStyles).forEach(contentBarStyle => {
      if(props.contentStyle?.appliedStyles?.includes(contentBarStyle)) {
        tempContentbarStyles = [...tempContentbarStyles, contentBarStyle];
      }
    });
    return tempContentbarStyles;
  }, [props.contentStyle])

  return (
    <div
      className="flex flex-column"
      style={{ width: "100%", overflow: "auto" }}
    >
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
          applyAllStyles={props.contentStyle?.applyAllStyles}
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

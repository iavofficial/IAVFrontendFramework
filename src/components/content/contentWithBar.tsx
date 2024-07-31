import React, { useMemo } from "react";
import "../css/globalColors.css";
import { ContentBar } from "./contentBar";
import { BasicContentbarWrapper } from "./basicContentbarWrapper";
import { CustomContentbarWrapper } from "./customContentbarWrapper";
import { ContentLayout, ContentLayoutProps } from "./contentLayout";

export type Props = ContentLayoutProps & {
  contentWrappers: BasicContentbarWrapper[] | CustomContentbarWrapper[];
  selectedId: string;
  addable?: boolean;
  jumpToEndOfContentBar?: boolean;
  onClickAddButton?: () => any;
  onClickLeftSlideButton?: () => any;
  onClickRightSlideButton?: () => any;
};

export const ContentWithBar = (props: React.PropsWithChildren<Props>) => {
  const selectedContentWrapper = useMemo(() => {
    return props.contentWrappers.find(
      (currentWrapper) => currentWrapper.getId() === props.selectedId
    );
  }, [props.contentWrappers, props.selectedId]);

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
          disableStyling={!!props.disableStyling}
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
          disableStyling={!!props.disableStyling}
        >
          {selectedContentWrapper?.getContentAreaElement()}
        </ContentLayout>
      </div>
    </div>
  );
};

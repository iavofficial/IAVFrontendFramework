import React, { useMemo } from "react";
import "../css/globalColors.css";
import { ContentBar } from "./contentBar";
import { BasicContentbarWrapper } from "./basicContentbarWrapper";
import { CustomContentbarWrapper } from "./customContentbarWrapper";
import { ContentLayout, ContentLayoutProps } from "./contentLayout";

export type Props = ContentLayoutProps & {
  contentWrappers: BasicContentbarWrapper[] | CustomContentbarWrapper[];
  selectedId: string;
  setSelectedId?: (value: string) => void;
  onClose?: (value: string) => void;
  addable?: boolean;
  jumpToEnd?: boolean;
  onClickAddButton?: () => any;
  onClickLeftSlideButton?: () => any;
  onClickRightSlideButton?: () => any;
}

export const ContentWithBar = (props: React.PropsWithChildren<Props>) => {
  const selectedContentWrapper = useMemo(() => {
    /* TODO: Currently there is a bug in TypeScript which results in a TypeScript error if the find method
    is called on union types of arrays. Because of this you have to add "as any[]". This addittion should be removed
    in a future version.*/
    return (props.contentWrappers as any[]).find(
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
          onClose={props.onClose}
          setSelectedId={props.setSelectedId}
          onClickLeftSlideButton={props.onClickLeftSlideButton}
          onClickRightSlideButton={props.onClickRightSlideButton}
          onClickAddButton={props.onClickAddButton}
          addable={props.addable}
          jumpToEnd={props.jumpToEnd}
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
        <ContentLayout layoutBehaviour={props.layoutBehaviour} disableStyling={!!props.disableStyling}>
          {selectedContentWrapper?.getContentAreaElement()}
        </ContentLayout>
      </div>
    </div>
  );
};

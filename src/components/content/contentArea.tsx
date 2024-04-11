import React, { useContext, useMemo } from "react";
import "../css/globalColors.css";
import { ContentBar } from "./contentBar";
import { BasicContentbarWrapper } from "./basicContentbarWrapper";
import { CustomContentbarWrapper } from "./customContentbarWrapper";
import { ColorSettingsContext } from "../../contexts/colorsettings";
import { ContentLayout, LayoutBehaviour } from "./contentLayout";

export interface Props {
  contentWrappers: BasicContentbarWrapper[] | CustomContentbarWrapper[];
  selectedId: string;
  layoutBehaviour?: LayoutBehaviour;
  setSelectedId?: (value: string) => void;
  onClose?: (value: string) => void;
  addable?: boolean;
  jumpToEnd?: boolean;
  onClickAddButton?: () => any;
  onClickLeftSlideButton?: () => any;
  onClickRightSlideButton?: () => any;
}

export const ContentArea = (props: React.PropsWithChildren<Props>) => {
  const colorSettingsContext = useContext(ColorSettingsContext);

  const backgroundColor = colorSettingsContext.currentColors.contentArea.backgroundColor;

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
        />
      )}
      
      <div
        className={`w-full ${
          colorSettingsContext?.darkmode ? " bg-black" : " bg-grey-1"
        }`}
        style={{
          height: "100%",
          backgroundColor: backgroundColor,
          overflow: "auto",
        }}
      >
        {props.layoutBehaviour ? (
          <ContentLayout layoutBehaviour={props.layoutBehaviour}>
            {selectedContentWrapper?.getContentAreaElement()}
          </ContentLayout>
        ) : (
          selectedContentWrapper?.getContentAreaElement()
        )}
      </div>
    </div>
  );
};

import React, {useContext, useMemo} from "react";
import {BasicContentbarWrapper} from "./basicContentbarWrapper";
import {CustomContentbarWrapper} from "./customContentbarWrapper";
import {ContentLayout, ContentLayoutAndStyleProps} from "./contentLayout";
import {ContentBarStyles, ContentBarStylesArray} from "./contentBar";
import {ColorSettingsContext} from "@iavofficial/frontend-framework-shared/colorSettingsContext";
import {useModule} from "@iavofficial/frontend-framework-shared/moduleContext";
import {MandatoryModuleNames} from "@iavofficial/frontend-framework-shared/moduleNames";

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
  const colorSettingsContext = useContext(ColorSettingsContext);
  const ui = useModule(MandatoryModuleNames.UI);
  const ContentBarLayer = ui.UILayerContentBar;

  const contentAreaBackground =
    colorSettingsContext.currentColors.contentArea.backgroundColor;

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
    <div
      className="flex flex-column"
      style={{
        width: "100%",
        overflow: "auto",
        background: contentAreaBackground,
      }}
    >
      {props.contentWrappers.length >= 1 && ContentBarLayer && (
        <ContentBarLayer
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

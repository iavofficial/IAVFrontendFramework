import React, {useContext, useMemo} from "react";
import {
  ContentBar,
  ContentBarStyles,
  ContentBarStylesArray,
} from "@iavofficial/frontend-framework/contentBar";
import {ContentLayout} from "@iavofficial/frontend-framework/contentLayout";
import {UIContentWithBarProps} from "../../../../types/modules/ui/contentWithBar/contentWIthBarModuleInterfaces";
import {ColorSettingsContext} from "../../../../contexts/colorSettingsContext";

// UI layer component - can be replaced in another project to use different UI library (e.g., Ant Design)
export const UIContentWithBar: React.FC<UIContentWithBarProps> = (props) => {
  const colorSettingsContext = useContext(ColorSettingsContext);

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

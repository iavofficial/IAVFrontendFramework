import React from "react";
import {UIContentWithBar} from "./uiContentWithBar";
import {UIContentWithBarProps} from "../../../../types/modules/ui/contentWithBar/contentWIthBarModuleInterfaces";

export const ContentWithBarOrchestrator: React.FC<UIContentWithBarProps> = (
  props,
) => {
  return <UIContentWithBar {...props} />;
};

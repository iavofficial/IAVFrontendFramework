import React, {useState, useEffect} from "react";
import {UIContentWithBarProps} from "../../../../types/modules/ui/contentWithBar/contentWIthBarModuleInterfaces";
import {UIContentWithBar} from "./uiContentWithBar";

type ContentWithBarOrchestratorProps = Partial<UIContentWithBarProps> & {
  uiComponent?: React.ComponentType<UIContentWithBarProps>;
};

export const ContentWithBarOrchestrator: React.FC<
  ContentWithBarOrchestratorProps
> = ({uiComponent: CustomUI, contentWrappers = []}) => {
  const [selectedId, setSelectedId] = useState(
    contentWrappers[0]?.getId() || "",
  );
  const UI = CustomUI || UIContentWithBar;
  return (
    <UI
      contentWrappers={contentWrappers}
      selectedId={selectedId}
      onSelect={setSelectedId}
    />
  );
};

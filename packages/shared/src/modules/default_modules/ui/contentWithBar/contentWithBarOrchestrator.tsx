import React, {useState} from "react";
import {UIContentWithBarProps} from "../../../../types/modules/ui/contentWithBar/contentWIthBarModuleInterfaces";
import {UIContentWithBar} from "./uiContentWithBar";

type ContentWithBarOrchestratorProps = Partial<UIContentWithBarProps> & {
  uiComponent?: React.ComponentType<UIContentWithBarProps>;
};

export const ContentWithBarOrchestrator = (
  props: ContentWithBarOrchestratorProps,
) => {
  const {uiComponent: CustomUI} = props;

  const [selectedId, _] = useState<string>(
    props.contentWrappers ? props.contentWrappers[0]?.getId() : "" || "",
  );

  const UI: React.ComponentType<UIContentWithBarProps> =
    CustomUI ?? UIContentWithBar;

  return (
    <UI
      contentWrappers={props.contentWrappers || []}
      selectedId={selectedId}
      {...props}
    />
  );
};

import {
  ContentLayout,
  LayoutBehaviour,
} from "iav-frontend-framework/contentLayout";
import { ContentStyleTemplates } from "iav-frontend-framework/contentStyle";

export const ExampleComponent6 = () => {
  return (
    <ContentLayout
      layoutBehaviour={LayoutBehaviour.FLEX}
      contentStyle={{ appliedStyles: ContentStyleTemplates.DEFAULT }}
    >
      <div className="w-full" style={{ backgroundColor: "white" }}>
        Example component 6
      </div>
    </ContentLayout>
  );
};

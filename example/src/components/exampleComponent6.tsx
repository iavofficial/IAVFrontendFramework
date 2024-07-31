import { CellPaddings, ContentCell } from "iav-frontend-framework/contentCell";
import {
  ContentLayout,
  LayoutBehaviour,
} from "iav-frontend-framework/contentLayout";
import { useTranslator } from "iav-frontend-framework/translators";

export const ExampleComponent6 = () => {
  const t = useTranslator();

  return (
    <ContentLayout layoutBehaviour={LayoutBehaviour.FLEX}>
      <ContentCell colWidth={12} paddings={CellPaddings.FULL}></ContentCell>
    </ContentLayout>
  );
};

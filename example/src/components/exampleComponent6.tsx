import { CellPaddings, ContentCell } from "iav-frontend-framework/contentCell";
import {
  ContentLayout,
  LayoutBehaviour,
} from "iav-frontend-framework/contentLayout";
import { useTranslator } from "iav-frontend-framework/translators";

export const ExampleComponent6 = () => {
  const t = useTranslator();

  return (
    <ContentLayout layoutBehaviour={LayoutBehaviour.GRID}>
      <ContentCell colWidth={12} paddings={CellPaddings.FULL}>
        <h3>
          {" "}
          {t("Example_component_with_contentcell")}
          <br />
          {t("No_contentbar_elements")}
        </h3>
      </ContentCell>
    </ContentLayout>
  );
};

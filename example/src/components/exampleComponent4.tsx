import { WHITE } from "iav-frontend-framework/constants";
import { ContentStyle, ContentStyleTemplates } from "iav-frontend-framework/contentStyle";
import { useTranslator } from "iav-frontend-framework/translators";

export const ExampleComponent4 = () => {
  const t = useTranslator();
  return (
    <ContentStyle appliedStyles={ContentStyleTemplates.DEFAULT}>
      <div
        style={{
          height: "100%",
          width: "100%",
          backgroundColor: WHITE,
        }}
      >
        <span>{t("basic_div_tag_with_text")}</span>
      </div>
    </ContentStyle>
  );
};

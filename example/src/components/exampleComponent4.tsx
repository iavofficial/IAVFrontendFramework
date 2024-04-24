import { WHITE } from "iav-frontend-framework/constants";
import { ContentStyle } from "iav-frontend-framework/contentStyle";
import { useTranslator } from "iav-frontend-framework/translators";

export const ExampleComponent4 = () => {
  const t = useTranslator();
  return (
    <ContentStyle>
      <div
        style={{
          height: "80px",
          width: "200px",
          backgroundColor: WHITE,
        }}
      >
        <span>{t("basic_div_tag_with_text")}</span>
      </div>
    </ContentStyle>
  );
};

import { AuthContext } from "iav-frontend-framework/auth";
import { CellPaddings, ContentCell } from "iav-frontend-framework/contentCell";
import {
  ContentLayout,
  LayoutBehaviour,
} from "iav-frontend-framework/contentLayout";
import { useTranslator } from "iav-frontend-framework/translators";
import { useContext, useEffect } from "react";

export const ExampleComponent6 = () => {
  const t = useTranslator();
  const auth = useContext(AuthContext);

  useEffect(() => {
    console.log("triggerd");

    testFunction();
  }, []);

  const testFunction = async () => {
    let response = await auth?.fetchAuthed(
      "https://av1wsatvsh.execute-api.eu-central-1.amazonaws.com/dev/test/",
      auth.getUserData().idToken
    );

    let responseAsJSON = await response?.json();
    console.log("hier dein response: ", responseAsJSON);
  };
  return (
    <ContentLayout layoutBehaviour={LayoutBehaviour.GRID}>
      <ContentCell colWidth={12} paddings={CellPaddings.FULL}>
        <button onClick={testFunction}>test</button>
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

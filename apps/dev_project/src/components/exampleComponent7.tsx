import { ContentStyle, ContentStyleTemplates } from "@iavofficial/frontend-framework/contentStyle";
import { useDefaultSelector } from "@iavofficial/frontend-framework/store";

export const ExampleComponent7 = () => {
  const { hasAuthenticated } = useDefaultSelector((state) => state.auth);

  console.log(hasAuthenticated);

  return (
    <ContentStyle appliedStyles={ContentStyleTemplates.DEFAULT}>
              <div>State of authentication: {hasAuthenticated.toString()}</div>
    </ContentStyle>
  );
};

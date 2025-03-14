import Page from "../../../common/page/page";
import { ModuleProfile } from "../../../common/page/text/moduleProfile";
import Text from "../../../common/page/text/text";
import Title from "../../../common/page/text/title";

export const ReactRouterRouter = () => (
  <Page>
    <Title>ReactRouterRouter</Title>
    <ModuleProfile
      moduleKey="router"
      isDefaultModule
      shortDescription="This module provides routing functionality using React Router."
    />
    <Text>
      Since this module is the default Router module it provides exactly the
      functionality described on the page for the general structure.
    </Text>
  </Page>
);

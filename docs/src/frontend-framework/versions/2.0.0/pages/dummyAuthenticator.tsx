import Page from "../../../common/page/page";
import { ModuleProfile } from "../../../common/page/text/moduleProfile";
import Title from "../../../common/page/text/title";
import Text from "../../../common/page/text/text";

const DESCRIPTION = `The DummyAuthenticator module is a place holder for real
authentication. By using this default implementation you can begin developing
your application while you don't have to provide an authentication implementation
from the start. This is useful for presentations early in the project as the user
still has to authenticate and thus creating the impression of how the interaction
will be designed later on.`;

export const DummyAuthenticator = () => {
  return (
    <Page>
      <Title>DummyAuthenticator</Title>
      <ModuleProfile
        moduleKey="auth"
        isDefaultModule
        shortDescription={DESCRIPTION}
      />
      <Text>
        Hint: This module provides only the necessary state values and methods.
      </Text>
    </Page>
  );
};

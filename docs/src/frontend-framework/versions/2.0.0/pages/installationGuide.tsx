import React from "react";
import Page from "../../../common/page/page.tsx";
import Title from "../../../common/page/text/title.tsx";
import Code from "../../../common/page/utils/code.tsx";
import SubTitle from "../../../common/page/text/subTitle.tsx";
import Text from "../../../common/page/text/text.tsx";

const InstallationGuide: React.FC = () => {
  return (
    <Page>
      <Title>Installation Guide</Title>
      <Code title={"npm install"} language={"bash"}>
        npm install @iavofficial/frontend-framework
      </Code>
      <SubTitle>Add the framework to a new React application</SubTitle>
      <Text>
        If you want to add the framework by creating a new React app with
        "create-react-app" or using "vite", it works too. Just paste the
        following code snippets into the "App.tsx" file.
      </Text>
      <Text>
        <strong>NOTE:</strong> If you use "vite" to create a new React app, the
        webview may look broken. After clearing the "index.css" file, the
        problem is solved.
      </Text>
      <Code title={"Code Snippet App.tsx"} language={"typescript"}>
        {`import { GlobalDataLayer } from '@iavofficial/frontend-framework/globalDataLayer';
import { UILayer } from '@iavofficial/frontend-framework/uiLayer';
import {
  createModules,
  StoreBuilder,
} from "@iavofficial/frontend-framework/store";

export const modules = createModules();
export const store = new StoreBuilder(modules.storeModules).build();

const App: React.FC = () => {
    return (
        <GlobalDataLayer
            modules={modules}
            store={store}
        >
            <UILayer startingPoint="/" tabAndContentWrappers={[]}/>
        </GlobalDataLayer>
    );
}

export default App;
`}
      </Code>
    </Page>
  );
};

export default InstallationGuide;

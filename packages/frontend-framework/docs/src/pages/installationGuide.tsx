import React from "react";
import Page from "../components/page/page.tsx";
import Title from "../components/page/text/title.tsx";
import SubSubTitle from "../components/page/text/subSubTitle.tsx";
import Code from "../components/page/utils/code.tsx";
import SubTitle from "../components/page/text/subTitle.tsx";
import Typography from "../components/page/utils/typography.tsx";

const InstallationGuide: React.FC = () => {

    return (
        <Page>
            <Title>Installation Guide</Title>
            <SubSubTitle>npm install</SubSubTitle>
            <Code language={"bash"}>
                npm install @iavofficial/frontend-framework
            </Code>
            <SubTitle>Add the framework to a new React application</SubTitle>
            <Typography variant={"p"}>
                If you want to add the framework by creating a new React app with "create-react-app" or using "vite", it
                works too. Just paste the following code snippets into the "App.tsx" file.
            </Typography>
            <Typography variant={"p"}>
                <strong>NOTE:</strong> If you use "vite" to create a new React
                app, the webview may look broken. After clearing the
                "index.css" file, the problem is solved.
            </Typography>
            <SubSubTitle>Code Snippet App.tsx</SubSubTitle>
            <Code language={"typescript"}>
                {`import { GlobalDataLayer } from '@iavofficial/frontend-framework/globalDataLayer';
import { UILayer } from '@iavofficial/frontend-framework/uiLayer';

const App: React.FC = () => {
    return (
        <GlobalDataLayer>
            <UILayer startingPoint="/" tabAndContentWrappers={[]}/>
        </GlobalDataLayer>
    );
}

export default App;
`}
            </Code>
            <SubTitle>Using AWS Amplify</SubTitle>
            <Typography variant={"p"}>
                The IAV Frontend Framework is compatible with AWS Amplify, but you need to
                install it separately. You have to install at least the version
                "aws-amplify@^6.5.2".
            </Typography>
            <Code language={"bash"}>
                npm install aws-amplify
            </Code>
        </Page>
    )
};

export default InstallationGuide;
import React from "react";
import Page from "../../../common/page/page.tsx";
import Title from "../../../common/page/text/title.tsx";
import Code from "../../../common/page/utils/code.tsx";
import Text from "../../../common/page/text/text.tsx";

const ExampleProject: React.FC = () => {

    return (
        <Page>
            <Title>Starting the Example Project</Title>
            <Text>
                The framework&#39;s repository contains an example project which is used
                for development purposes and to present a basic example for framework
                usage. If you want to start the example project, first you have to clone
                the framework&#39;s repository.
            </Text>
            <Text>
                You can start the example project by executing the command inside the
                repository&#39;s root folder.
            </Text>
            <Code language={"bash"}>{`npm run run-example`}</Code>
            <Text>
                The example project does not use a pulled version of the framework.
                Instead it uses a locally build version of the framework. The mentioned
                command triggers a new build of the framework and starts the example
                project using this build. However, changes you make to the framework
                itself won&#39;t have any effect since the build is just executed once. If
                you want to play with the framework and see the consequences of your
                changes in the example project this page is of interest for you.
            </Text>
        </Page>
    )
};

export default ExampleProject;
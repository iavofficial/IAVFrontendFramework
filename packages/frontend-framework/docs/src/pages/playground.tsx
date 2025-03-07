import React from "react";
import Page from "../components/page/page.tsx";
import SubTitle from "../components/page/text/subTitle.tsx";
import SubSubTitle from "../components/page/text/subSubTitle.tsx";
import Code from "../components/page/utils/code.tsx";
import Text from "../components/page/text/text.tsx";

const Playground: React.FC = () => {

    return (
        <Page>
            <SubTitle>Cloning the Repository</SubTitle>
            <Text>
                If you want to play with the framework and the contained example project,
                you have to clone the framework&#39;s Git repository first.
            </Text>
            <SubTitle>The Example Project</SubTitle>
            <Text>
                As mentioned, the repository contains the framework and an example
                project. As the framework isn&#39;t a UI by itself, you cannot see the
                consequences of framework changes without a project using the framework.
                This is where the example project comes into use. The example project uses
                the locally built framework as a file dependency in order to visualize the
                consequences of framework changes.
            </Text>
            <SubSubTitle>Setting Up and Running the Example Project</SubSubTitle>
            <Text>
                To start the example project you have to execute npm run setup_and_build
                inside the root folder of the <strong>repository</strong>. This will setup
                the environment and start the development server at port 3000.
            </Text>
            <SubSubTitle>Making Real-Time Changes to the Framework</SubSubTitle>
            <Text>
                If you want to make changes to the framework and see the consequences of
                these changes in real time you have to execute the following steps by
                yourself
            </Text>
            <Code language={"bash"}>npm run dev</Code>
        </Page>
    )
};

export default Playground;
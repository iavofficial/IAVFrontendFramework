import React from "react";
import Page from "../components/page/page.tsx";
import SubTitle from "../components/page/text/subTitle.tsx";
import Typography from "../components/page/utils/typography.tsx";
import SubSubTitle from "../components/page/text/subSubTitle.tsx";
import Code from "../components/page/utils/code.tsx";

const Playground: React.FC = () => {

    return (
        <Page>
            <SubTitle>Cloning the Repository</SubTitle>
            <Typography variant={"p"}>
                If you want to play with the framework and the contained example project,
                you have to clone the framework&#39;s Git repository first.
            </Typography>
            <SubTitle>The Example Project</SubTitle>
            <Typography variant={"p"}>
                As mentioned, the repository contains the framework and an example
                project. As the framework isn&#39;t a UI by itself, you cannot see the
                consequences of framework changes without a project using the framework.
                This is where the example project comes into use. The example project uses
                the locally built framework as a file dependency in order to visualize the
                consequences of framework changes.
            </Typography>
            <SubSubTitle>Setting Up and Running the Example Project</SubSubTitle>
            <Typography variant={"p"}>
                To start the example project you have to execute npm run setup_and_build
                inside the root folder of the <strong>repository</strong>. This will setup
                the environment and start the development server at port 3000.
            </Typography>
            <SubSubTitle>Making Real-Time Changes to the Framework</SubSubTitle>
            <Typography variant={"p"}>
                If you want to make changes to the framework and see the consequences of
                these changes in real time you have to execute the following steps by
                yourself
            </Typography>
            <Code language={"bash"}>npm run dev</Code>
        </Page>
    )
};

export default Playground;
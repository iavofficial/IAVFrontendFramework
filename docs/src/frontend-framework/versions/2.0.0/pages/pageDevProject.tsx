import React from "react";
import Page from "../../../common/page/page.tsx";
import Title from "../../../common/page/text/title.tsx";
import Code from "../../../common/page/utils/code.tsx";
import Text from "../../../common/page/text/text.tsx";

const PageDevProject: React.FC = () => {
    return (
        <Page>
            <Title>Starting the Development Project</Title>
            <Text>
                The framework&#39;s repository contains a development project which is
                used to observe the effects of changes to the Framework during
                development. Since the Framework's repository is a monorepo using the
                Turborepo management tool, you can build the framework and start the
                development project by executing the following command inside the root
                folder of the repository.
            </Text>
            <Code language={"bash"}>{`npm run dev`}</Code>
            <Text>
                After a certain time which is required for building you can access the
                development application in your web browser. You can now change the
                development application or the Framework itself to build up deeper
                knowledge.
            </Text>
        </Page>
    );
};

export default PageDevProject;

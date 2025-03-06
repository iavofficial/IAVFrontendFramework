import React from "react";
import Page from "../components/page/page.tsx";
import Title from "../components/page/text/title.tsx";
import Typography from "../components/page/utils/typography.tsx";
import SubTitle from "../components/page/text/subTitle.tsx";
import PageLink from "../components/page/text/pageLink.tsx";

const FAQ: React.FC = () => {

    return (
        <Page>
            <Title>FAQ</Title>
            <Typography variant={"p"}>
                This page lists common questions and problems and links corresponding
                issues.
            </Typography>
            <SubTitle>
                Problems using the SVG format as React Component with Vite
            </SubTitle>
            <Typography variant={"p"}>
                In a few scenarios, the framework requires the use of SVG Files (e.g.,
                Icons). To be able to set the color of the SVG inside the Framework, the
                Icons must be imported as React Components.
            </Typography>
            <Typography variant={"p"}>
                Use the following steps to solve issues regarding the SVG import as React
                Components:
            </Typography>
            <Typography variant={"p"}>
                Install the vite-plugin-svgr with the command "npm i vite-plugin-svgr" and
                configure it as shown <PageLink label={"here"} to={"https://www.npmjs.com/package/vite-plugin-svgr"}/>.
                If this
                doesn’t help, further possible solutions can be found <PageLink
                to={"https://stackoverflow.com/questions/74720726/type-definition-for-vite-plugin-svgr"}
                label={"here"}/>.
            </Typography>
            <SubTitle>Can the IAV Frontend Framework be used with Angular?</SubTitle>
            <Typography variant={"p"}>
                No, the IAV Frontend Framework only supports React Components and is
                therefore only suitable for React-based projects.
            </Typography>
        </Page>
    )
};

export default FAQ;
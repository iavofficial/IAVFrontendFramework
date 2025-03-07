import React from "react";
import Page from "../components/page/page.tsx";
import Title from "../components/page/text/title.tsx";
import SubTitle from "../components/page/text/subTitle.tsx";
import Table from "../components/page/utils/table.tsx";
import BulletList from "../components/page/text/bulletList.tsx";
import PageLink from "../components/page/text/pageLink.tsx";
import Image from "../components/page/utils/image.tsx";
import Text from "../components/page/text/text.tsx";

const Overview: React.FC = () => {

    const tableData = [
        {
            key: "Key dependencies",
            value: "React 18, ReactDOM 18, Typescript 5, AWS Amplify 6",
        },
        {
            key: "UI-Component libraries",
            value: "PrimeReact, PrimeIcons",
        },
        {
            key: "Requirements",
            value: "At least npm version 8 and node version 16",
        },
    ];

    return (
        <Page>
            <Title>Quick Overview</Title>
            <Text>
                The IAV Frontend Framework enhances the development and maintenance of
                multiple frontend applications by centralizing key functionalities. It
                tackles common issues like maintainability and extendability, while
                minimizing the risk of errors through consistent, reusable components.
                Built with React, TypeScript, and AWS Amplify, it allows for rapid
                deployment of updates across projects. Key features include AWS Cognito
                authentication, internationalization, customizable themes, and the ability
                to integrate different corporate designs. By leveraging GitHub for version
                control and collaboration, developers benefit from streamlined workflows,
                centralized support, and reduced redundancy across projects.
            </Text>
            <Text>
                This is the official documentation of the IAV frontend framework. The job
                of the framework is to make your life way <strong>easier</strong>. It
                achieves maintainability, extendability, a lower risk of faults, and a
                greater developer experience by generalization. You want to maximize the
                speed of your development process? Just have a look.
            </Text>
            <Title>Overview</Title>
            <SubTitle>Technical Overview</SubTitle>
            <Table data={tableData}/>
            <SubTitle>Key features</SubTitle>
            <BulletList
                bulletType="bullet"
                items={[
                    "Standardized frontend layout (see more in the following general layout section)",
                    "Authentication service for AWS Cognito (other authentication services are possible)",
                    "Authorization with AWS",
                    "Default cookie banner",
                    "IAV corporate design",
                    "Internationalization (different languages can be configured)",
                    "Navigation bar and \"content bar\" to navigate inside a navigation entry",
                    "Individual coloring of components possible",
                    "Dark mode",
                    "Pre-created components for different use cases",
                    "Cookie banner for accepting the use of cookies",
                ]}
            />
            <SubTitle>
                Ongoing Maintenance and Support
            </SubTitle>
            <Text>
                We manage bug reports and support requests through <PageLink
                to={"https://github.com/iavofficial/IAVFrontendFramework/issues"}
                label={"GitHub Issues"}
                target={"_blank"}/>.
                For more details on how to contribute, please read our <PageLink
                to={"https://github.com/iavofficial/IAVFrontendFramework/blob/main/CONTRIBUTING.md"}
                label={"Contributing Guidelines"}
                target={"_blank"}/>.
            </Text>

            <SubTitle>Layout</SubTitle>

            <Image alt="Login" src="assets/index/login.png"/>

            <Image alt="Menu" src="assets/index/menu.png"/>
        </Page>
    )
};

export default Overview;
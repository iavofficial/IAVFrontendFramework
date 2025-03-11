import React from "react";
import Page from "../../../common/page/page.tsx";
import Title from "../../../common/page/text/title.tsx";
import SubTitle from "../../../common/page/text/subTitle.tsx";
import Code from "../../../common/page/utils/code.tsx";
import Text from "../../../common/page/text/text.tsx";

const Interface: React.FC = () => {

    return (
        <Page>
            <Title>Main Components</Title>
            <Text>
                The framework's main interfaces are the components <code>GlobalDataLayer</code> and <code>UILayer</code>.
                <code>GlobalDataLayer</code> contains all React contexts of the framework
                to share data across the whole component tree. The
                <code>UILayer</code> component contains the components which actually
                render the UI.
            </Text>
            <Text>
                The reason for the separation into two layers can be understood by the
                following example: Imagine developing a React context which needs the
                authentication information. The authentication information is stored
                inside the <code>GlobalDataLayer</code>. Where to put your React context's
                provider? To pass your context to the <code>UILayer</code> and then
                rendering the Provider seems inappropriate. Instead, you put the Provider
                between the <code>GlobalDataLayer</code> and
                <code>UILayer</code> yourself. By doing this, your React context has
                access to all the framework's contexts, and the <code>UILayer</code>
                additionally has access to your context.
            </Text>
            <SubTitle>An example for this situation</SubTitle>
            <Code language={"typescript"}>
                {`return (
// If you don't want to use the default authentication provider, you would have to render another authentication provider at this position. Authentication providers will be explained later on.
    <GlobalDataLayer ...properties...>
    // Your react contexts go here.
        <UILayer ...properties... />
    </GlobalDataLayer>
);
`}

            </Code>
        </Page>
    )
};

export default Interface;
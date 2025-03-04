import React from "react";
import Title from "../components/page/text/title.tsx";
import SubTitle from "../components/page/text/subTitle.tsx";
import Page from "../components/page/page.tsx";
import Typography from "../components/page/utils/typography.tsx";
import BulletList from "../components/page/text/bulletList.tsx";
import Image from "../components/page/utils/image.tsx";
import Code from "../components/page/utils/code.tsx";

const Information: React.FC = () => {

    const bulletList = [
        "Go to Project overview.",
        "Click the drop-down Watch.",
        "Select Custom.",
        "Tick \"Release\" and hit Apply."
    ]

    return (
        <Page>
            <Title>Important Information</Title>
            <SubTitle>Disclaimer</SubTitle>
            <Typography variant={"p"}>
                The Framework simplifies the development for the project using it. It does
                not substitute the basic knowledge of the large field of frontend
                development.
            </Typography>
            <SubTitle>Compatibility</SubTitle>
            <Typography variant={"p"}>
                Please ensure that you have at least installed Node version 16 and npm
                version 8.
            </Typography>
            <SubTitle>Subscribe to New Updates</SubTitle>
            <Typography variant={"p"}>
                Every time a new version is released, a GitHub release will be created. To
                receive an email notification for a new release, subscribe to the GitHub
                repository:
            </Typography>
            <BulletList items={bulletList} showBullets={true}/>
            <SubTitle>TypeScript</SubTitle>
            <Typography variant={"p"}>
                The framework supports JavaScript and TypeScript. It is recommended to use
                TypeScript for type safety, which will greatly enhance your developer
                experience and development speed, especially for larger projects. One
                significant advantage of using TypeScript is the automatic checks for the
                definition of all mandatory properties of components.
            </Typography>
            <SubTitle>Imports</SubTitle>
            <Typography variant={"p"}>
                The framework uses ES6 import/export syntax. There are only named exports.
                The following snippet shows an example of an import using the framework:
            </Typography>
            <Code language="javascript">
                {`import { UILayer } from "@iavofficial/frontend-framework/uiLayer";`}
            </Code>
            <SubTitle>Support for class and function based components</SubTitle>
            <Typography variant={"p"}>
                The framework can be used with React functional components as well as with
                React class components.
            </Typography>
            <SubTitle>Cookies</SubTitle>
            <Typography variant={"p"}>
                The framework adds a banner for accepting the use of cookies out of the
                box. The banner is needed in web applications in order to be consistent
                with legal regulations. If the user accepts the use of cookies, the banner
                won't be rendered again.
            </Typography>
            <SubTitle>Layout of an application using the IAV frontend framework</SubTitle>
            <Typography variant={"p"}>
                The following image explains the terminology used in this documentation.
            </Typography>
            <Image src={"assets/information/terminology-definition.png"}/>
            <Typography variant={"p"}>
                The following image show the appearance of the framework when the dark
                mode is activated.
            </Typography>
            <Image src={"assets/information/iav-frontend-framework-darkmode.png"}/>
            <SubTitle>Official IAV-Colors</SubTitle>
            <Typography variant={"p"}>
                The following image shows the standardized color spectrum of IAV.
            </Typography>
            <Image src={"assets/information/styleguide.png"}/>
            <SubTitle>Styleguide</SubTitle>
            <Typography variant={"p"}>
                The following image shows the style guide which is based on the IAV
                corporate design colors and the extension.
            </Typography>
            <Image src={"assets/information/styleguide-additional-info.png"}/>
        </Page>


    )
};

export default Information;
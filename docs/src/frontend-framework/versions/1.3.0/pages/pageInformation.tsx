/**
 * Copyright © 2025 IAV GmbH Ingenieurgesellschaft Auto und Verkehr, All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import Title from "../../../common/page/text/title.tsx";
import SubTitle from "../../../common/page/text/subTitle.tsx";
import Page from "../../../common/page/page.tsx";
import BulletList from "../../../common/page/text/bulletList.tsx";
import Image from "../../../common/page/utils/image.tsx";
import Code from "../../../common/page/utils/code.tsx";
import Text from "../../../common/page/text/text.tsx";

const PageInformation: React.FC = () => {

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
            <Text>
                The Framework simplifies the development for the project using it. It does
                not substitute the basic knowledge of the large field of frontend
                development.
            </Text>
            <SubTitle>Compatibility</SubTitle>
            <Text>
                Please ensure that you have at least installed Node version 16 and npm
                version 8.
            </Text>
            <SubTitle>Subscribe to New Updates</SubTitle>
            <Text>
                Every time a new version is released, a GitHub release will be created. To
                receive an email notification for a new release, subscribe to the GitHub
                repository:
            </Text>
            <BulletList items={bulletList} bulletType={"bullet"}/>
            <SubTitle>TypeScript</SubTitle>
            <Text>
                The framework supports JavaScript and TypeScript. It is recommended to use
                TypeScript for type safety, which will greatly enhance your developer
                experience and development speed, especially for larger projects. One
                significant advantage of using TypeScript is the automatic checks for the
                definition of all mandatory properties of components.
            </Text>
            <SubTitle>Imports</SubTitle>
            <Text>
                The framework uses ES6 import/export syntax. There are only named exports.
                The following snippet shows an example of an import using the framework:
            </Text>
            <Code language="javascript">
                {`import { UILayer } from "@iavofficial/frontend-framework/uiLayer";`}
            </Code>
            <SubTitle>Support for class and function based components</SubTitle>
            <Text>
                The framework can be used with React functional components as well as with
                React class components.
            </Text>
            <SubTitle>Cookies</SubTitle>
            <Text>
                The framework adds a banner for accepting the use of cookies out of the
                box. The banner is needed in web applications in order to be consistent
                with legal regulations. If the user accepts the use of cookies, the banner
                won't be rendered again.
            </Text>
            <SubTitle>Layout of an application using the IAV frontend framework</SubTitle>
            <Text>
                The following image explains the terminology used in this documentation.
            </Text>
            <Image src={"assets/information/terminology-definition.png"} fromGhPages/>
            <Text>
                The following image show the appearance of the framework when the dark
                mode is activated.
            </Text>
            <Image src={"assets/information/iav-frontend-framework-darkmode.png"} fromGhPages/>
            <SubTitle>Official IAV-Colors</SubTitle>
            <Text>
                The following image shows the standardized color spectrum of IAV.
            </Text>
            <Image src={"assets/information/styleguide.png"} fromGhPages/>
            <SubTitle>Styleguide</SubTitle>
            <Text>
                The following image shows the style guide which is based on the IAV
                corporate design colors and the extension.
            </Text>
            <Image src={"assets/information/styleguide-additional-info.png"} fromGhPages/>
        </Page>


    )
};

export default PageInformation;
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
import Page from "../../../common/page/page.tsx";
import Title from "../../../common/page/text/title.tsx";
import SubTitle from "../../../common/page/text/subTitle.tsx";
import PageLink from "../../../common/page/text/pageLink.tsx";
import Text from "../../../common/page/text/text.tsx";

const FAQ: React.FC = () => {

    return (
        <Page>
            <Title>FAQ</Title>
            <Text>
                This page lists common questions and problems and links corresponding
                issues.
            </Text>
            <SubTitle>
                Problems using the SVG format as React Component with Vite
            </SubTitle>
            <Text>
                In a few scenarios, the framework requires the use of SVG Files (e.g.,
                Icons). To be able to set the color of the SVG inside the Framework, the
                Icons must be imported as React Components.
            </Text>
            <Text>
                Use the following steps to solve issues regarding the SVG import as React
                Components:
            </Text>
            <Text>
                Install the vite-plugin-svgr with the command "npm i vite-plugin-svgr" and
                configure it as shown <PageLink label={"here"} to={"https://www.npmjs.com/package/vite-plugin-svgr"}/>.
                If this
                doesn’t help, further possible solutions can be found <PageLink
                to={"https://stackoverflow.com/questions/74720726/type-definition-for-vite-plugin-svgr"}
                label={"here"}/>.
            </Text>
            <SubTitle>Can the IAV Frontend Framework be used with Angular?</SubTitle>
            <Text>
                No, the IAV Frontend Framework only supports React Components and is
                therefore only suitable for React-based projects.
            </Text>
        </Page>
    )
};

export default FAQ;
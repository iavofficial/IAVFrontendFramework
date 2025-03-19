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
import Code from "../../../common/page/utils/code.tsx";
import SubTitle from "../../../common/page/text/subTitle.tsx";
import Text from "../../../common/page/text/text.tsx";

const PageInstallationGuide: React.FC = () => {
    return (
        <Page>
            <Title>Installation Guide</Title>
            <Code title={"npm install"} language={"bash"}>
                npm install @iavofficial/frontend-framework
            </Code>
            <SubTitle>Add the framework to a new React application</SubTitle>
            <Text>
                If you want to add the framework by creating a new React app with
                "create-react-app" or using "vite", it works too. Just paste the
                following code snippets into the "App.tsx" file.
            </Text>
            <Text>
                <strong>NOTE:</strong> If you use "vite" to create a new React app, the
                webview may look broken. After clearing the "index.css" file, the
                problem is solved.
            </Text>
            <Code title={"Code Snippet App.tsx"} language={"typescript"}>
                {`import { GlobalDataLayer } from '@iavofficial/frontend-framework/globalDataLayer';
import { UILayer } from '@iavofficial/frontend-framework/uiLayer';
import {
  createModules,
  StoreBuilder,
} from "@iavofficial/frontend-framework/store";

export const modules = createModules();
export const store = new StoreBuilder(modules.storeModules).build();

const App: React.FC = () => {
    return (
        <GlobalDataLayer
            modules={modules}
            store={store}
        >
            <UILayer startingPoint="/" tabAndContentWrappers={[]}/>
        </GlobalDataLayer>
    );
}

export default App;
`}
            </Code>
        </Page>
    );
};

export default PageInstallationGuide;

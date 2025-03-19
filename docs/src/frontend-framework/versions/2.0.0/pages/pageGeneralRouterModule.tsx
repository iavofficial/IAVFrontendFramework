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

import Page from "../../../common/page/page";
import {
    MODULE_COMPONENT_TABLE_COLUMNS,
    MODULE_METHOD_TABLE_COLUMNS,
} from "../../../common/page/text/module/moduleTableColumns";
import SubTitle from "../../../common/page/text/subTitle";
import Text from "../../../common/page/text/text";
import Title from "../../../common/page/text/title";
import Code from "../../../common/page/utils/code";
import Table from "../../../common/page/utils/table";

export const PageGeneralRouterModule = () => (
    <Page>
        <Title>General structure of a router module</Title>
        <Text>
            This page describes the general structure of a router module. Since the
            default router module has no global state there is no necessary state.
        </Text>
        <SubTitle>Necessary components</SubTitle>
        <Text>
            A router module has to provide the following components. For more
            information consult the types and default implementation inside the{" "}
            package <i>shared</i>.
        </Text>
        <Table
            columns={MODULE_COMPONENT_TABLE_COLUMNS}
            data={[
                {
                    name: "UiLayerRouter",
                    component_type: CodeUiLayerRouterType,
                    description: `This component gets rendered inside the UILayer and has
          to implement the routing for the passed parameters.`,
                },
                {
                    name: "MainViewRouter",
                    component_type: CodeMainViewRouterType,
                    description: `This component gets rendered inside the MainView component
          and has to implement the routing for the passed routes.`,
                },
                {
                    name: "Link",
                    component_type: CodeLinkType,
                    description: `This component has to trigger a "load" of the passed
          link. Optionally a target like "_blank" can be passed.`,
                },
            ]}
        />

        <SubTitle>Necessary methods</SubTitle>
        <Table
            columns={MODULE_METHOD_TABLE_COLUMNS}
            data={[
                {
                    name: "useLocation",
                    type: CodeUseLocationType,
                    description: `This Hook has to return the current location as a string
          (inside an object).`,
                },
                {
                    name: "useIsTabActive",
                    type: CodeUseIsActiveType,
                    description: `This Hook has to return if the tab corresponding to the
          path is active (inside an object).`,
                },
            ]}
        />

        <SubTitle>Other important types</SubTitle>
        <Code language="typescript">{`export type BasicRoute = {
  path: string;
  element: ReactElement;
  disabled?: boolean;
  key?: string;
} & Record<string, unknown>;`}</Code>
    </Page>
);

const CodeUiLayerRouterType = (
    <Code language="typescript" center>{`React.ComponentType<{
      routes: BasicRoute[];
      initialPath: string;
      disableLogin: boolean;
  }>`}</Code>
);
const CodeMainViewRouterType = (
    <Code language="typescript" center>{`React.ComponentType<{
      routes: BasicRoute[];
  }>`}</Code>
);
const CodeLinkType = (
    <Code language="typescript" center>{`React.ComponentType<
      PropsWithChildren<
          {
              to: string;
              style: Record<string, unknown>;
              target?: string;
          } & Record<string, unknown>;
      >
  >`}</Code>
);

const CodeUseLocationType = (
    <Code language="typescript" center>{`() => {pathName: string}`}</Code>
);

const CodeUseIsActiveType = (
    <Code language="typescript" center>{`(tabPath: string) => {isActive: boolean}`}</Code>
);

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
import Title from "../../../common/page/text/title";
import Text from "../../../common/page/text/text";
import SubTitle from "../../../common/page/text/subTitle";
import Table from "../../../common/page/utils/table";
import {
    MODULE_STATE_TABLE_COLUMNS,
    MODULE_THUNKS_TABLE_COLUMNS,
} from "../../../common/page/text/module/moduleTableColumns";
import Code from "../../../common/page/utils/code";
import React from "react";

const PageGeneralAuthModule: React.FC = () => {
    const CodeFetchAuthedParams = (
        <Code
            language="typescript"
            center
        >{`{url: string; settings?: object}`}</Code>
    );
    const CodeLoginParams = (
        <Code language="typescript" center>{`{credentials: Credentials}`}</Code>
    );
    const CodeLogoutParams = (
        <Code language="typescript" center>{`{error?: unknown} | undefined`}</Code>
    );

    return (
        <Page>
            <Title>General structure of an authentication module</Title>
            <Text>
                This page describes the general structure of an authentication module.
                Every authentication module has to provide the listed state values and
                methods.
            </Text>

            <SubTitle>Necessary state</SubTitle>
            <Table
                columns={MODULE_STATE_TABLE_COLUMNS}
                data={[
                    {
                        name: "hasAuthenticated",
                        type: "boolean",
                        description: "Defines whether the user is authenticated.",
                    },
                    {
                        name: "isLoading",
                        type: "boolean",
                        description: `Defines whether the authentication process is ongoing.
            (This is a dummy since no real authentication is done.)`,
                    },
                    {
                        name: "userData",
                        type: "UserData | undefined",
                        description: `Contains the user information (for this module only the
            user name) when signed in.`,
                    },
                ]}
            />

            <SubTitle>Necessary Thunks (methods)</SubTitle>
            <Table
                columns={MODULE_THUNKS_TABLE_COLUMNS}
                data={[
                    {
                        name: "fetchAuthed",
                        parameters: CodeFetchAuthedParams,
                        return_type: "Response (from fetch API)",
                        description: `This method should execute a fetch and retry if it fails
            (for example because of a need for token refresh.)`,
                    },
                    {
                        name: "login",
                        parameters: CodeLoginParams,
                        return_type: "void",
                        description: `This method should execute a login process based on the
            passed credentials.`,
                    },
                    {
                        name: "logout",
                        parameters: CodeLogoutParams,
                        return_type: "void",
                        description: `This method should execute the logout process.`,
                    },
                ]}
            />
        </Page>
    );
};

export default PageGeneralAuthModule;

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
 **/

import React from "react";
import Page from "../../../common/page/page.tsx";
import Title from "../../../common/page/text/title.tsx";
import SubTitle from "../../../common/page/text/subTitle.tsx";
import Text from "../../../common/page/text/text.tsx";
import Table, {TableData} from "../../../common/page/utils/table.tsx";
import Code from "../../../common/page/utils/code.tsx";

const GeneralAuthModule: React.FC = () => {

    const moduleStateTableColumns = [
        {key: "variableName", title: "Variable Name"},
        {key: "type", title: "Type"},
        {key: "description", title: "Description"},
    ] as const;

    const moduleStateTableData: TableData<typeof moduleStateTableColumns> = [
        {
            variableName: "hasAuthenticated",
            type: "boolean",
            description: "Defines whether the user is authenticated.",
        },
        {
            variableName: "isLoading",
            type: "boolean",
            description: `Defines whether the authentication process is ongoing.
         (This is a dummy since no real authentication is done.)`,
        },
        {
            variableName: "userData",
            type: "UserData | undefined",
            description: `Contains the user information (for this module only the
         user name) when signed in.`,
        },
    ];


    const CodeFetchAuthedParams = <Code language="ts">{`{url: string; settings?: object}`}</Code>
    const CodeLoginParams = <Code language="ts">{`{credentials: Credentials}`}</Code>
    const CodeLogoutParams = <Code language="ts">{`{error?: unknown} | undefined`}</Code>

    const moduleMethodTableColumns = [
        {key: "name", title: "Method Name"},
        {key: "parameters", title: "Parameters"},
        {key: "returnType", title: "Return Type"},
        {key: "description", title: "Description"},
    ] as const;

    const moduleMethodTableData: TableData<typeof moduleMethodTableColumns> = [
        {
            name: "fetchAuthed",
            parameters: CodeFetchAuthedParams,
            returnType: "Response (from fetch API)",
            description: `This method should execute a fetch and retry if it fails
            (for example because of a need for token refresh.)`,
        },
        {
            name: "login",
            parameters: CodeLoginParams,
            returnType: "void",
            description: `This method should execute a login process based on the
            passed credentials.`,
        },
        {
            name: "logout",
            parameters: CodeLogoutParams,
            returnType: "void",
            description: `This method should execute the logout process.`,
        },
    ];

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
                columns={moduleStateTableColumns}
                data={moduleStateTableData}
            />

            <SubTitle>Necessary Thunks (methods)</SubTitle>
            <Table
                columns={moduleMethodTableColumns}
                data={moduleMethodTableData}
            />
        </Page>
    );
};

export default GeneralAuthModule;
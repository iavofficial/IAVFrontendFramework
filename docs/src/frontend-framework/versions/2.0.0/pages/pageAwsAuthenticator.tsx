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
  MODULE_PARAM_TABLE_COLUMNS,
  MODULE_STATE_TABLE_COLUMNS,
  MODULE_THUNKS_TABLE_COLUMNS,
} from "../../../common/page/text/module/moduleTableColumns";
import SubTitle from "../../../common/page/text/subTitle";
import Title from "../../../common/page/text/title";
import Code from "../../../common/page/utils/code";
import Table from "../../../common/page/utils/table";
import Text from "../../../common/page/text/text";
import { ModuleProfile } from "../../../common/page/text/module/moduleProfile";

const DESCRIPTION = `This module allows for authentication with AWS-Cognito.`;

export const PageAwsAuthenticator = () => {
  const CodeFetchAuthedParams = (
    <Code
      language="typescript"
      center
    >{`{url: string; token?: JWT; settings?: FetchSettings}`}</Code>
  );

  const CodeCompletePasswordParams = (
    <Code language="typescript" center>{`{newPassword: string}`}</Code>
  );

  const CodeUseModuleLifecycleParams = (
    <Code language="typescript" center>{`{renderChildren: boolean}`}</Code>
  );

  return (
    <Page>
      <Title>AwsAuthenticator</Title>
      <ModuleProfile
        isDefaultModule={false}
        moduleKey="auth"
        installCmd="npm i @iavofficial/frontend-framework-aws-authenticator"
        shortDescription={DESCRIPTION}
      />

      <SubTitle>Parameters</SubTitle>
      <Text>
        The constructor of AwsAuthenticator has the following parameters. The
        parameters are contained inside a parameter object.
        <Table
          columns={MODULE_PARAM_TABLE_COLUMNS}
          data={[
            {
              name: "configureAmplify",
              type: "() => void",
              description: `You will have to configure amplify to use authentication
              with AWS Cognito. You have to encapsulate the logic inside a callback
              and pass it using this property.`,
            },
            {
              name: "failOnNoLegalGroup?",
              type: "boolean",
              description: "Contains the username and all necessary tokens.",
            },
            {
              name: "legalGroups?",
              type: "string[]",
              description: "Contains the username and all necessary tokens.",
            },
          ]}
        />
      </Text>

      <SubTitle>Additional / overridden state</SubTitle>
      <Table
        columns={MODULE_STATE_TABLE_COLUMNS}
        data={[
          {
            name: "userData",
            type: "AwsUserData | undefined",
            description: "Contains the username and all necessary tokens.",
          },
          {
            name: "extras",
            type: "AwsAuthenticatorStateExtras",
            description: `Contains extra information for overriding the initial
            password and potential login errors.`,
          },
        ]}
      />

      <SubTitle>Additional / overriden Thunks (methods)</SubTitle>
      <Table
        columns={MODULE_THUNKS_TABLE_COLUMNS}
        data={[
          {
            name: "fetchAuthed",
            parameters: CodeFetchAuthedParams,
            return_type: "Response (from fetch API)",
            description: `See general structure of authentication modules.`,
          },
          {
            name: "extras.checkIsAuthenticated",
            parameters: "void",
            return_type: "Response",
            description: `This method checks if the user is still authenticated
            and calls logout if not.`,
          },
          {
            name: "extras.completePassword",
            parameters: CodeCompletePasswordParams,
            return_type: "Response",
            description: `This method is used to override the initial password.`,
          },
          {
            name: "extras.refreshSession",
            parameters: "void",
            return_type: "Response",
            description: `This method is used to refresh the session.`,
          },
          {
            name: "useModuleLifecycle",
            parameters: "void",
            return_type: CodeUseModuleLifecycleParams,
            description: `This Hook is used by the Framework to integrate the
            module's React lifecycle.`,
          },
        ]}
      />

      <SubTitle>AuthenticationView</SubTitle>
      <Text>
        The correct authentication view for AwsAuthenticator is
        awsAuthenticationView. It is highly recommended to use this
        authentication view an pass it to the UILayer component.
      </Text>

      <SubTitle>Example usage</SubTitle>
      <Code language="tsx">{`const configureAmplify = () => {
  Amplify.configure({
    Auth: {
      Cognito: {
        userPoolId: cognitoPool,
        userPoolClientId: cognitoAppId,
      },
    },
  });
  cognitoUserPoolsTokenProvider.setKeyValueStorage(
    new CookieStorage({
      domain: domain,
      path: "/",
      expires: 365,
      // @ts-ignore
      secure: domain !== "localhost",
      sameSite: "lax",
    })
  );
};

const customModules = {
  [MandatoryModuleNames.Authenticator]: new PageAwsAuthenticator({
    configureAmplify: configureAmplify,
    failOnNoLegalGroup: true,
    legalGroups: ["ADMIN", "SHOWCASE"],
  })
};

export const modules = createModules(customModules);

export const store = new StoreBuilder(modules.storeModules).build();

// Inside your React components
<GlobalDataLayer
    store={store}
    modules={modules.all}
    // ...
>
    <UILayer
        authenticationView={awsAuthenticationView}
        // ...
    />
    </GlobalDataLayer>
`}</Code>
    </Page>
  );
};

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
import { MODULE_STATE_TABLE_COLUMNS } from "../../../common/page/text/module/moduleTableColumns";
import SubTitle from "../../../common/page/text/subTitle";
import Text from "../../../common/page/text/text";
import Title from "../../../common/page/text/title";
import Table from "../../../common/page/utils/table";

export const PageGeneralInternationalizationModule = () => {
  return (
    <Page>
      <Title>General structure of an internationalization module</Title>
      <Text>
        This page describes the general structure of an internationalization
        module. Every internationalization module has to provide the listed
        state values and methods.
      </Text>

      <SubTitle>Necessary State</SubTitle>
      <Table
        columns={MODULE_STATE_TABLE_COLUMNS}
        data={[
          {
            name: "activeLang",
            type: "string",
            description: "Defines the currently used language.",
          },
        ]}
      />

      <SubTitle>Necessary attributes</SubTitle>
      <Text>
        The following table shows all attributes which have to statically exist
        on the module object.
      </Text>
      <Table
        columns={MODULE_STATE_TABLE_COLUMNS}
        data={[
          {
            name: "hasAuthenticated",
            type: "boolean",
            description: "Defines whether the user is authenticated.",
          },
        ]}
      />
    </Page>
  );
};

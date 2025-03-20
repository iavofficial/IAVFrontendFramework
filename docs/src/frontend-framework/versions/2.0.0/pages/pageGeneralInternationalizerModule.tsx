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
  MODULE_METHOD_TABLE_COLUMNS,
  MODULE_STATE_TABLE_COLUMNS,
} from "../../../common/page/text/module/moduleTableColumns";
import SubTitle from "../../../common/page/text/subTitle";
import Text from "../../../common/page/text/text";
import Title from "../../../common/page/text/title";
import Code from "../../../common/page/utils/code";
import Table from "../../../common/page/utils/table";

export const PageGeneralInternationalizerModule = () => {
  return (
    <Page>
      <Title>General structure of an internationalizer module</Title>
      <Text>
        This page describes the general structure of an internationalizer
        module. Every internationalizer module has to provide the listed
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
            name: "fallbackLang",
            type: "string",
            description: "Defines the fallback language.",
          },
          {
            name: "translationResources",
            type: "LangResources",
            description: "Has to contain all translations.",
          },
        ]}
      />

      <SubTitle>Necessary methods and Hooks</SubTitle>
      <Table
        columns={MODULE_METHOD_TABLE_COLUMNS}
        data={[
          {
            name: "selectActiveLang",
            type: "(lang: string => void)",
            description: `This method is called to select a language.`,
          },
          {
            name: "useTranslation",
            type: "UseTranslationHook",
            description: `This Hook is called to get
            translations for a given key.`,
          },
        ]}
      />

      <SubTitle>Relevant types</SubTitle>
      <Code language="typescript">{`export type InternationalizerState = {
  activeLang: string;
};

export type TranslationKeys = {
  option_name: string;
} & Record<string, string>;

export type Translation = {
  translation: TranslationKeys;
} & Record<string, string | object>;

export type LangResources = {
  [lang: string]: Translation;
};

export type TranslationFunctionParams = {
  key: string;
} & Record<string, any>;

export type TranslationFunction = (params: TranslationFunctionParams) => string;

export type TranslationWrapperFunction = (t: TranslationFunction) => string;

export type UseTranslationHook = () => TranslationFunction;`}</Code>
    </Page>
  );
};

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
import Text from "../../../common/page/text/text.tsx";

const DevProject: React.FC = () => {
  return (
    <Page>
      <Title>Starting the Development Project</Title>
      <Text>
        The framework&#39;s repository contains a development project which is
        used to observe the effects of changes to the Framework during
        development. Since the Framework's repository is a monorepo using the
        Turborepo management tool, you can build the framework and start the
        development project by executing the following command inside the root
        folder of the repository.
      </Text>
      <Code language={"bash"}>{`npm run dev`}</Code>
      <Text>
        After a certain time which is required for building you can access the
        development application in your web browser. You can now change the
        development application or the Framework itself to build up deeper
        knowledge.
      </Text>
    </Page>
  );
};

export default DevProject;

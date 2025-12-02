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

import {
  ContentLayout,
  LayoutBehaviour,
} from "@iavofficial/frontend-framework/contentLayout";
import { ContentStyleTemplates } from "@iavofficial/frontend-framework/contentStyle";
import {
  useModuleTyped,
  useTypedDispatch,
  useTypedSelector,
} from "./aws_test/storeTestSimple";
import { MandatoryModuleNames } from "@iavofficial/frontend-framework/constants";
import { Button } from "antd";
import { useState } from "react";

export const ExampleComponent6 = () => {
  const authState = useTypedSelector((state) => state.auth);
  const dispatch = useTypedDispatch();
  const authModule = useModuleTyped(MandatoryModuleNames.Authenticator);
  //set a valid url
  const [url] = useState("");

  const handleTestFetch = async () => {
    const token = authState?.userData?.idToken;

    const response = await dispatch(
      authModule.fetchAuthed({ url: url, token: token })
    ).unwrap();

    console.log("testfetch: ", response.body);
  };

  return (
    <ContentLayout
      layoutBehaviour={LayoutBehaviour.FLEX}
      contentStyle={{ appliedStyles: ContentStyleTemplates.DEFAULT }}
    >
      <div className="w-full" style={{ backgroundColor: "white" }}>
        Example component 6
        <Button onClick={handleTestFetch}>Test fetchAuthed new</Button>
      </div>
    </ContentLayout>
  );
};

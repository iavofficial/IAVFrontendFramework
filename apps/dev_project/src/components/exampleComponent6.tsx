/**
 * Copyright © 2024 IAV GmbH Ingenieurgesellschaft Auto und Verkehr, All Rights Reserved.
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
} from "@work-test/frontend-framework/contentLayout";
import { ContentStyleTemplates } from "@work-test/frontend-framework/contentStyle";

export const ExampleComponent6 = () => {
  return (
    <ContentLayout
      layoutBehaviour={LayoutBehaviour.FLEX}
      contentStyle={{ appliedStyles: ContentStyleTemplates.DEFAULT }}
    >
      <div className="w-full" style={{ backgroundColor: "white" }}>
        Example component 6
      </div>
    </ContentLayout>
  );
};

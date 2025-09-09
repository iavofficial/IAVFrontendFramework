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

import React, {useState} from "react";
import {UIContentWithBarProps} from "../../../../types/modules/ui/contentWithBar/contentWIthBarModuleInterfaces";
import {UIContentWithBar} from "./uiContentWithBar";

export type ContentWithBarOrchestratorProps = Partial<UIContentWithBarProps> & {
  uiComponent?: React.ComponentType<UIContentWithBarProps>;
};

export const ContentWithBarOrchestrator = (
  props: ContentWithBarOrchestratorProps,
) => {
  const {uiComponent: CustomUI} = props;

  const [selectedId, _] = useState<string>(
    props.contentWrappers ? props.contentWrappers[0]?.getId() : "" || "",
  );

  const UI: React.ComponentType<UIContentWithBarProps> =
    CustomUI ?? UIContentWithBar;

  return (
    <UI
      contentWrappers={props.contentWrappers || []}
      selectedId={selectedId}
      {...props}
    />
  );
};

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

import { useEffect, useState } from "react";
import { ContentWithBar } from "@iavofficial/frontend-framework/contentWithBar";
import { LayoutBehaviour } from "@iavofficial/frontend-framework/contentLayout";
import { BasicContentbarWrapper } from "@iavofficial/frontend-framework/basicContentbarWrapper";
import { ContentbarExample } from "./contentbarExample";
import { generateHashOfLength } from "@iavofficial/frontend-framework/hash";
import {
  ContentStyleTemplates,
} from "@iavofficial/frontend-framework/contentStyle";

export const ExampleComponent2 = () => {
  const [selectedId, setSelectedId] = useState("");
  const [contentTabs, setContentTabs] = useState<BasicContentbarWrapper[]>([]);

  useEffect(() => {
    let id = generateHashOfLength(6);
    let initialTab = [
      new BasicContentbarWrapper({
        id: generateHashOfLength(6),
        displayName: "test " + id,
        onClick: setSelectedId,
        contentAreaElement: (
          <ContentbarExample
            exampleText={`test ${id}`}
            onAddTab={onAddTab}
            key={id}
          />
        ),
      }),
    ];

    setSelectedId(initialTab[0].getId());
    setContentTabs(initialTab);
  }, []);

  function onAddTab() {
    let id = generateHashOfLength(6);
    let newTabElement = new BasicContentbarWrapper({
      id: id,
      displayName: "test " + id,
      closable: true,
      onClose: deleteTab,
      onClick: setSelectedId,
      contentAreaElement: (
        <ContentbarExample
          exampleText={"test " + id}
          onAddTab={onAddTab}
          key={generateHashOfLength(6)}
        />
      ),
    });

    setContentTabs((contentTabs) => [...contentTabs, newTabElement]);
    setSelectedId(newTabElement.getId());
  }

  function deleteTab(idToDelete: string, idOfFirstElement?: string) {
    setContentTabs((contentTabs) =>
      contentTabs.filter(
        (contentTabElement) => contentTabElement.getId() !== idToDelete
      )
    );

    setSelectedId((selectedId) =>
      selectedId === idToDelete ? idOfFirstElement! : selectedId
    );
  }

  return (
    <ContentWithBar
      layoutBehaviour={LayoutBehaviour.GRID}
      selectedId={selectedId}
      contentWrappers={contentTabs}
      jumpToEndOfContentBar={true}
      contentStyle={{ appliedStyles: ContentStyleTemplates.DEFAULT }}
    />
  );
};

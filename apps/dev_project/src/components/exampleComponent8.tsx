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

import { useEffect, useReducer } from "react";
//import { ContentWithBar } from '@iavofficial/frontend-framework/contentWithBar';
import { LayoutBehaviour } from "@iavofficial/frontend-framework/contentLayout";
import { generateHashOfLength } from "@iavofficial/frontend-framework/hash";
import { ContentbarExampleWithText } from "./contentbarExampleWithText";
import { BasicContentbarWrapper } from "@iavofficial/frontend-framework/basicContentbarWrapper";
import { ContentStyleTemplates } from "@iavofficial/frontend-framework/contentStyle";
import { useModule } from "@iavofficial/frontend-framework/moduleContext";
import { MandatoryModuleNames } from "@iavofficial/frontend-framework-shared/moduleNames";

function getInitialTabs(): {
  tabs: BasicContentbarWrapper[];
  selectedId: string;
} {
  const tabs: BasicContentbarWrapper[] = [];
  let firstId = "";
  for (let i = 0; i < 6; i++) {
    const hash = generateHashOfLength(6);
    if (i === 0) firstId = hash;
    tabs.push(
      new BasicContentbarWrapper({
        id: hash,
        displayName: (t) => `${t({ key: "car" })} ${i}`,
        onClick: () => {},
        contentAreaElement: (
          <ContentbarExampleWithText exampleText={`car ${i}`} key={hash} />
        ),
        closable: i > 0,
        onClose: () => {},
      }),
    );
  }
  return { tabs, selectedId: firstId };
}

const initialStuff = getInitialTabs();

type State = {
  exampleArray: BasicContentbarWrapper[];
  selectedId: string;
};

type Action =
  | { type: "create"; addElement: BasicContentbarWrapper }
  | { type: "update"; selectedId: string }
  | { type: "delete"; selectedId: string };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "create":
      return {
        exampleArray: [...state.exampleArray, action.addElement],
        selectedId: action.addElement.getId(),
      };
    case "update":
      return { ...state, selectedId: action.selectedId };
    case "delete":
      const arr = state.exampleArray.filter(
        (el) => el.getId() !== action.selectedId,
      );
      return {
        exampleArray: arr,
        selectedId: arr.length > 0 ? arr[0].getId() : "",
      };
    default:
      return state;
  }
}

export const ExampleComponent8 = () => {
  const [state, dispatch] = useReducer(reducer, {
    exampleArray: initialStuff.tabs,
    selectedId: initialStuff.selectedId,
  });

  const selectElement = (value: string) => {
    dispatch({ type: "update", selectedId: value });
  };

  const onCloseElement = (value: string) => {
    dispatch({ type: "delete", selectedId: value });
  };

  const onAddElement = () => {
    const hash = generateHashOfLength(6);
    const name = "test" + state.exampleArray.length;
    const newTab = new BasicContentbarWrapper({
      id: hash,
      displayName: name,
      onClick: selectElement,
      contentAreaElement: (
        <ContentbarExampleWithText exampleText={name} key={hash} />
      ),
      closable: true,
      onClose: onCloseElement,
    });
    dispatch({ type: "create", addElement: newTab });
  };

  const contentWithBarModule = useModule(MandatoryModuleNames.ContentWithBar);
  const ContentWithBar = contentWithBarModule.UiLayerContentWithBar;

  return (
    <ContentWithBar
      onClickAddButton={onAddElement}
      layoutBehaviour={LayoutBehaviour.GRID}
      contentWrappers={state.exampleArray}
      jumpToEndOfContentBar={true}
      addable={true}
      selectedId={state.selectedId}
      onSelect={selectElement}
      contentStyle={{ appliedStyles: ContentStyleTemplates.CONTENT_CELLS }}
    />
  );
};

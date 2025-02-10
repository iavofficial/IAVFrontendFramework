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

import { useEffect, useReducer } from "react";
import { ContentWithBar } from "@iavofficial/frontend-framework/contentWithBar";
import { LayoutBehaviour } from "@iavofficial/frontend-framework/contentLayout";
import { generateHashOfLength } from "@iavofficial/frontend-framework/hash";
import { ContentbarExampleWithText } from "./contentbarExampleWithText";
import { BasicContentbarWrapper } from "@iavofficial/frontend-framework/basicContentbarWrapper";
import { TranslateFunctionType } from "@iavofficial/frontend-framework/translationFunction";
import {
  ContentStyleTemplates,
} from "@iavofficial/frontend-framework/contentStyle";

const initialState: ExampleArrayObject = {
  exampleArray: [],
  selectedId: "",
};

type ExampleArrayObject = {
  exampleArray?: BasicContentbarWrapper[];
  selectedId?: string;
  addElement?: BasicContentbarWrapper;
};

interface Action {
  type: "create" | "update" | "delete" | "initialize";
  payload: ExampleArrayObject;
}

function reducer(state: ExampleArrayObject, action: Action) {
  switch (action.type) {
    case "initialize": {
      return {
        ...state,
        exampleArray: action.payload?.exampleArray,
        selectedId: action.payload.selectedId,
      };
    }
    case "create": {
      let temporaryExampleArray = [...state.exampleArray!];
      temporaryExampleArray.push(action.payload?.addElement!);

      return {
        ...state,
        exampleArray: temporaryExampleArray,
        selectedId: action.payload?.addElement?.getId(),
      };
    }

    case "update": {
      return {
        ...state,
        selectedId: action.payload?.selectedId,
      };
    }
    case "delete": {
      let temporaryExampleArray = [...state.exampleArray!];

      temporaryExampleArray.forEach((element, index) => {
        if (element.getId() === action.payload?.selectedId) {
          temporaryExampleArray.splice(index, 1);
        }
      });

      return {
        ...state,
        exampleArray: temporaryExampleArray,
        selectedId:
          action.payload?.selectedId === state.selectedId
            ? temporaryExampleArray[0].getId()
            : state.selectedId,
      };
    }

    default:
      return state;
  }
}

export const ExampleComponent1 = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    let returnElement = generateExampleArray();
    dispatch({
      type: "initialize",
      payload: {
        exampleArray: returnElement.temporaryExampleArray,
        selectedId: returnElement.idOfFirstElement,
      },
    });
  }, []);

  const generateExampleArray = () => {
    let temporaryExampleArray = [];
    let hashOfFirstElement = generateHashOfLength(6);

    for (let index = 0; index < 6; index++) {
      let hash = index === 0 ? hashOfFirstElement : generateHashOfLength(6);
      let newBasicContentWrapperElement = new BasicContentbarWrapper({
        id: hash,
        displayName: (t: TranslateFunctionType) => `${t("car")} ${index}`,
        onClick: selectElement,
        contentAreaElement: (
          <ContentbarExampleWithText exampleText={`car ${index}`} key={hash} />
        ),
        closable: index < 1 ? false : true,
        onClose: onCloseElement,
      });
      temporaryExampleArray.push(newBasicContentWrapperElement);
    }

    return {
      temporaryExampleArray: temporaryExampleArray,
      idOfFirstElement: hashOfFirstElement,
    };
  };

  const selectElement = (value: string) => {
    dispatch({ type: "update", payload: { selectedId: value } });
  };

  const onCloseElement = (value: string) => {
    dispatch({ type: "delete", payload: { selectedId: value } });
  };

  const onAddElement = () => {
    let hash = generateHashOfLength(6);
    let name = "test" + state.exampleArray?.length;
    let newBasicContentWrapperElement = new BasicContentbarWrapper({
      id: hash,
      displayName: name,
      onClick: selectElement,
      contentAreaElement: (
        <ContentbarExampleWithText exampleText={name} key={hash} />
      ),
      closable: true,
      onClose: onCloseElement,
    });
    dispatch({
      type: "create",
      payload: { addElement: newBasicContentWrapperElement },
    });
  };

  return (
    <ContentWithBar
      onClickAddButton={onAddElement}
      layoutBehaviour={LayoutBehaviour.GRID}
      contentWrappers={state.exampleArray!}
      jumpToEndOfContentBar={true}
      addable={true}
      selectedId={state.selectedId ? state.selectedId : ""}
      contentStyle={{ appliedStyles: ContentStyleTemplates.CONTENT_CELLS }}
    />
  );
};

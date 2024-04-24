import { useEffect, useReducer } from 'react';
import { ContentWithBar } from 'iav-frontend-framework/contentWithBar';
import { LayoutBehaviour } from 'iav-frontend-framework/contentLayout';
import { generateHashOfLength } from 'iav-frontend-framework/hash';
import { ContentbarExampleWithText } from './contentbarExampleWithText';
import { BasicContentbarWrapper } from 'iav-frontend-framework/basicContentbarWrapper';
import {TranslateFunctionType} from "iav-frontend-framework/translationFunction";

const initialState: ExampleArrayObject = {
  exampleArray: [],
  selectedId: '',
};

type ExampleArrayObject = {
  exampleArray?: BasicContentbarWrapper[];
  selectedId?: string;
  addElement?: BasicContentbarWrapper;
};

interface Action {
  type: 'create' | 'update' | 'delete' | 'initialize';
  payload: ExampleArrayObject;
}

function reducer(state: ExampleArrayObject, action: Action) {
  switch (action.type) {
    case 'initialize': {
      return {
        ...state,
        exampleArray: action.payload?.exampleArray,
        selectedId: action.payload.selectedId
      };
    }
    case 'create': {
      let temporaryExampleArray = [...state.exampleArray!];
      temporaryExampleArray.push(action.payload?.addElement!);

      temporaryExampleArray.forEach((element) => {
        element.setSelectedIdParentComponent(
          action.payload?.addElement?.getId()!
        );
      });

      return {
        ...state,
        exampleArray: temporaryExampleArray,
        selectedId: action.payload?.addElement?.getId()
      };
    }

    case 'update': {
      let temporaryExampleArray = [...state.exampleArray!];
      temporaryExampleArray.forEach((element) => {
        element.setSelectedIdParentComponent(action.payload?.selectedId!);
      });

      return {
        ...state,
        exampleArray: temporaryExampleArray,
        selectedId: action.payload?.selectedId,
      };
    }
    case 'delete': {
      let temporaryExampleArray = [...state.exampleArray!];

      temporaryExampleArray.forEach((element, index) => {
        if (element.getId() === action.payload?.selectedId) {
          temporaryExampleArray.splice(index, 1);
        }
      });

      if (action.payload?.selectedId === state.selectedId) {
        temporaryExampleArray.forEach((element) => {
          element.setSelectedIdParentComponent(
            temporaryExampleArray[0].getId()
          );
        });
      }

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
      type: 'initialize',
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
        selectedId: hashOfFirstElement,
        closable: index < 1 ? false : true,
        setSelectedId: selectElement,
        onClose: onCloseElement,
        contentAreaElement: <ContentbarExampleWithText exampleText={"car"} key={hash}/>
      });
      temporaryExampleArray.push(newBasicContentWrapperElement);
    }

    return {
      temporaryExampleArray: temporaryExampleArray,
      idOfFirstElement: hashOfFirstElement,
    };
  };

  const selectElement = (value: string) => {
    dispatch({ type: 'update', payload: { selectedId: value } });
  };

  const onCloseElement = (value: string) => {
    dispatch({ type: 'delete', payload: { selectedId: value } });
  };

  const onAddElement = () => {
    let hash = generateHashOfLength(6);
    let name = 'test' + state.exampleArray?.length;
    let newBasicContentWrapperElement = new BasicContentbarWrapper({
      id: hash,
      displayName: name,
      selectedId: state.selectedId!,
      closable: true,
      setSelectedId: selectElement,
      onClose: onCloseElement,
      contentAreaElement: <ContentbarExampleWithText exampleText={name} key={hash} />
    });
    dispatch({
      type: 'create',
      payload: { addElement: newBasicContentWrapperElement },
    });
  };

  return (
    <ContentWithBar
      onClickAddButton={onAddElement}
      layoutBehaviour={LayoutBehaviour.GRID}
      contentWrappers={state.exampleArray!}
      jumpToEnd={true}
      addable={true}
      selectedId={state.selectedId? state.selectedId : ""}
      />
  );
};

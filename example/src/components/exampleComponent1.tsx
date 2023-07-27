import { useEffect, useReducer } from 'react';
import { Content, LayoutBehaviour } from 'disa-framework/content';
import { generateHashOfLength } from 'disa-framework/hash';
import { ContentbarExampleWithText } from './contentbarExampleWithText';
import { BasicContentbarWrapper } from 'disa-framework/basicContentbarWrapper';
import {TranslateFunctionType} from "disa-framework/translationFunction";

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
  payload?: ExampleArrayObject;
}

function reducer(state: ExampleArrayObject, action: Action) {
  switch (action.type) {
    case 'initialize': {
      return {
        ...state,
        exampleArray: action.payload?.exampleArray,
        selectedId: action.payload?.selectedId,
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
        selectedId: action.payload?.addElement?.getId(),
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
      let newBasicContentWrapperElement = new BasicContentbarWrapper(
        hash,
        (t: TranslateFunctionType) => `${t("car")} ${index}`,
        hashOfFirstElement,
        index < 1 ? false : true,
        selectElement,
        onCloseElement,
        <ContentbarExampleWithText exampleText={"car"} />
      );
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
    let newBasicContentWrapperElement = new BasicContentbarWrapper(
      hash,
      name,
      state.selectedId!,
      true,
      selectElement,
      onCloseElement,
      <ContentbarExampleWithText exampleText={name} />
    );
    dispatch({
      type: 'create',
      payload: { addElement: newBasicContentWrapperElement },
    });
  };

  return (
    <Content
      onClickAddButton={onAddElement}
      layoutBehaviour={LayoutBehaviour.GRID}
      contentElements={state.exampleArray!}
      jumpToEnd={true}
      addable={true}
    >
      <>
        {state.exampleArray?.map(
          (basicContentbarWrapper: BasicContentbarWrapper) => {
            if (basicContentbarWrapper.getId() === state.selectedId) {
              return basicContentbarWrapper.getContentAreaElement();
            }
          }
        )}
      </>
    </Content>
  );
};

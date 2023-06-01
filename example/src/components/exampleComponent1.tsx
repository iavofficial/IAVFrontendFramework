import React, { useEffect, useState } from 'react';
import { CellPaddings, ContentCell } from 'disa-framework/contentCell';
import { Content, LayoutBehaviour } from 'disa-framework/content';
import { BasicContentbarWrapper } from 'disa-framework/basicContentbarWrapper';

export const ExampleComponent1 = () => {
  const [selectedId, setSelectedId] = useState('test123');

  const onCloseElement = (value: string) => {
    console.log('Element mit ID: ', value, ' geschlossen');
  };

  let exampleArray = [
    // new BasicContentbarWrapper(
    //   'test123',
    //   'car123',
    //   selectedId,
    //   false,
    //   setSelectedId,
    //   onCloseElement,
    //   <ContentbarExampleWithText exampleText="car123" />
    // ),
    // new BasicContentbarWrapper(
    //   'test124',
    //   'car124',
    //   selectedId,
    //   false,
    //   setSelectedId,
    //   onCloseElement,
    //   <ContentbarExampleWithText exampleText="car124" />
    // ),
    // new BasicContentbarWrapper(
    //   'test125',
    //   'car125',
    //   selectedId,
    //   true,
    //   setSelectedId,
    //   onCloseElement,
    //   <ContentbarExampleWithText exampleText="car125" />
    // ),
    // new BasicContentbarWrapper(
    //   'test126',
    //   'car126',
    //   selectedId,
    //   true,
    //   setSelectedId,
    //   onCloseElement,
    //   <ContentbarExampleWithText exampleText="car126" />
    // ),
    // new BasicContentbarWrapper(
    //   'test127',
    //   'car127',
    //   selectedId,
    //   true,
    //   setSelectedId,
    //   onCloseElement,
    //   <ContentbarExampleWithText exampleText="car127" />
    // ),
    // new BasicContentbarWrapper(
    //   'test128',
    //   'car128',
    //   selectedId,
    //   true,
    //   setSelectedId,
    //   onCloseElement,
    //   <ContentbarExampleWithText exampleText="car128" />
    // ),
    // new BasicContentbarWrapper(
    //   'test129',
    //   'car129',
    //   selectedId,
    //   true,
    //   setSelectedId,
    //   onCloseElement,
    //   <ContentbarExampleWithText exampleText="car129" />
    // ),
  ];

  const selectElement = (value: string) => {
    console.log('Element mit ID: ', value, ' ausgeführt');

    setSelectedId(value);
  };

  const test = () => {
    console.log('onclick add function triggerd');
  };

  let test3 = () => {
    console.log('onclick left function triggerd');
  };

  let test4 = () => {
    console.log('onclick right function triggerd');
  };

  return (
    <Content
      addable={true}
      onClickAddButton={test3}
      onClose={onCloseElement}
      onClickLeftSlideButton={test3}
      onClickRightSlideButton={test4}
      setSelectedId={selectElement}
      layoutBehaviour={LayoutBehaviour.GRID}
      contentElements={[]}
    >
      <>
        {/* {exampleArray.map((basicContentbarWrapper: BasicContentbarWrapper) => {
          if (basicContentbarWrapper.getId() === selectedId) {
            return basicContentbarWrapper.getContentAreaElement();
          }
        })} */}
      </>
    </Content>
  );
};

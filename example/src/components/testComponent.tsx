import React, { useEffect, useState } from 'react';
import { CellPaddings, ContentCell } from 'disa-framework/contentCell';
import { Content, LayoutBehaviour } from 'disa-framework/content';
import { generateHashOfLength } from 'disa-framework/hash';
import { ContentbarExampleWithText } from './ContentbarExample/ContentbarExampleWithText';
import { BasicContentbarWrapper } from 'disa-framework/basicContentbarWrapper';

export const TestComponent = () => {
  const [selectedId, setSelectedId] = useState('test123');

  let exampleArray = [
    new BasicContentbarWrapper(
      'test123',
      'car123',
      selectedId,
      () => test3,
      true,
      () => test4,
      <ContentbarExampleWithText emampleText="car123" />
    ),
    new BasicContentbarWrapper(
      'test124',
      'car124',
      selectedId,
      function () {},
      true,
      function () {},
      <ContentbarExampleWithText emampleText="car124" />
    ),
    new BasicContentbarWrapper(
      'test125',
      'car125',
      selectedId,
      function () {},
      true,
      function () {},
      <ContentbarExampleWithText emampleText="car125" />
    ),
    new BasicContentbarWrapper(
      'test126',
      'car126',
      selectedId,
      () => test,
      true,
      function () {},
      <ContentbarExampleWithText emampleText="car126" />
    ),
    new BasicContentbarWrapper(
      'test127',
      'car127',
      selectedId,
      () => test,
      true,
      function () {},
      <ContentbarExampleWithText emampleText="car127" />
    ),
    new BasicContentbarWrapper(
      'test128',
      'car128',
      selectedId,
      () => test,
      true,
      function () {},
      <ContentbarExampleWithText emampleText="car128" />
    ),
    new BasicContentbarWrapper(
      'test129',
      'car129',
      selectedId,
      () => test,
      true,
      function () {},
      <ContentbarExampleWithText emampleText="car129" />
    ),
  ];

  const selectElement = (value: string) => {
    console.log('ausgeführt mit:', value);

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
      onClickLeftSlideButton={test3}
      onClickRightSlideButton={test4}
      setSelectedId1={selectElement}
      layoutBehaviour={LayoutBehaviour.GRID}
      contentElements={exampleArray}
    >
      <>
        {exampleArray.map((basicContentbarWrapper: BasicContentbarWrapper) => {
          if (basicContentbarWrapper.getId() === selectedId) {
            return basicContentbarWrapper.getRenderElement();
          }
        })}
      </>
    </Content>
  );
};

import { useEffect, useState } from 'react';
import { Content, LayoutBehaviour } from 'disa-framework/content';
import { BasicContentbarWrapper } from 'disa-framework/basicContentbarWrapper';
import { ContentbarExampleWithContentCell } from './contentbarExampleWithContentCell';

export const ExampleComponent2 = () => {
  const [selectedId, setSelectedId] = useState('');

  useEffect(() => {
    if (selectedId === '') {
      setSelectedId(exampleArray[0].getId());
    }
  }, []);

  let exampleArray = [
    new BasicContentbarWrapper(
      'test123',
      'car123',
      selectedId,
      false,
      setSelectedId,
      () => {},
      <ContentbarExampleWithContentCell exampleText="car123" />
    ),
    new BasicContentbarWrapper(
      'test124',
      'car124',
      selectedId,
      false,
      setSelectedId,
      () => {},
      <ContentbarExampleWithContentCell exampleText="car124" />
    ),
    new BasicContentbarWrapper(
      'test125',
      'car125',
      selectedId,
      false,
      setSelectedId,
      () => {},
      <ContentbarExampleWithContentCell exampleText="car125" />
    ),
  ];

  const selectElement = (value: string) => {
    setSelectedId(value);
  };

  return (
    <Content
      setSelectedId={selectElement}
      layoutBehaviour={LayoutBehaviour.GRID}
      contentElements={exampleArray}
    >
      <>
        {exampleArray.map((basicContentbarWrapper: BasicContentbarWrapper) => {
          if (basicContentbarWrapper.getId() === selectedId) {
            return basicContentbarWrapper.getContentAreaElement();
          }
        })}
      </>
    </Content>
  );
};

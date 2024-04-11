import { useState } from 'react';
import { ContentArea } from 'iav-frontend-framework/contentArea';
import { LayoutBehaviour } from 'iav-frontend-framework/contentLayout';
import { BasicContentbarWrapper } from 'iav-frontend-framework/basicContentbarWrapper';
import { ContentbarExampleWithContentCell } from './contentbarExampleWithContentCell';

enum ExampleObjectIds {
  Test123= "test123",
  Test124= "test124",
  Test125= "test125"
}

export const ExampleComponent2 = () => {
  const [selectedId, setSelectedId] = useState<string>(ExampleObjectIds.Test123);

  let exampleArray = [
    new BasicContentbarWrapper({
      id: ExampleObjectIds.Test123,
      displayName: 'car123',
      selectedId: selectedId,
      closable: false,
      setSelectedId: setSelectedId,
      contentAreaElement: <ContentbarExampleWithContentCell exampleText="car123" key={ExampleObjectIds.Test123}/>
    }),
    new BasicContentbarWrapper({
      id: ExampleObjectIds.Test124,
      displayName: 'car124',
      selectedId: selectedId,
      closable: false,
      setSelectedId: setSelectedId,
      contentAreaElement: <ContentbarExampleWithContentCell exampleText="car124" key={ExampleObjectIds.Test124}/>
    }),
    new BasicContentbarWrapper({
      id: ExampleObjectIds.Test125,
      displayName: 'car125',
      selectedId: selectedId,
      closable: false,
      setSelectedId: setSelectedId,
      contentAreaElement: <ContentbarExampleWithContentCell exampleText="car125" key={ExampleObjectIds.Test125}/>
    }),
  ];

  const selectElement = (value: string) => {
    setSelectedId(value);
  };

  return (
    <ContentArea
      setSelectedId={selectElement}
      layoutBehaviour={LayoutBehaviour.GRID}
      selectedId={selectedId}
      contentWrappers={exampleArray}
    />
  );
};

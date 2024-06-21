import { useState } from "react";
import { ContentWithBar } from "iav-frontend-framework/contentWithBar";
import { LayoutBehaviour } from "iav-frontend-framework/contentLayout";
import { BasicContentbarWrapper } from "iav-frontend-framework/basicContentbarWrapper";
import { ContentbarExampleWithContentCell } from "./contentbarExampleWithContentCell";

import { generateHashOfLength } from "iav-frontend-framework/hash";

export const ExampleComponent2 = () => {
  const [selectedId, setSelectedId] = useState("j§n3K?");
  const [contentTabs, setContentTabs] = useState([
    new BasicContentbarWrapper({
      id: "j§n3K?",
      displayName: "test" + 0,
      closable: false,
      onClick: setSelectedId,
      contentAreaElement: (
        <ContentbarExampleWithContentCell
          exampleText={`test${0}`}
          onAddTab={onAddTab}
          key={generateHashOfLength(6)}
        />
      ),
    }),
  ]);

  function onAddTab() {
    let tempArray = contentTabs;
    let newHash = generateHashOfLength(6);
    let tabElement = new BasicContentbarWrapper({
      id: newHash,
      displayName: "test" + tempArray.length,
      closable: true,
      onClose: deleteTab,
      onClick: setSelectedId,
      contentAreaElement: (
        <ContentbarExampleWithContentCell
          exampleText={"test" + tempArray.length}
          onAddTab={onAddTab}
          key={newHash}
        />
      ),
    });
    tempArray.push(tabElement);

    setContentTabs(tempArray);
    setSelectedId(() => newHash);
  }

  function deleteTab(IdToDelete: string) {
    let tempArray = contentTabs;

    tempArray.forEach((element, index) => {
      if (element.getId() === IdToDelete) {
        tempArray.splice(index, 1);
      }
    });

    setSelectedId(
      selectedId === IdToDelete ? tempArray[0].getId() : selectedId
    );

    setContentTabs([...tempArray]);
  }

  return (
    <ContentWithBar
      layoutBehaviour={LayoutBehaviour.GRID}
      selectedId={selectedId}
      contentWrappers={contentTabs}
      jumpToEndOfContentBar={true}
    />
  );
};

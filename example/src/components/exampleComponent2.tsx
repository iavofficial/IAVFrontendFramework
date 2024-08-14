import { useEffect, useState } from "react";
import { ContentWithBar } from "iav-frontend-framework/contentWithBar";
import { LayoutBehaviour } from "iav-frontend-framework/contentLayout";
import { BasicContentbarWrapper } from "iav-frontend-framework/basicContentbarWrapper";
import { ContentbarExample } from "./contentbarExample";
import { generateHashOfLength } from "iav-frontend-framework/hash";
import {
  ContentStyleTemplates,
} from "iav-frontend-framework/contentStyle";

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

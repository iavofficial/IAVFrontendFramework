import React from 'react';
import { generateHashOfLength } from '../../utils/hash';
import { ContentbarWrapperInterface } from './contentbarWrapperInterface';
import { DefaultContentSelectionElement } from './defaultContentSelectionElement';
import { TranslationFunction } from '../../types/translationFunction';

export class BasicContentbarWrapper implements ContentbarWrapperInterface {
  constructor(
    private id: string,
    private displayName: string | TranslationFunction,
    private selectedId: string,
    private closable: boolean,
    private setSelectedId: (value: string) => any,
    private onClose: (value: string) => void,
    private contentAreaElement: React.ReactElement
  ) {}

  getKey() {
    return generateHashOfLength(6);
  }

  getId() {
    return this.id;
  }

  setSelectedIdParentComponent(selectedIdParentComponent: string) {
    this.selectedId = selectedIdParentComponent;
  }

  getContentAreaElement(): React.ReactElement {
    return this.contentAreaElement;
  }

  getContentbarComponent(contentElementWidth: number) {
    return (
      <DefaultContentSelectionElement
        key={this.getKey()}
        displayName={this.displayName}
        id={this.id}
        closable={this.closable}
        selected={this.id === this.selectedId}
        setSelectedId={this.setSelectedId}
        onClose={this.onClose}
        width={contentElementWidth}
      />
    );
  }
}
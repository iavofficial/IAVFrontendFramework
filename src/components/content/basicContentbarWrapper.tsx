import React from 'react';
import { generateHashOfLength } from '../../services/hash';
import { ContentbarWrapperInterface } from './contentbarWrapperInterface';
import { DefaultContentSelectionElement } from './defaultContentSelectionElement';

export class BasicContentbarWrapper implements ContentbarWrapperInterface {
  constructor(
    private id: string,
    private name: string,
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

  getContentAreaElement(): React.ReactElement {
    return this.contentAreaElement;
  }

  getContentbarComponent(contentElementWidth: number) {
    return (
      <DefaultContentSelectionElement
        key={this.getKey()}
        name={this.name}
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

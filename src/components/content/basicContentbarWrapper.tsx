import React from 'react';
import { generateHashOfLength } from '../../services/hash';
import { ContentbarWrapperInterface } from './contentbarWrapperInterface';
import { DefaultContentSelectionElement } from './defaultContentSelectionElement';

export class BasicContentbarWrapper implements ContentbarWrapperInterface {
  constructor(
    private id: string,
    private name: string,
    private selectedId: string,
    private onClick: (identifier: string) => any,
    private closable: boolean,
    private onClose: React.MouseEventHandler<HTMLButtonElement>
  ) {}

  getKey() {
    return generateHashOfLength(6);
  }

  getContentbarComponent() {
    return (
      <DefaultContentSelectionElement
        name={this.name}
        id={this.id}
        key={this.getKey()}
        selected={this.id === this.selectedId}
        onClick={this.onClick(this.id)}
        closable={this.closable}
        onClose={this.onClose}
      />
    );
  }
}

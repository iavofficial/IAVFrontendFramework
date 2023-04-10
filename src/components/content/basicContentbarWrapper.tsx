import React, { ReactElement } from 'react';
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
    private onClose: any
  ) {}

  getKey() {
    return generateHashOfLength(6);
  }

  testFunction() {
    console.log('triggerd ebene 2');
    this.onClose;
  }

  getContentbarComponent(defaultContentSelectionElement: ReactElement) {
    return React.cloneElement(defaultContentSelectionElement, {
      key: this.getKey(),
      name: this.name,
      id: this.id,
      closable: this.closable,
      selected: this.id === this.selectedId,
    });
  }
}

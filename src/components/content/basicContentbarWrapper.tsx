import React, { ReactElement } from 'react';
import { generateHashOfLength } from '../../services/hash';
import { ContentbarWrapperInterface } from './contentbarWrapperInterface';

export class BasicContentbarWrapper implements ContentbarWrapperInterface {
  constructor(
    private id: string,
    private name: string,
    private selectedId: string,
    private closable: boolean,
    private renderElement: ReactElement
  ) {}

  getKey() {
    return generateHashOfLength(6);
  }

  getRenderElement() {
    return React.cloneElement(this.renderElement);
  }

  getId() {
    return this.id;
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

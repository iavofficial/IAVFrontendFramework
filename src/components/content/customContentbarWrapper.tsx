import React, { ReactElement } from 'react';
import { generateHashOfLength } from '../../utils/hash';
import { ContentbarWrapperInterface } from './contentbarWrapperInterface';
import { DefaultContentSelectionElement } from './defaultContentSelectionElement';
import './contentbar.css';

export class CustomContentbarWrapper implements ContentbarWrapperInterface {
  constructor(
    private id: string,
    private renderElement: ReactElement,
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

  getContentbarElement() {
    return <div id="restrictDimensions">{this.renderElement}</div>;
  }
}

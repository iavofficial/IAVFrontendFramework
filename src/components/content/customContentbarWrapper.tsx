import React, { ReactElement } from 'react';
import { generateHashOfLength } from '../../services/hash';
import { ContentbarWrapperInterface } from './contentbarWrapperInterface';
import { DefaultContentSelectionElement } from './defaultContentSelectionElement';
import './contentbar.css';

export class CustomContentbarWrapper implements ContentbarWrapperInterface {
  constructor(private renderElement: ReactElement) {}

  getKey() {
    return generateHashOfLength(6);
  }

  getContentbarComponent() {
    return <div id="restrictDimensions">{this.renderElement}</div>;
  }
}

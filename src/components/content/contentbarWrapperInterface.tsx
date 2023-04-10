import React, { ReactElement } from 'react';

export interface ContentbarWrapperInterface {
  getContentbarComponent(
    defaultContentSelectionElement?: ReactElement
  ): ReactElement;
  getKey(): string;
}

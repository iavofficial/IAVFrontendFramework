import React, { ReactElement } from 'react';

export interface ContentbarWrapperInterface {
  getContentbarElement(contentElementWidth: number): ReactElement;
  getKey(): string;
  getId(): string;
  getContentAreaElement(): React.ReactElement;
}

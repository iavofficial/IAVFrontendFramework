import React, { ReactElement } from 'react';

export interface ContentbarWrapperInterface {
  getContentbarComponent(contentElementWidth: number): ReactElement;
  getKey(): string;
  getId(): string;
  getContentAreaElement(): React.ReactElement;
}

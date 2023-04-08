import { ReactElement } from 'react';

export interface ContentbarWrapperInterface {
  getContentbarComponent(): ReactElement;
  getKey(): string;
}

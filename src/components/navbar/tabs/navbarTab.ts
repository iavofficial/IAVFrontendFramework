import React, { ReactElement } from 'react';
import { TranslateFunctionType } from '../../../types/translationFunction';

export interface navbarTabProps {
  name: string | ((t: TranslateFunctionType) => string);
  to: string;
  disabled: boolean;
  icon?: ReactElement;
  collapsed?: boolean;
  navbarCollapsed?: boolean;
  active?: boolean;
}

export type navbarTab<additional = {}> = React.ComponentType<
  navbarTabProps & additional
>;

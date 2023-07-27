import React, { ReactElement } from 'react';
import { TranslateFunctionType } from '../../../types/translationFunction';
import { LAYER } from './tabLayer';

export interface navbarTabProps {
  name: string | ((t: TranslateFunctionType) => string);
  to: string;
  disabled: boolean;
  icon?: ReactElement;
  collapsed?: boolean;
  navbarCollapsed?: boolean;
  active?: boolean;
  layer?: LAYER;
  isLastElementOfLayer?: boolean;
}

export type navbarTab<additional = {}> = React.ComponentType<
  navbarTabProps & additional
>;

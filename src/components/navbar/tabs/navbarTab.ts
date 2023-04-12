import { LAYER } from './tabLayer';
import React, { ReactElement } from 'react';

import { TranslateFunctionType } from '../../../contexts/language';

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
  colorOptions?: {
    tabTextColor: string;
    tabTextHoverColor: string;
    tabHoverBackground: string;
    tabBackground: string;
  };
}

export type navbarTab<additional = {}> = React.ComponentType<
  navbarTabProps & additional
>;

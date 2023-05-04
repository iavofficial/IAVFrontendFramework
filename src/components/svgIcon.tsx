import React, { ReactNode } from 'react';

export interface Props {
  element: ReactNode;
  color: string;
}

export const SvgIcon = (props: Props) => {
  return (
    <svg width={'24px'} height="24px" fill={props.color}>
      {props.element}
    </svg>
  );
};

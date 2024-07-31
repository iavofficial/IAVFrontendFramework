import { ReactElement } from "react";

export type ComponentTypeMinProps<P> = (
  props: P & object,
  ...other: any
) => ReactElement;

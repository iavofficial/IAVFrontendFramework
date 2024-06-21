import { ReactElement } from "react";

export type NavbarTabFactory<OptionType> = (
  frameworkInjectedOptions: OptionType
) => ReactElement;

import { SimpleNavbarTabProps } from "../tabs/typesSimpleNavbarTab";
import { SimpleNavbarTab } from "../tabs/simpleNavbarTab";

type OptionsProp<OptionType> = {
  frameworkInjectedOptions: OptionType;
};

export const genericNavbarTabFactory = <OptionType,>(
  NavbarComponent: React.ComponentType<OptionsProp<OptionType>>,
  props: Omit<
    React.ComponentProps<typeof NavbarComponent>,
    "frameworkInjectedOptions"
  >
) => {
  return (frameworkInjectedOptions: OptionType) => {
    <NavbarComponent
      frameworkInjectedOptions={frameworkInjectedOptions}
      {...props}
    />;
  };
};

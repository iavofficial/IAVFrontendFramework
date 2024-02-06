import { ComponentTypeMinProps } from "../../../types/typesReact";
import { SimpleNavbarTab } from "../tabs/simpleNavbarTab/simpleNavbarTab";
import { InjectedOptionsObject } from "../types/typesInjectedOptions";

export const generalizedTabFactoryFactory = <OptionType,>(
  NavbarTabComponent: ComponentTypeMinProps<InjectedOptionsObject<OptionType>>
) => {
  return (
    tabProps: Omit<
      React.ComponentProps<typeof SimpleNavbarTab>,
      "frameworkInjectedOptions"
    >
  ) => {
    return (props: { frameworkInjectedOptions: OptionType }) => {
      return (
        <NavbarTabComponent
          frameworkInjectedOptions={props.frameworkInjectedOptions}
          {...tabProps}
        />
      );
    };
  };
};

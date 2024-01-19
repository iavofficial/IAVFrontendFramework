import { ComponentTypeMinProps } from "../../../types/typesReact";
import { SimpleNavbarTab } from "../tabs/simpleNavbarTab";
import { groupableNavbarTabPropsFrameworkInjectedOptions } from "../tabs/typesNavbarTab";
import { InjectedPropertiesObj } from "../typesNavbar";

export const generalizedTabFactoryFactory = <OptionType,>(
  NavbarTabComponent: ComponentTypeMinProps<InjectedPropertiesObj<OptionType>>
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

/**
 * This interface contains the basic options which are passed to the wrapper by the navbar component.
 */
export interface InjectedOptionsByNavbarToWrapper {
  navbarCollapsed: boolean;
}

/**
 * This interface contains the options which are passed to the wrapper by a group component for groupable tabs.
 */
export type InjectedOptionsByGroupToWrapper =
  InjectedOptionsByNavbarToWrapper & {
    groupActive: boolean;
  };

/**
 * This interface contains all basic options which are passed to a tab component by the wrapper.
 */
export type InjectedOptionsByWrapperToTab = InjectedOptionsByNavbarToWrapper & {
  path: string;
};

/**
 * This interface contains all options which are passed to groupable tab components by the wrapper.
 */
export type InjectedOptionsGroupableByWrapperToTab =
  InjectedOptionsByWrapperToTab &
    InjectedOptionsByGroupToWrapper & {
      insideGroup: boolean;
    };

/**
 * This interface defines the structure of an object which contains options to inject by the framework.
 */
export interface InjectedOptionsObject<PropertiesToInject> {
  frameworkInjectedOptions: PropertiesToInject;
}

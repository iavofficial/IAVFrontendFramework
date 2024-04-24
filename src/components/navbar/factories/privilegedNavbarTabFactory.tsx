import React from "react";
import { PrivilegedNavbarTab } from "../tabs/privilegedNavbarTab";
import { InjectedOptionsGroupableByWrapperToTab } from "../types/typesInjectedOptions";

export const privilegedNavbarTabFactory = (
  tabProps: Omit<
    React.ComponentProps<typeof PrivilegedNavbarTab>,
    "frameworkInjectedOptions"
  >
) => {
  return (props: {
    frameworkInjectedOptions: InjectedOptionsGroupableByWrapperToTab;
  }) => {
    return (
      <PrivilegedNavbarTab
        frameworkInjectedOptions={props.frameworkInjectedOptions}
        {...tabProps}
      />
    );
  };
};

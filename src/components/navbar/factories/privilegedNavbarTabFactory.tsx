import React from "react";
import { PrivilegedNavbarTab } from "../tabs/privilegedNavbarTab";
import { groupableNavbarTabPropsFrameworkInjectedOptions } from "../tabs/typesNavbarTab";

export const privilegedNavbarTabFactory = (
  tabProps: Omit<
    React.ComponentProps<typeof PrivilegedNavbarTab>,
    "frameworkInjectedOptions"
  >
) => {
  return (props: {
    frameworkInjectedOptions: groupableNavbarTabPropsFrameworkInjectedOptions;
  }) => {
    return (
      <PrivilegedNavbarTab
        frameworkInjectedOptions={props.frameworkInjectedOptions}
        {...tabProps}
      />
    );
  };
};

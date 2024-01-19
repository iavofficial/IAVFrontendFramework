import React from "react";
import { SimpleNavbarTab } from "../tabs/simpleNavbarTab";
import { groupableNavbarTabPropsFrameworkInjectedOptions } from "../tabs/typesNavbarTab";

export const simpleNavbarTabFactory = (
  tabProps: Omit<
    React.ComponentProps<typeof SimpleNavbarTab>,
    "frameworkInjectedOptions"
  >
) => {
  return (props: {
    frameworkInjectedOptions: groupableNavbarTabPropsFrameworkInjectedOptions;
  }) => {
    return (
      <SimpleNavbarTab
        frameworkInjectedOptions={props.frameworkInjectedOptions}
        {...tabProps}
      />
    );
  };
};

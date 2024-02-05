import React from "react";
import { SimpleNavbarTab } from "../tabs/simpleNavbarTab/simpleNavbarTab";
import { InjectedOptionsGroupableByWrapperToTab } from "../types/typesInjectedOptions";

export const simpleNavbarTabFactory = (
  tabProps: Omit<
    React.ComponentProps<typeof SimpleNavbarTab>,
    "frameworkInjectedOptions"
  >
) => {
  return (props: {
    frameworkInjectedOptions: InjectedOptionsGroupableByWrapperToTab;
  }) => {
    return (
      <SimpleNavbarTab
        frameworkInjectedOptions={props.frameworkInjectedOptions}
        {...tabProps}
      />
    );
  };
};

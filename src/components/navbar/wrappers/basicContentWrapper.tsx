import React from "react";
import { InjectedOptionsByGroupToWrapper } from "../types/typesInjectedOptions";
import { InjectedOptionsGroupableByWrapperToTab } from "../types/typesInjectedOptions";
import { InjectedOptionsByNavbarToWrapper } from "../types/typesInjectedOptions";
import { ContentWrapperGeneralization } from "./contentWrapperGeneralization";
import { GroupableTabAndContentWrapper } from "./typesWrappers";
import { ComponentTypeMinProps } from "../../../types/typesReact";
import { InjectedOptionsObject } from "../typesNavbar";

export class BasicContentWrapper
  extends ContentWrapperGeneralization
  implements GroupableTabAndContentWrapper
{
  private _insideGroup = false;

  constructor(
    protected _path: string,
    protected _navbarTab: ComponentTypeMinProps<
      InjectedOptionsObject<InjectedOptionsGroupableByWrapperToTab>
    >,
    protected _component: React.ComponentType
  ) {
    super(_path, _component);
  }

  // As this wrapper can be used inside a group but doesn't have to be located
  // inside a group, it has to take the options of the navbar component and
  // the options of groups.
  getNavbarComponent = (
    navbarInjectedOptions:
      | InjectedOptionsByNavbarToWrapper
      | InjectedOptionsByGroupToWrapper
  ) => {
    const NavbarElement = this._navbarTab;

    const injectedProperties: InjectedOptionsGroupableByWrapperToTab = {
      insideGroup: this.getInsideGroup(),
      path: this._path,
      navbarCollapsed: navbarInjectedOptions.navbarCollapsed,
      groupActive: this.getInsideGroup()
        ? // @ts-ignore If insideGroup is true groupActive will be contained.
          navbarInjectedOptions.groupActive
        : false,
    };

    return (
      <NavbarElement
        key={this.getKey()}
        frameworkInjectedOptions={injectedProperties}
      />
    );
  };

  getInsideGroup = () => {
    return this._insideGroup;
  };

  setInsideGroup = (insideGroup: boolean) => {
    this._insideGroup = insideGroup;
  };
}

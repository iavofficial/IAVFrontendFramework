import React from "react";
import { GroupInjectedOptions } from "../tabs/tabGroup/typesGroupTab";
import {
  groupableNavbarTabPropsFrameworkInjectedOptions,
} from "../tabs/typesNavbarTab";
import { InjectedPropertiesObj, navbarInjectedOptions } from "../typesNavbar";
import { ContentWrapperGeneralization } from "./genericContentWrapper";
import { GroupableTabAndContentWrapper } from "./typesTabAndContentWrapper";
import { ComponentTypeMinProps } from "../../../types/typesReact";

export class BasicContentWrapper
  extends ContentWrapperGeneralization
  implements GroupableTabAndContentWrapper
{
  private _insideGroup = false;

  constructor(
    protected _path: string,
    protected _navbarTab: ComponentTypeMinProps<
      InjectedPropertiesObj<groupableNavbarTabPropsFrameworkInjectedOptions>
    >,
    protected _component: React.ComponentType
  ) {
    super(_path, _component);
  }

  getNavbarComponent = (
    navbarInjectedOptions: navbarInjectedOptions | GroupInjectedOptions
  ) => {
    const NavbarElement = this._navbarTab;

    const injectedProperties: groupableNavbarTabPropsFrameworkInjectedOptions =
      {
        insideGroup: this._insideGroup,
        path: this._path,
        navbarCollapsed: navbarInjectedOptions.navbarCollapsed,
        groupActive:
          "groupActive" in navbarInjectedOptions
            ? navbarInjectedOptions.groupActive
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

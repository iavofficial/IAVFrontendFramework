import React from "react";
import { BasicContentWrapper } from "./basicContentWrapper";
import { groupableNavbarTabProps, navbarTabProps } from "../tabs/navbarTab";
import { GroupableTabAndContentWrapper } from "./groupableTabAndContentWrapper";

export class GroupableContentWrapper extends BasicContentWrapper implements GroupableTabAndContentWrapper {

  private _insideGroup = false;
  
  constructor(
    protected _navbarTab: React.ReactElement<
      navbarTabProps | groupableNavbarTabProps
    >,
    protected _component: React.ComponentType<any>,
  ) {
    super(_navbarTab, _component);
  }

  getNavbarComponent = (navbarCollapsed: boolean) => {
    return React.cloneElement(this._navbarTab, {
      key: this.getKey(),
      navbarCollapsed: navbarCollapsed,
      insideGroup: this.getInsideGroup(),
    });
  };

  getInsideGroup = () => {
    return this._insideGroup;
  };

  setInsideGroup = (insideGroup: boolean) => {
    this._insideGroup = insideGroup;
  };
}

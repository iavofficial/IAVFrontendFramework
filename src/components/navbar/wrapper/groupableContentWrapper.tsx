import {  groupableNavbarTabPropsFrameworkInjectedOptions } from "../tabs/navbarTabTypes";
import { GenericContentWrapper } from "./genericContentWrapper";
import { GroupableTabAndContentWrapper } from "./tabAndContentWrapperTypes";

export class GroupableContentWrapper extends GenericContentWrapper<groupableNavbarTabPropsFrameworkInjectedOptions> implements GroupableTabAndContentWrapper {

  private _insideGroup = false;

  getInsideGroup = () => {
    return this._insideGroup;
  };

  setInsideGroup = (insideGroup: boolean) => {
    this._insideGroup = insideGroup;
  };
}
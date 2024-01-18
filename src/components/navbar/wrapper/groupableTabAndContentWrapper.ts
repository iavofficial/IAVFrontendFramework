import { TabAndContentWrapper } from "./tabAndContentWrapper";

export type GroupableTabAndContentWrapper = TabAndContentWrapper & {
  getInsideGroup(): boolean;
  // Allow any return value to allow for feedback if
  // necessary while using the framework and developing custom TabAndContentWrappers.
  setInsideGroup(insideGroup: boolean): any;
};
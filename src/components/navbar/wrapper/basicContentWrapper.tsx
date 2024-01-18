import { basicNavbarTabFrameworkInjectedOptions } from "../tabs/navbarTabTypes";
import { GenericContentWrapper } from "./genericContentWrapper";
import { TabAndContentWrapper } from "./tabAndContentWrapperTypes";

export class BasicContentWrapper
  extends GenericContentWrapper<basicNavbarTabFrameworkInjectedOptions>
  implements TabAndContentWrapper {}

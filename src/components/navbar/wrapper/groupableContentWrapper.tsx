import { groupableNavbarTabPropsFrameworkInjectedOptions } from "../tabs/typesNavbarTab";
import { navbarInjectedOptions } from "../typesNavbar";
import { ContentWrapperGeneralization } from "./genericContentWrapper";
import { GroupableTabAndContentWrapper } from "./typesTabAndContentWrapper";

export class GroupableContentWrapper
  extends ContentWrapperGeneralization
  implements GroupableTabAndContentWrapper
{
  private _insideGroup = false;

  constructor(
    protected _path: string,
    protected _component: React.ComponentType<groupableNavbarTabPropsFrameworkInjectedOptions>,
    protected _navbarTab: React.ComponentType<{
      frameworkInjectedOptions: groupableNavbarTabPropsFrameworkInjectedOptions;
    }>
  ) {
    super(_path, _component);
  }

  getNavbarComponent = (
    navbarInjectedOptions: Omit<groupableNavbarTabPropsFrameworkInjectedOptions, "insideGroup">
  ) => {
    const NavbarElement = this._navbarTab;
    return (
      <NavbarElement
        key={this.getKey()}
        frameworkInjectedOptions={{
          ...navbarInjectedOptions,
          insideGroup: this.getInsideGroup(),
          path: this._path
        }}
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

import { basicNavbarTabFrameworkInjectedOptions } from "../tabs/typesNavbarTab";
import { navbarInjectedOptions } from "../typesNavbar";
import { ContentWrapperGeneralization } from "./genericContentWrapper";

export class BasicContentWrapper extends ContentWrapperGeneralization{
  constructor(
    protected _path: string,
    protected _component: React.ComponentType,
    protected _navbarTab: React.ComponentType<{
      frameworkInjectedOptions: basicNavbarTabFrameworkInjectedOptions;
    }>
  ) {
    super(_path, _component);
  }

  getNavbarComponent = (navbarInjectedOptions: navbarInjectedOptions) => {
    const NavbarElement = this._navbarTab;
    return (
      <NavbarElement
        key={this.getKey()}
        frameworkInjectedOptions={{
          ...navbarInjectedOptions,
          path: this._path
        }}
      />
    );
  };
}

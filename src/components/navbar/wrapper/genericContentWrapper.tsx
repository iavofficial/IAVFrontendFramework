import { Route } from "react-router";
import { generateHash } from "../../../utils/hash";
import { TabAndContentWrapper } from "./tabAndContentWrapperTypes";

export class GenericContentWrapper<OptionType extends object>
  implements TabAndContentWrapper
{
  constructor(
    protected _path: string,
    protected _navbarTab: React.ComponentType<{
      frameworkInjectedOptions: OptionType;
    }>,
    protected _component: React.ComponentType<any>
  ) {}

  // Generate unique key based on the view's url.
  getKey = () => {
    return generateHash(this._path);
  };

  getRoutes = () => {
    return [
      <Route
        key={this.getKey()}
        path={this._path}
        element={<this._component />}
      />,
    ];
  };

  getNavbarComponent = (frameworkInjectedOptions: OptionType) => {
    const NavbarElement = this._navbarTab;
    return (
      <NavbarElement
        key={this.getKey()}
        frameworkInjectedOptions={frameworkInjectedOptions}
      />
    );
  };
}

import { Route } from "react-router";
import { generateHash } from "../../../utils/hash";

export class ContentWrapperGeneralization {
  constructor(
    protected _path: string,
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
}

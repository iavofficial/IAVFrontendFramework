export interface AuthenticationProvider {
  fetchAuthed: FetchAuthedFunction;

  login(credentials: Credentials, ...rest: any): any;

  logout(): any;

  hasAuthenticated(): boolean;

  getUserData(): UserDataBasic | undefined;

  isRefreshing?(): boolean;
}

export type FetchAuthedFunction = (
  url: string,
  token: object,
  //eslint-disable-next-line
  settings?: object,
) => Promise<Response>;

export interface UserDataBasic {
  username: string;

  [attribute: string]: any;
}

export interface Credentials {
  email: string;
  password: string;
}

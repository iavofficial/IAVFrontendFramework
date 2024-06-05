import { JWT } from "aws-amplify/auth";
import React from "react";

export interface Credentials {
  email: string;
  password: string;
}

export type FetchAuthedFunction = (
  url: string,
  token: JWT,
  settings?: Object
) => Promise<Response>;

export interface UserData {
  idToken: JWT;
  accessToken: JWT;
  username: string;
  groups: string[];
  [attribute: string]: any;
}

export interface AuthenticationProvider {
  login(credentials: Credentials, ...rest: any): any;
  logout(): any;
  hasAuthenticated(): boolean;
  getUserData(): UserData | undefined;
  fetchAuthed: FetchAuthedFunction;
}

export interface AuthContextType extends AuthenticationProvider {
  [attribute: string]: any;
}

export const AuthContext = React.createContext<AuthContextType | undefined>(
  undefined
);

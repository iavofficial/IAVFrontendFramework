import {Slice} from "@reduxjs/toolkit";
import {FFStoreModule} from "../module";
import {AsyncThunk} from "@reduxjs/toolkit";

export type UserData = {
  username: string;
  userGroups?: string[];
  extras?: object;
};

export type AuthSlice<TState extends AuthState> = Slice<TState>;

export type FetchAuthedFunctionArgs = {
  url: string;
};

export type Credentials = {
  email: string;
  password: string;
};

export type AuthState = {
  hasAuthenticated: boolean; // true if user is authenticated
  isLoading: boolean; // true if user is in process of logging in
  userData: UserData | undefined; // contains user information; undefined if no user is logged in
  extras?: object;
};

export type AuthModule<TAuthState extends AuthState> = {
  slice: Slice<TAuthState>;
  fetchAuthed: AsyncThunk<Response, FetchAuthedFunctionArgs, any>;
  login: AsyncThunk<void, {credentials: Credentials}, any>;
  logout: AsyncThunk<void, {error?: unknown} | undefined, any>;
} & FFStoreModule;

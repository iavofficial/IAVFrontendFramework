import {Slice} from "@reduxjs/toolkit";
import {FFStoreModule, ModuleLifecycleHook} from "../module";
import {AsyncThunk} from "@reduxjs/toolkit";

export type UserData = {
  username: string;
  userGroups?: string[];
  extras?: object;
};

export type AuthState = {
  hasAuthenticated: boolean; // true if user is authenticated
  isLoading: boolean; // true if user is in process of logging in
  userData: UserData | undefined; // contains user information; undefined if no user is logged in
  extras?: object;
};

export type AuthSlice<TState extends AuthState> = Slice<TState>;

export type FetchAuthedFunctionArgs = {
  url: string;
};

export interface Credentials {
  email: string;
  password: string;
}

export interface AuthModule<TAuthState extends AuthState> extends FFStoreModule {
  slice: Slice<TAuthState>;
  fetchAuthed: AsyncThunk<Response, FetchAuthedFunctionArgs, any>;
  login: AsyncThunk<void, {credentials: Credentials}, any>;
  logout: AsyncThunk<void, {error?: unknown} | undefined, any>;
}

import {Slice} from "@reduxjs/toolkit";
import {FFStoreModule, ModuleLifecycleHook} from "../module";
import { AsyncThunk} from '@reduxjs/toolkit';


export type UserData = {username: string, userGroups?: string[]} & Record<string, unknown>;

export type AuthState = {
  hasAuthenticated: boolean; // true if user is authenticated
  isLoading: boolean; // true if user is in process of logging in
  userData: UserData | undefined; // contains user information; undefined if no user is logged in
};

export type AuthSlice<TState extends AuthState> = Slice<TState>;

export type FetchAuthedFunctionArgs = {
  url: string
}

export interface Credentials {
  email: string;
  password: string;
}

export interface AuthModule<TState extends AuthState> extends FFStoreModule{
  slice: AuthSlice<TState>;
  fetchAuthed: AsyncThunk<Response, FetchAuthedFunctionArgs, any>;
  login: AsyncThunk<void, {credentials: Credentials}, any>;
  logout: AsyncThunk<void, {error?: any} | undefined, any>;
}
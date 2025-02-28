import React from "react";
import { AuthModule, AuthState } from "../types/modules/auth/authenticationProvider";

export interface ModuleContextValues<TAuthState extends AuthState> {
  modules: {
    auth: AuthModule<TAuthState>;
  } & Record<string, any>;
}

// TODO
export const ModuleContext = React.createContext<ModuleContextValues<any>>(
  {} as ModuleContextValues<any>
);
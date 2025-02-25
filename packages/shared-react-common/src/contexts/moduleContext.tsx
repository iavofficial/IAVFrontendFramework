import React from "react";
import {
  AuthModule,
  AuthState,
} from "@iavofficial/frontend-framework-shared-types/authenticationProvider";

export interface ModuleContextValues<TAuthState extends AuthState> {
  modules: {
    auth: AuthModule<TAuthState>;
  } & Record<string, any>;
}

// TODO
export const ModuleContext = React.createContext<ModuleContextValues<any>>(
  {} as ModuleContextValues<any>
);
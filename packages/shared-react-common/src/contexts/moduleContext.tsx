import React from "react";
import {
  AuthModule,
  AuthState,
} from "@iavofficial/frontend-framework-shared-types/authenticationProvider";

export interface ModuleContextValues {
  modules: {
    auth: AuthModule<AuthState>;
  } & Record<string, any>;
}

export const ModuleContext = React.createContext<ModuleContextValues>(
  {} as ModuleContextValues
);
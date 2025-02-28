import React from "react";
import {PropsWithChildren} from "react";
import {FFMandatoryModules} from "../store";
import {ModuleContext} from "@iavofficial/frontend-framework-shared-react-common/moduleContext";
import { AuthState } from "@iavofficial/frontend-framework-shared-types/authenticationProvider";

export interface Props<TAuthState extends AuthState> {
  modules: FFMandatoryModules<TAuthState>;
}

export const ModuleContextProvider = <TAuthState extends AuthState>(props: PropsWithChildren<Props<TAuthState>>) => {
  return (
    <ModuleContext.Provider
      value={{
        modules: props.modules,
      }}
    >
      {props.children}
    </ModuleContext.Provider>
  );
};

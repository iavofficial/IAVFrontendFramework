import React from "react";
import {PropsWithChildren} from "react";
import {FFMandatoryModules} from "../store";
import {ModuleContext} from "@iavofficial/frontend-framework-shared-react-common/moduleContext";

export interface Props {
  modules: FFMandatoryModules & Record<string, any>;
}

export const ModuleContextProvider = (props: PropsWithChildren<Props>) => {
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

import React from "react";
import { GlobalDataLayer } from "@iavofficial/frontend-framework/globalDataLayer";
import { modules, store } from "./uiTestSetup";
import CustomLayout from "../../CustomLayout.tsx";

export const AppUI = () => {
  return (
    <GlobalDataLayer store={store} modules={modules.all}>
      <CustomLayout />
    </GlobalDataLayer>
  );
};

export default AppUI;

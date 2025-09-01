import {FFModule} from "../generalModule";
import React from "react";

export type UIModule = {
  UiLayerHeader: React.ComponentType;
  UiLayerContentWithBar: React.ComponentType;
  UiLayerCookieBanner: React.ComponentType;
} & FFModule;

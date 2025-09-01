// modules/default_modules/ui/uiOrchestrator.tsx
import React from "react";

import {HeaderOrchestrator} from "./header/headerOrchestrator";
import type {UIHeaderProps} from "../../../types/modules/ui/header/headerModuleInterfaces";

import {
  ContentWithBarOrchestrator,
  ContentWithBarOrchestratorProps,
} from "./contentWithBar/contentWithBarOrchestrator";
import type {UIContentWithBarProps} from "../../../types/modules/ui/contentWithBar/contentWithBarModuleInterfaces"; // <-- Achtung: "With", nicht "WIth"
import {CookieBannerOrchestrator} from "./cookieBanner/cookieBannerOrchestrator";
import type {UICookieBannerProps} from "../../../types/modules/ui/cookieBanner/cookieBannerModuleInterfaces";

export type UIOverrides = {
  Header?: React.ComponentType<UIHeaderProps>;
  ContentWithBar?: React.ComponentType<UIContentWithBarProps>;
  CookieBanner?: React.ComponentType<UICookieBannerProps>;
};

export class UIOrchestrator {
  public id = "ui-orchestrator";
  public name = "UI Orchestrator";

  public UiLayerHeader: React.ComponentType<UIHeaderProps>;
  public UiLayerContentWithBar: React.ComponentType<ContentWithBarOrchestratorProps>;
  public UiLayerCookieBanner: React.ComponentType;

  constructor(overrides?: UIOverrides) {
    this.UiLayerHeader = (props: UIHeaderProps) => (
      <HeaderOrchestrator uiComponent={overrides?.Header} {...props} />
    );

    this.UiLayerContentWithBar = (props: ContentWithBarOrchestratorProps) => (
      <ContentWithBarOrchestrator
        uiComponent={overrides?.ContentWithBar}
        {...props}
      />
    );

    this.UiLayerCookieBanner = () => (
      <CookieBannerOrchestrator uiComponent={overrides?.CookieBanner} />
    );
  }
}

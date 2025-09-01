import {HeaderOrchestrator} from "./header/headerOrchestrator";
import {ContentWithBarOrchestrator} from "./contentWithBar/contentWithBarOrchestrator";
import {CookieBannerOrchestrator} from "./cookieBanner/cookieBannerOrchestrator";
import {UIModule} from "../../../types/modules/ui/uiModuleInterfaces";

export class DefaultUIModule implements UIModule {
  public UiLayerHeader;
  public UiLayerContentWithBar;
  public UiLayerCookieBanner;

  constructor() {
    this.UiLayerHeader = HeaderOrchestrator;
    this.UiLayerContentWithBar = ContentWithBarOrchestrator;
    this.UiLayerCookieBanner = CookieBannerOrchestrator;
  }
}
